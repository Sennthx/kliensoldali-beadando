const LoginPage = () => {
    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4">
                    <label className="label mb-2" htmlFor="email" >Email</label>
                    <div className="form-control">
                        <input name="email" type="email" placeholder="email@example.com" className="input input-bordered w-full" />
                    </div>
                    <label className="label mb-2" htmlFor="password">Password</label>
                    <div className="form-control">
                        <input name="password" type="password" placeholder="***********" className="input input-bordered w-full" />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">Login</button>
                </form>
                <p className="text-sm text-center">
                    Don't have an account? <a href="/register" className="text-primary hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
