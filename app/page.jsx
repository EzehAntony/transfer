"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./page.module.css";
import { gsap } from "gsap";

export default function Home() {
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const t1 = gsap.timeline({});
  const router = useRouter();

  //gsap
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#main", { visibility: "visible" });
      t1.from(g("#walls div"), {
        xPercent: 100,
        stagger: {
          each: "0.2",
        },
      });
      t1.to(g("#walls"), { display: "none" }, "<+0.5")
        .from(
          g(`#text h3`),
          {
            scale: "1.5",
            duration: 0.1,
            y: 50,
            opacity: 0,
            stagger: {
              each: 0.1,
            },
          },
          "<+0.3"
        )
        .from(
          g("#text i"),
          1,
          {
            opacity: 0,
            y: -50,
            onComplete: () => {
              router.push("/auth/signin");
            },
          },
          "<+0.5"
        );
    });

    return () => ctx.revert();
  });

  return (
    <main className={styles.main} id="main" ref={ref}>
      <div className={styles.text} id="text">
        <h3>T</h3>
        <h3>r</h3>
        <h3>a</h3>
        <h3>n</h3>
        <h3>s</h3>
        <h3>f</h3>
        <h3>e</h3>
        <h3>r</h3>
        <i></i>
      </div>

      <div className={styles.walls} id="walls">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </main>
  );
}
