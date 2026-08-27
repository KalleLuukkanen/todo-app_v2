import { useTodos } from "../context/TodosContext";
import useCategories from "../hooks/useCategories";
import { useUserState } from "../context/AuthContext";

function User() {
    const { userState, deleteAccount } = useUserState();
    const { removeAll } = useTodos();
    const { removeAllCategories } = useCategories();

    const deleteAll = async () => {
        if (!confirm("Are you sure?")) return;
        await removeAll();
        await removeAllCategories();
    };

    const deleteAcc = async () => {
        if (!confirm("Are you sure?")) return;
        await deleteAccount();
    };

    return (
        <div className="flex flex-col p-2 space-y-4">
            <div className="space-y-4">
                <p className="font-bold text-2xl">User information:</p>
                <div className="ml-2 p-2">
                    <p>Email: {userState.email}</p>
                    <p>Joined: {userState.createdAt?.toLocaleDateString("fi-FI")}</p>
                </div>
            </div>
            <div className="space-y-4">
                <p className="font-bold text-2xl">Control account:</p>
                <div className="ml-2 p-2 flex space-x-6">
                    <button className="cursor-pointer text-xl rounded border border-b-black p-2" onClick={deleteAll}>Delete all todos and categories</button>
                    <button className="cursor-pointer text-xl rounded border border-b-black p-2" onClick={deleteAcc}>Delete account</button>
                </div>
            </div>
        </div>
    );
}

export default User;