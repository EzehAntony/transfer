"use client";

import Footer from "../components/Footer/Footer";
import styles from "./layout.module.css";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
function RootLayout({ children }) {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      redirect("/auth/signin");
    },
  });
  return (
    <div>
      <div className={styles.layout}>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
