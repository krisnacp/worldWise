import Map from "../components/Map";
import Sidebar from "../layouts/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../components/User";

function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    );
}

export default AppLayout;
