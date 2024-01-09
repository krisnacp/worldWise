import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/FakeAuthContext";
import { useEffect } from "react";

ProtectedRoutes.propTypes = {
    children: PropTypes.node,
};
function ProtectedRoutes({ children }) {
    const navigate = useNavigate();
    const { state } = useAuth();

    useEffect(() => {
        if (!state.isAuthenticated) navigate(`/`);
    }, [state.isAuthenticated, navigate]);

    return state.isAuthenticated ? children : null;
    // return children;
    // return <div>{children}</div>;
}

export default ProtectedRoutes;
