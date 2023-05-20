"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./historycard.module.css";

export default function HistoryCard({ data, src }) {
  useEffect(() => {
    console.log(data);
  }, []);
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
          <p>{data.user.firstname}</p>
          <span>{data.user.username}</span>
        </div>
      </div>

      <div className={styles.amount}>
        {data.amountDetail.details == "credit" ? (
          <span>+</span>
        ) : (
          <span style={{ color: "red" }}>-</span>
        )}

        <h3>{data.amountDetail.amount}</h3>
      </div>
    </div>
  );
}
