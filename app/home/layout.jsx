import Footer from "../components/Footer/Footer";
import styles from "./layout.module.css";

function RootLayout({ children }) {
  return (
    <div>
      <div className={styles.layout}>
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;
