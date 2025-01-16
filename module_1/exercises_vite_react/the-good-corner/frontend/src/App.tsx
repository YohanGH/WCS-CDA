import { Outlet } from "react-router-dom";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import styles from "@/styles/App.module.css";

function App() {
  return (
    <>
      <Header />
      <main
        className={`${styles.mainContent}`}
        aria-label="Main Content"
      >
        {/* Responsive Background */}
        <div
          className={`${styles.mobileBackground} sm:hidden`}
          style={{
            backgroundImage: `url('/images/mobileSection.png')`,
          }}
        />
        <div
          className={`${styles.desktopBackground} hidden sm:block`}
          style={{
            backgroundImage: `url('/images/defaultSection.png')`,
          }}
        />

        {/* Dot Pattern Overlay */}
        <div className={styles.dotPatternOverlay} />

        <div className={styles.contentWrapper}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
