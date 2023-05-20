"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import styles from "./page.module.css";
import Card from "../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HistoryCard from "../components/HistoryCard/HistoryCard";
import { gsap, Power1 } from "gsap";
import HistoryCardLoading from "../components/HistoryCardLoading/HistoryCardLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Snowfall from "react-snowfall";

export default function Home() {
  const t1 = gsap.timeline({});
  const t2 = gsap.timeline({ paused: true });
  const t3 = gsap.timeline({});
  const t4 = gsap.timeline({});
  const ref = useRef(null);
  const g = gsap.utils.selector(ref);
  const [history, setHistory] = useState("");
  const [users, setUsers] = useState("");
  const [data, setData] = useState("");

  const alertMsg = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      draggable: false,
      theme: "dark",
    });
  };

  // Gsap animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to("#home", { visibility: "visible" });

      t1.from("#hero", { opacity: 0, scale: 0, ease: "none" })
        .from("#hero #menu", { opacity: 0, x: -50, ease: "none" })
        .from("#hero #name", { opacity: 0, x: 50 }, "-=.5")
        .from("#hero #bell", { opacity: 0, x: 50 })
        .from("#hero #balance", { opacity: 0, y: 50 }, "-=.5")
        .from("#hero #amount", {
          opacity: 0,
          x: -10,
        })
        .from("#hero #request", {
          opacity: 0,
          width: 0,
        })
        .from(
          "#hero #send",
          {
            opacity: 0,
            width: 0,
          },
          "-=.2"
        )
        .from("#hero #eye", {
          opacity: 0,
          y: -30,
          ease: "bounce",
        })

        .from(g("#swiper"), {
          x: 100,
          opacity: 0,
        })
        .from(g("#quickSend"), { x: -50, opacity: 0 })
        .from(g("#viewAll"), { x: 50, opacity: 0 }, "-=.5")
        .from(g("#history"), { y: 50, opacity: 0 })
        .from(g("#group *"), { y: 50, opacity: 0, stagger: { each: 0.1 } });
    });

    return () => ctx.revert();
  }, []);

  //fetch data

  const getHistory = async () => {
    await fetch("/api/history/nazville")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setHistory(res);
      })
      .catch((err) => console.log(err));
  };
  const getAllUsers = async () => {
    await fetch("/api/users")
      .then((res) => {
        return res.json();
      })
      .then((res) => setUsers(res))
      .catch((err) => console.log(err));
  };
  const getData = async () => {
    await fetch("/api/user/646556ac2823e900bed4b2dc", {
      next: { revalidate: 10 },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHistory();
    getAllUsers();
    getData();
  }, []);

  const [hide, setHide] = useState(true);
  const hideClick = () => {
    if (hide) {
      setHide(false);
    } else {
      setHide(true);
    }
    const [hidee, setHidee] = useState(true);
  };

  const [hidee, setHidee] = useState(true);
  const hideeClick = () => {
    if (hidee) {
      setHidee(false);
    } else {
      setHidee(true);
    }
  };

  return (
    <div className={styles.home} id="home" ref={ref}>
      <div id="hero" className={styles.hero}>
        <Snowfall snowflakeCount={100} color="#ffffff60" speed={[1.0, 1.1]} />
        <header>
          <i class="bi bi-justify-left" id="menu"></i>
          <div className={styles.name} id="name">
            <p>Hello</p>
            <h3>{data && data.username}</h3>
            <h3>{!data && "No data"}</h3>
          </div>
          <i class="bi bi-bell-fill" id="bell"></i>
        </header>

        <div className={styles.bottom} id="bottom">
          <p id="balance">
            Your total balance
            {hide ? (
              <i
                onClick={() => hideClick()}
                class="bi bi-eye-fill"
                id="eye"
              ></i>
            ) : (
              <i
                onClick={() => hideClick()}
                class="bi bi-eye-slash"
                id="eye"
              ></i>
            )}
          </p>

          <h1 id="amount">
            {hidee ? `${data ? data.account : "no data"}` : "*****"}
          </h1>

          <div className={styles.button}>
            <div
              onClick={() =>
                alertMsg(
                  "this feature is unavailable at the moment. You can only send out funds"
                )
              }
              id="request"
            >
              <h3>request</h3>
            </div>
            <div id="send">
              <h3>send</h3>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.quickSend}>
        <div className={styles.top}>
          <h1 id="quickSend">quick send</h1>
          <p id="viewAll">view all</p>
        </div>

        <Swiper
          id="swiper"
          className={styles.wrapper}
          spaceBetween={5}
          slidesPerView={"auto"}
        >
          {users &&
            users.map((user) => (
              <SwiperSlide className={styles.wrapperSlide}>
                <Card data={user} key={user._id} />
              </SwiperSlide>
            ))}

          {!users && (
            <>
              <SwiperSlide className={styles.wrapperSlide}>
                <HistoryCardLoading />
              </SwiperSlide>
              <SwiperSlide className={styles.wrapperSlide}>
                <HistoryCardLoading />
              </SwiperSlide>
              <SwiperSlide className={styles.wrapperSlide}>
                <HistoryCardLoading />
              </SwiperSlide>
              <SwiperSlide className={styles.wrapperSlide}>
                <HistoryCardLoading />
              </SwiperSlide>
              <SwiperSlide className={styles.wrapperSlide}>
                <HistoryCardLoading />
              </SwiperSlide>
            </>
          )}
        </Swiper>
      </div>

      <div className={styles.history}>
        <h1 id="history">history</h1>

        <div className={styles.group} id="group">
          {history &&
            history
              .reverse()
              .map((hist) => <HistoryCard key={hist._id} data={hist} />)}
          {!history && (
            <>
              <HistoryCardLoading /> <HistoryCardLoading />
              <HistoryCardLoading /> <HistoryCardLoading />
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
