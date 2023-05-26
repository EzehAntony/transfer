import "./globals.css";
import { useSession } from "next-auth/react";
import { Inter, Poppins, Roboto } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Provider from "./Provider";
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
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
