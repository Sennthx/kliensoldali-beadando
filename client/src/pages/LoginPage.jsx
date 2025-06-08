import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailure } from "../store/authSlice";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const loading = useSelector((state) => state.auth.loading);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await fetch(`${API_BASE}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                dispatch(loginFailure(data.message || "Login failed"));
                toast.error(data.message || "Login failed");
                return;
            }

            dispatch(
                loginSuccess({
                    user: {
                        name: data.data.user.name,
                        role: data.data.user.role,
                    },
                    token: data.data.token,
                })
            );

            localStorage.setItem("token", data.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: data.data.user.name,
                    role: data.data.user.role,
                })
            );

            toast.success("Login successful");
            navigate("/");
        } catch {
            dispatch(loginFailure("Server error. Try again later."));
            toast.error("Server error. Try again later.");
        }
    };

    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="label mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        className="input input-bordered w-full"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <label className="label mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="***********"
                        className="input input-bordered w-full"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-sm text-center">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-primary hover:underline"
                    >
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
