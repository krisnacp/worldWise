import styles from "./Sidebar.module.css";
// import styles from "./Footer.module.css";
import Logo from "../components/Logo";
// import AppNav from "../components/AppNav";
import { AppNav } from "../layouts/Navigations";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Link to="/">
                <Logo />
            </Link>
            <AppNav />
            <Outlet />
            <footer className={styles.footer}>
                <p className={styles.copyright}>
                    &copy; Copyright 2023 by WarudoWaisu Inc.
                </p>
            </footer>
        </div>
    );
}

export default Sidebar;
