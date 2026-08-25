import { Outlet } from "react-router-dom";
import { useUserState } from "../../context/AuthContext";
import Restriction from "./Restriction";
import Loading from "../../layouts/Loading";

function RequireAuth() {
    const { userState } = useUserState();

    if (userState.loading) {
        return <Loading />;
    }

    if (!userState.email) {
        return <Restriction />;
    }

    return <Outlet />;
}

export default RequireAuth;