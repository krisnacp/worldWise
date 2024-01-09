import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { RootNavigation } from "../layouts/Navigations";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Message from "../components/Message";

export default function Login() {
    const { state: auth, dispatchLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("kris@mail.com");
    const [password, setPassword] = useState("12345");

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(`/app`, {
                replace: true,
            });
        }
    }, [auth]);

    // function handle login
    function handleLogin(event) {
        event.preventDefault();
        const userObj = {
            email,
            password,
        };
        dispatchLogin(userObj);
        if (auth.wrong) return;
    }

    return (
        <main className={styles.login}>
            <RootNavigation />
            <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
                {auth.wrong ? (
                    <Message message={`Your email or password isn't correct`} />
                ) : (
                    <></>
                )}
                <div className={styles.row}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className={styles.row}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <div>
                    <Button type={`primary`}>Login</Button>
                </div>
            </form>
        </main>
    );
}
