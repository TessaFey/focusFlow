import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "FocusFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-orange-50">
        <Navbar />
        <div className="pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
