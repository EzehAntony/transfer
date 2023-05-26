"use client";
import { useEffect, useState } from "react";
import styles from "./signin.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClapSpinner, ImpulseSpinner, PushSpinner } from "react-spinners-kit";

export default function signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    }).then((res) => {
      setLoading(false);
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
          <h1>Login</h1>
        </>
        <label>
          <h3>username</h3>
          <input
            onChange={(e) => setUsername(e.target.value.trim().toLowerCase())}
            type="text"
            name="login"
            id="form"
            autoComplete="off"
            required
          />
        </label>

        <label>
          <h3>password</h3>

          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value.trim())}
            name="login"
            id="form"
          />
        </label>
        <button
          type="button"
          id="form"
          name="text"
          onClick={() => handleSubmit()}
        >
          {!loading && "Login"}
          {loading && <ClapSpinner size="20" frontColor="#fff" />}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
