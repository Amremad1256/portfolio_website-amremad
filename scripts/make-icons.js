/**
 * Regenerates the site icons from public/logo-transparent.png.
 *
 *   node scripts/make-icons.js      (or: npm run icons)
 *
 * It trims the transparent padding off the logo, scales the mark to fill the
 * icon with a small even margin, and composites it onto a cream background:
 *
 *   app/icon.png        512x512, rounded corners, for the browser tab
 *   app/apple-icon.png  180x180, plain square (iOS rounds it itself)
 *
 * Run this after replacing the logo. No image libraries needed.
 */
const zlib = require("zlib");
const fs = require("fs");

/* ---------------- PNG decode (8-bit, non-interlaced) ---------------- */
function decodePNG(file) {
  const b = fs.readFileSync(file);
  let o = 8, idat = [], ihdr = null;
  while (o < b.length) {
    const len = b.readUInt32BE(o);
    const type = b.subarray(o + 4, o + 8).toString("ascii");
    const data = b.subarray(o + 8, o + 8 + len);
    if (type === "IHDR") {
      ihdr = {
        width: data.readUInt32BE(0), height: data.readUInt32BE(4),
        depth: data[8], color: data[9], interlace: data[12],
      };
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    o += 12 + len;
  }
  if (ihdr.depth !== 8) throw new Error("need 8-bit, got " + ihdr.depth);
  if (ihdr.interlace !== 0) throw new Error("interlaced PNG unsupported");
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[ihdr.color];
  if (!channels) throw new Error("colour type " + ihdr.color + " unsupported");

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const { width: w, height: h } = ihdr;
  const bpp = channels, stride = w * bpp;
  const out = Buffer.alloc(h * stride);

  for (let y = 0; y < h; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, y * (stride + 1) + 1 + stride);
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0;
      const up = prev ? prev[i] : 0;
      const c = prev && i >= bpp ? prev[i - bpp] : 0;
      let v = line[i];
      if (filter === 1) v += a;
      else if (filter === 2) v += up;
      else if (filter === 3) v += (a + up) >> 1;
      else if (filter === 4) {
        const p = a + up - c;
        const pa = Math.abs(p - a), pb = Math.abs(p - up), pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? up : c;
      }
      cur[i] = v & 0xff;
    }
  }
  // normalise to RGBA
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0, n = w * h; i < n; i++) {
    const s = i * channels, d = i * 4;
    if (channels === 4) { rgba[d]=out[s]; rgba[d+1]=out[s+1]; rgba[d+2]=out[s+2]; rgba[d+3]=out[s+3]; }
    else if (channels === 3) { rgba[d]=out[s]; rgba[d+1]=out[s+1]; rgba[d+2]=out[s+2]; rgba[d+3]=255; }
    else if (channels === 2) { rgba[d]=rgba[d+1]=rgba[d+2]=out[s]; rgba[d+3]=out[s+1]; }
    else { rgba[d]=rgba[d+1]=rgba[d+2]=out[s]; rgba[d+3]=255; }
  }
  return { width: w, height: h, data: rgba };
}

/* ---------------- PNG encode ---------------- */
const crcTable = (() => { const t=new Array(256);
  for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;t[n]=c>>>0;} return t;})();
const crc32 = (buf) => { let c=0xffffffff; for(const x of buf) c=crcTable[(c^x)&0xff]^(c>>>8); return (c^0xffffffff)>>>0; };
const chunk = (type, data) => {
  const len=Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td=Buffer.concat([Buffer.from(type,"ascii"),data]);
  const crc=Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len,td,crc]);
};
function encodePNG(width, height, pixels, hasAlpha) {
  const ch = hasAlpha ? 4 : 3, stride = width * ch;
  const raw = Buffer.alloc(height * (stride + 1));
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    pixels.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0); ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; ihdr[9] = hasAlpha ? 6 : 2;
  return Buffer.concat([
    Buffer.from([137,80,78,71,13,10,26,10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ---------------- build the icon ---------------- */
const src = decodePNG("public/logo-transparent.png");
console.log(`source: ${src.width}x${src.height}`);

// 1. Trim transparent padding -> bounding box of the mark.
let minX = src.width, minY = src.height, maxX = -1, maxY = -1;
for (let y = 0; y < src.height; y++) {
  for (let x = 0; x < src.width; x++) {
    if (src.data[(y * src.width + x) * 4 + 3] > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
}
const bw = maxX - minX + 1, bh = maxY - minY + 1;
console.log(`mark bounding box: ${bw}x${bh} at (${minX},${minY})`);
console.log(`transparent padding trimmed: ${((1 - (bw * bh) / (src.width * src.height)) * 100).toFixed(1)}% of area`);

const CREAM = [0xfb, 0xf9, 0xf5];

/** size px square; margin as a fraction; rounded = transparent corners. */
function render(size, marginFrac, rounded) {
  const margin = Math.round(size * marginFrac);
  const box = size - margin * 2;
  const scale = box / Math.max(bw, bh);            // fit the longer side
  const drawW = bw * scale, drawH = bh * scale;
  const offX = (size - drawW) / 2, offY = (size - drawH) / 2;

  const out = Buffer.alloc(size * size * (rounded ? 4 : 3));
  const ch = rounded ? 4 : 3;
  const radius = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      // --- box-filter sample of the source region for this target pixel ---
      const sx0 = minX + ((x - offX) / scale), sy0 = minY + ((y - offY) / scale);
      const sx1 = minX + ((x + 1 - offX) / scale), sy1 = minY + ((y + 1 - offY) / scale);
      let r = 0, g = 0, bl = 0, a = 0, n = 0;
      const ix0 = Math.max(minX, Math.floor(sx0)), ix1 = Math.min(maxX, Math.ceil(sx1) - 1);
      const iy0 = Math.max(minY, Math.floor(sy0)), iy1 = Math.min(maxY, Math.ceil(sy1) - 1);
      for (let sy = iy0; sy <= iy1; sy++) {
        for (let sx = ix0; sx <= ix1; sx++) {
          const i = (sy * src.width + sx) * 4;
          const av = src.data[i + 3] / 255;
          r += src.data[i] * av; g += src.data[i + 1] * av; bl += src.data[i + 2] * av;
          a += av; n++;
        }
      }
      let cr = CREAM[0], cg = CREAM[1], cb = CREAM[2];
      if (n > 0 && a > 0) {
        // un-premultiply, then composite over cream
        const alpha = a / n;
        const mr = r / a, mg = g / a, mb = bl / a;
        cr = mr * alpha + CREAM[0] * (1 - alpha);
        cg = mg * alpha + CREAM[1] * (1 - alpha);
        cb = mb * alpha + CREAM[2] * (1 - alpha);
      }
      const d = (y * size + x) * ch;
      out[d] = Math.round(cr); out[d + 1] = Math.round(cg); out[d + 2] = Math.round(cb);

      if (rounded) {
        // rounded-square coverage, anti-aliased
        const px = x + 0.5, py = y + 0.5;
        const dx = Math.max(radius - px, px - (size - radius), 0);
        const dy = Math.max(radius - py, py - (size - radius), 0);
        const dist = Math.hypot(dx, dy);
        out[d + 3] = Math.round(255 * Math.max(0, Math.min(1, radius - dist + 0.5)));
      }
    }
  }
  return encodePNG(size, size, out, rounded);
}

// Browser tab: rounded badge with transparent corners.
fs.writeFileSync("app/icon.png", render(512, 0.07, true));
// iOS: full square, no transparency (iOS applies its own rounded mask).
fs.writeFileSync("app/apple-icon.png", render(180, 0.07, false));

for (const f of ["app/icon.png", "app/apple-icon.png"]) {
  console.log(f, fs.statSync(f).size, "bytes");
}
