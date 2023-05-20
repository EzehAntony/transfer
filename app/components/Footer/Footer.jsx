"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className={styles.footer}>
      <div onClick={() => router.push("/home")}>
        {path === "/home" ? (
          <i class="bi bi-house-fill"></i>
        ) : (
          <i class="bi bi-house"></i>
        )}
      </div>
      <div onClick={() => router.push("/home/trade")}>
        {path === "/home/trade" ? (
          <i class="bi bi-collection-fill"></i>
        ) : (
          <i class="bi bi-collection"></i>
        )}
      </div>
      <div onClick={() => router.push("/home/wallet")}>
        {path === "/home/wallet" ? (
          <i class="bi bi-piggy-bank-fill"></i>
        ) : (
          <i class="bi bi-piggy-bank"></i>
        )}
      </div>
      <div onClick={() => router.push("/home/profile")}>
        {path === "/home/profile" ? (
          <i class="bi bi-person-fill"></i>
        ) : (
          <i class="bi bi-person"></i>
        )}
      </div>
    </div>
  );
}
