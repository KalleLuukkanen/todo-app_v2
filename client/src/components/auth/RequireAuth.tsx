import { Outlet } from "react-router-dom";
import { useUserState } from "../../states/AuthContext";
import Restriction from "./Restriction";
import Loading from "../main/Loading";

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