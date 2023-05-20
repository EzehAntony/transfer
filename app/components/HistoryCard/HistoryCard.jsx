"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./historycard.module.css";

export default function HistoryCard({ data, src }) {
  const router = useRouter();
  const path = usePathname();
  const random = Math.floor(Math.random() * 20);

  return (
    <div className={styles.historyCard}>
      <div className={styles.topRow}>
        <img
          src={`https://xsgames.co/randomusers/assets/avatars/male/${random}.jpg`}
          alt=""
        />
        <div>
          <p>{data.firstname}</p>
          <span>{data.username}</span>
        </div>
      </div>

      <div className={styles.amount}>
        <span>+</span> <h3>$250</h3>
      </div>
    </div>
  );
}
