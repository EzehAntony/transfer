"use client";
import { useEffect, useState } from "react";
import styles from "./signin.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  // alert box
  const alertMsg = (message, type) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 2000,
      closeButton: false,
      draggable: false,
      theme: "dark",
    });
  };

  useEffect(() => {
    if (session?.user) {
      router.push(`/home/${session?.user._id}`);
    } else {
    }
  }, [session]);

  const handleSubmit = () => {
    signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    }).then((res) => {
      console.log(res);
      if (res.error) {
        alertMsg(res.error, "error");
        console.log(res);
      } else {
        alertMsg("Successful login", "success");
      }
    });
  };

  return (
    <div className={styles.login}>
      <h1>Transfer</h1>
      <form>
        <>
          <h1>sign in</h1>
        </>
        <label>
          <h3>username</h3>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="login"
            id=""
          />
        </label>

        <label>
          <h3>password</h3>

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="login"
            id=""
          />
        </label>
        <button type="button" onClick={() => handleSubmit()}>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
