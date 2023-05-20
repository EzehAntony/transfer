import { Gothic_A1 } from "next/font/google";
import styles from "./page.module.css";

export const metadata = {
  title: "Known",
  Description: "How much do your friends know ya? Try them out!",
};

const gothic_A1 = Gothic_A1({
  weight: ["100", "900"],
  subsets: ["latin"],
});

export default function splash() {
  return (
    <div className={styles.splash}>
      <p className={gothic_A1.className}>Known</p>
    </div>
  );
}
