"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./historycardLoading.module.css";

export default function HistoryCardLoading() {
  const random = Math.floor(Math.random() * 20);

  return <div className={styles.historyCard}></div>;
}
