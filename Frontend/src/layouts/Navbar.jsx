import { Menu } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = ({ setSidebarOpen }) => {
    const { user, logout, navigate } = useContext(AppContext);

    const getInitial = () => {
        return user?.name ? user.name.charAt(0).toUpperCase() : "";
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">

            {/* Left */}
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden text-gray-600"
                    onClick={() => setSidebarOpen(true)}
                >
                    <Menu size={22} />
                </button>

                <h1 className="text-lg font-semibold text-gray-800 lg:hidden">
                    CRM Pro
                </h1>
            </div>

            {/* Right */}
            <div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                            {getInitial()}
                        </div>

                        <button
                            onClick={logout}
                            className="text-sm cursor-pointer text-gray-600 hover:text-red-500 transition"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={()=>navigate("/login")}
                        className="px-5 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-indigo-700 transition"
                    >
                        Login
                    </button>
                )}
            </div>

        </header>
    );
};

export default Navbar;