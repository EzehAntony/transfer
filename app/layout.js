import "./globals.css";
import { Inter, Poppins, Roboto } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
export const metadata = {
  themeColor: "black",
  title: "Transfer",
  description: "Rapid payments",
};

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
