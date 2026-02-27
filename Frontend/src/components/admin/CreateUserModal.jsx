import { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";

const CreateUserModal = ({ onClose }) => {
    const { BackendURL, token } = useContext(AppContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await axios.post(
                `${BackendURL}/api/auth/create/sales/user`,
                form,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data?.status) {
                toast.success(res.data?.message || "Create Successfully")
            }
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-white rounded-2xl">

            <h2 className="text-xl font-semibold mb-6">
                Create Sales User
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-400 rounded-xl px-4 py-2"
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-400 rounded-xl px-4 py-2"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-400 rounded-xl px-4 py-2"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer bg-indigo-600 text-white py-2 rounded-xl"
                >
                    {loading ? "Creating..." : "Create User"}
                </button>

            </form>
        </div>
    );
};

export default CreateUserModal;