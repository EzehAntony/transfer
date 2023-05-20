import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Sign in",
};

export default function page() {  
  return (
    <div className={styles.signin}>
      <form>
        <img src="/crust.png" alt="" />
        <h1>Signin</h1>
        <label>
          <p>Username</p>
          <input type="text" name="" placeholder="example: nazville" id="" />
        </label>
        <label>
          <p>Password</p>
          <input type="text" placeholder="*****" name="" id="" />
        </label>

        <button>Login</button>

        <h4>
          Don't have an account? click
          <span>
            <Link href={"/auth/signup"}> here </Link>
          </span>
          to signup
        </h4>
      </form>
    </div>
  );
}
