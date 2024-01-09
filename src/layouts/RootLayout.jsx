import { Outlet } from "react-router-dom";
// import { RootNavigation } from "./Navigations";

function RootLayout() {
    return (
        <>
            {/* <RootNavigation /> */}
            <Outlet />
        </>
    );
}

export default RootLayout;
