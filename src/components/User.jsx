import styles from "./User.module.css";
import { useAuth } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// import Ava from "../assets/zoro.png";

// const FAKE_USER = {
//     name: "Kris",
//     email: "kris@mail.com",
//     password: "12345",
//     avatar: Ava,
// };

function User() {
    const { state, dispatchLogout } = useAuth();
    const navigate = useNavigate();
    const user = state;

    function handleClick() {
        dispatchLogout();
        navigate(`/`);
    }

    return (
        <div className={styles.user}>
            <img src={user.avatar} alt={user.name} />
            <span>Welcome, {user.name}</span>
            <button disabled={state.loading} onClick={handleClick}>
                {state.loading ? <Spinner /> : "Logout"}
            </button>
        </div>
    );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
