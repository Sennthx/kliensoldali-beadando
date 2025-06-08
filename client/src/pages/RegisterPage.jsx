import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE = import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Registration failed.");
                return;
            }

            localStorage.setItem("token", data.data.token);
            toast.success("Registration successful");
            navigate("/");
        } catch (err) {
            toast.error("Server error. Try again later: ", err);
        }
    };

    return (
        <div className="flex items-start justify-center mt-8 bg-base-100 p-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-base-200 rounded-lg shadow-lg border border-secondary">
                <h2 className="text-2xl font-bold text-center">Register</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="label mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={handleChange}
                    />
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
                    />
                    <label className="label mb-2">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="******"
                        className="input input-bordered w-full"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label className="label mb-2">Confirm Password</label>
                    <input
                        name="password_confirmation"
                        type="password"
                        placeholder="******"
                        className="input input-bordered w-full"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-primary w-full">
                        Register
                    </button>
                </form>
                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
