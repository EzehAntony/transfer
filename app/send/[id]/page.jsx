"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";
import axios from "axios";
import { ClapSpinner, RotateSpinner } from "react-spinners-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function send({ params }) {
  const router = useRouter();
  const [screen, setScreen] = useState([]);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [stringAmount, setStringAmount] = useState("");

  useEffect(() => {
    axios({
      url: `/api/user/${params.id}`,
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

  useEffect(() => {
    setStringAmount("");
    screen.map((num) => {
      setStringAmount((prev) => prev + num);
    });
  }, [screen]);

  const transfer = async () => {
    setLoading(true);
    await axios({
      method: "POST",
      url: `/api/transfer/${params.id}`,
      data: {
        from: "6464182584c59aa3d1f4d697",
        amount: stringAmount,
        pin: "4444",
      },
    })
      .then((res) => {
        toast(res.data, {
          position: "top-right",
          autoClose: 2000,
          draggable: false,
          theme: "dark",
          onClose: () => router.push("/home"),
        });
        console.log(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data) {
          toast(err.response.data, {
            position: "top-right",
            autoClose: 2000,
            draggable: false,
            theme: "dark",
          });
          console.log(err);
        } else {
          console.log(err);
        }
      });
  };

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

        <i class="bi bi-x" onClick={() => router.back("-1")}></i>
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
          <i class="bi bi-backspace-fill"></i>
        </h3>
      </div>

      <div className={styles.slide} id="slide" onClick={() => transfer()}>
        {loading ? (
          <RotateSpinner color="#fff" size="30" />
        ) : (
          <>
            <i class="bi bi-send-fill"></i>
            <p>click to send</p>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}
