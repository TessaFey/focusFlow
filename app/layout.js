import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { AudioProvider } from "./context/AudioContext";

export const metadata = {
  title: "FocusFlow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#2C2C2C] text-[#E8E8E8]">
        <AudioProvider>
          <Navbar />
          <div className="pt-20">{children}</div>
          <Footer />
        </AudioProvider>
      </body>
    </html>
  );
}
