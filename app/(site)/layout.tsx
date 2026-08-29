import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Wraps the real site with the shared chrome. The `(site)` folder is a route
 * group: it organises files without appearing in any URL, so `/`, `/about`,
 * `/work` and `/contact` are unchanged. The coming-soon page sits outside this
 * group and therefore renders with no nav or footer.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
