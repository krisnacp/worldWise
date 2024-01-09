import { createContext, useContext, useReducer } from "react";
import PropTypes from "prop-types";
import Ava from "../assets/zoro.png";

const AuthState = createContext(null);

export function useAuth() {
    const context = useContext(AuthState);
    if (context === undefined)
        console.log("FakeAuthContext used outside of it's scope");
    return context;
}

// propTypes for FakeAuthContext
FakeAuthContext.propTypes = {
    children: PropTypes.node,
};

// initialArgument for reducer
const initialArg = {
    username: null,
    password: null,
    name: null,
    avatar: "",
    isAuthenticated: false,
    loading: false,
    wrong: false,
};

// ?reducer function
function reducer(state, action) {
    switch (action.type) {
        case "login": {
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password,
                name: action.payload.name,
                avatar: action.payload.avatar,
                isAuthenticated: true,
            };
        }
        case "logout": {
            return {
                ...state,
                username: null,
                password: null,
                isAuthenticated: false,
            };
        }
        case "loading": {
            return {
                ...state,
                loading: action.payload,
            };
        }
        case "wrongEmailPass": {
            return {
                ...state,
                wrong: action.payload,
            };
        }
        default:
            throw Error("Unknown action.");
    }
}

const FAKE_USER = {
    name: "Kris",
    email: "kris@mail.com",
    password: "12345",
    avatar: Ava,
};

function FakeAuthContext({ children }) {
    const [state, dispatch] = useReducer(reducer, initialArg);

    function dispatchLogin(loginObj) {
        dispatch({ type: "loading", payload: true });
        if (
            loginObj.email === FAKE_USER.email &&
            loginObj.password === FAKE_USER.password
        ) {
            dispatch({ type: "wrongEmailPass", payload: false });
            dispatch({ type: "login", payload: FAKE_USER });
            dispatch({ type: "loading", payload: false });
        } else if (
            loginObj.email !== FAKE_USER.email ||
            loginObj.password !== FAKE_USER.password
        ) {
            dispatch({ type: "wrongEmailPass", payload: true });
            dispatch({ type: "loading", payload: false });
        }
    }

    function dispatchLogout() {
        dispatch({ type: "loading", payload: true });
        dispatch({ type: "logout", payload: false });
        dispatch({ type: "loading", payload: false });
    }

    return (
        <AuthState.Provider value={{ state, dispatchLogin, dispatchLogout }}>
            {children}
        </AuthState.Provider>
    );
}

export default FakeAuthContext;
