/**
 * Every way to reach Amr, defined once.
 *
 * These values appear in the nav, footer, contact page and coming-soon page.
 * Keeping them here means updating one file instead of hunting through several
 * — which is how the LinkedIn link stayed broken in three places.
 */

export const EMAIL = "amr.emad.zaki.1@gmail.com";
export const EMAIL_HREF = `mailto:${EMAIL}`;

export const LINKEDIN_URL = "https://www.linkedin.com/in/amr-emad-6661a0192";

export const GITHUB_URL = "https://github.com/Amremad1256";
export const GITHUB_LABEL = "github.com/Amremad1256";

/**
 * The number lives only inside this link — it is never shown on screen.
 * wa.me opens a chat with the message below pre-filled.
 */
export const WHATSAPP_URL =
  "https://wa.me/201062667404?text=Hi%20Amr%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20get%20in%20touch.";

export const WHATSAPP_ARIA_LABEL = "Message Amr on WhatsApp";

/** Attributes every outbound link should carry. */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
