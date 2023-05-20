import Link from "next/link";
import styles from "./page.module.css";

export const metadata = {
  title: "Sign up",
};

export default function page() {
  return (
    <div className={styles.signup}>
      <form>
        <img src="/crust.png" alt="" />
        <h1>Signup</h1>
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
          Already have an account? click
          <span>
            <Link href={"/auth/signin"}> here </Link>
          </span>
          to signin
        </h4>
      </form>
    </div>
  );
}
