import "./globals.css";
import { Inter, Poppins, Roboto } from "next/font/google";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        {children} <ToastContainer />
      </body>
    </html>
  );
}
