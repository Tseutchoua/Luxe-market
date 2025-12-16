import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./Globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"; // <--- Import Footer
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "../context/WishlistContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LuxeMarket | Premium E-Commerce",
  description: "The best products in Cameroon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <CartProvider>
          <WishlistProvider> {/* <--- Wrap here */}
            <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </WishlistProvider> 
        </CartProvider>
      </body>
    </html>
  );
}