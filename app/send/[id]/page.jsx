"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import axios from "axios";

export default function send({ params }) {
  const router = useRouter();
  const [screen, setScreen] = useState([]);
  const [data, setData] = useState("");

  useEffect(() => {
    axios({
      url: `http://localhost:3000/api/user/${params.id}`,
      method: "GET",
    })
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const t1 = gsap.timeline({});
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#send", { visibility: "visible" });

      t1.fromTo(
        g("#info"),
        { y: "30vh", opacity: 0, width: "20%" },
        { opacity: 1, width: "90%" }
      )
        .to(g("#info"), { y: 0 }, "+=1")
        .from(g("#buttons"), { y: 100, opacity: 0 }, "-=.2")
        .from(g("#slide"), { y: 100, opacity: 0 }, "-=.2")
        .from(g("#screen"), { y: 100, opacity: 0 });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.send} id="send" ref={ref}>
      <header>
        <i class="bi bi-arrow-left" onClick={() => router.back("-1")}></i>
      </header>

      <div id="info" className={styles.info}>
        <img
          src={`https://xsgames.co/randomusers/assets/avatars/male/20.jpg`}
          alt=""
        />
        <div>
          <p>{data && `${data.firstname} ${data.lastname}`} </p>
          <span>{data && data.username}</span>
        </div>

        <i class="bi bi-x"></i>
      </div>

      <div className={styles.screen} id="screen">
        <span>$</span>
        <h3>{screen}</h3>
      </div>

      <div className={styles.numbers} id="buttons">
        <h3 onClick={() => setScreen((prev) => [...prev, 1])}>1</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 2])}>2</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 3])}>3</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 4])}>4</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 5])}>5</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 6])}>6</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 7])}>7</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 8])}>8</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 9])}>9</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, "."])}>.</h3>
        <h3 onClick={() => setScreen((prev) => [...prev, 0])}>0</h3>
        <h3 onClick={() => setScreen([])}>
          <i class="bi bi-x"></i>
        </h3>
      </div>

      <div className={styles.slide} id="slide">
        <div className={styles.slider}>
          <i class="bi bi-arrow-right"></i>
        </div>
        <p>Slide to send</p>
      </div>
    </div>
  );
}
