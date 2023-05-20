import styles from "./page.module.css";
export default function page() {
  return (
    <div className={styles.register}>
      <img src="/CRUST.svg" alt="" />
      <form>
        <p>Register</p>
        <input type="text" placeholder="Username" />

        <button type="button">Register</button>
      </form>
    </div>
  );
}
