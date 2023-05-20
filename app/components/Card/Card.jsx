"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./card.module.css";

export default function Card({ data }) {
  useEffect(() => {
    console.log(data.username);
  }, []);
  const router = useRouter();
  const path = usePathname();
  const random = Math.floor(Math.random() * 20);

  return (
    <div className={styles.card} onClick={() => router.push("/send")}>
      <img
        src={`https://xsgames.co/randomusers/assets/avatars/male/${random}.jpg`}
        alt=""
      />
      <h3>{data.username}</h3>
    </div>
  );
}
