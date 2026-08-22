function Authentication({ isLogin }: { isLogin: boolean }) {
    const handleForm = () => { };

    return (
        <form
            onSubmit={handleForm}
            className="mx-auto w-full max-w-md space-y-6 p-6 flex flex-col rounded border-2 border-gray-300"
        >
            <p className="mx-auto text-4xl font-bold">TodoApp</p>
            <span className="border-t-2 border-gray-300"></span>
            <p className="text-3xl font-bold">{isLogin ? "Login:" : "Register:"}</p>
            <div className="flex flex-col space-y-6">
                <label className="space-x-2">
                    <span className="text-xl">Email:</span>
                    <input id="email" name="email" type="email" required className="p-2 rounded border-2 border-gray-500" />
                </label>
                <label className="space-x-2">
                    <span className="text-xl">Password:</span>
                    <input id="password" name="password" type="password" required className="p-2 rounded border-2 border-gray-500" />
                </label>
                <button type="submit" className="p-2 bg-blue-300 rounded cursor-pointer">{isLogin ? "Login" : "Register"}</button>
            </div>
            <span className="border-t-2 border-gray-300"></span>
            {isLogin && <p>Don't have an account yet? Register <a href="/register" className="cursor-pointer underline hover:text-blue-600">here</a>.</p>}
            {!isLogin && <p>Have an account already? Login <a href="/login" className="cursor-pointer underline hover:text-blue-600">here</a>.</p>}
        </form>

    )
}

export default Authentication;