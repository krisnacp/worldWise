import { Link, NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import stylesNav from "./Navigations.module.css";
import stylesAppNav from "./AppNav.module.css";

export function RootNavigation() {
    return (
        <nav className={stylesNav.nav}>
            <Link to="/">
                <Logo />
            </Link>
            <ul>
                <NavLink to="/pricing">
                    <li>Pricing</li>
                </NavLink>
                <NavLink to="/product">
                    <li>Product</li>
                </NavLink>
                <NavLink to="/login" className={stylesNav.ctaLink}>
                    <li>Login</li>
                </NavLink>
            </ul>
        </nav>
    );
}

export function AppNav() {
    return (
        <nav className={stylesAppNav.nav}>
            <ul>
                <NavLink to="cities">
                    <li>Cities</li>
                </NavLink>
                <NavLink to="countries">
                    <li>Countries</li>
                </NavLink>
            </ul>
        </nav>
    );
}
