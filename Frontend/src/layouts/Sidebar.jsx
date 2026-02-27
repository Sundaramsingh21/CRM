import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Briefcase,
    Activity,
    X,
    User,
} from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const { user } = useContext(AppContext);
    const linkStyle =
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all";

    const activeStyle =
        "bg-indigo-50 text-indigo-600 shadow-sm";

    const inactiveStyle =
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900";

    return (
        <>
            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed lg:static z-40 w-64 bg-white border-r border-gray-200 h-full transform transition-transform duration-300  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
                        CRM Pro
                    </h1>

                    <button
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="mt-6 px-4 space-y-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                        }
                    >
                        <LayoutDashboard size={18} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/leads"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                        }
                    >
                        <Users size={18} />
                        Leads
                    </NavLink>

                    <NavLink
                        to="/deals"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                        }
                    >
                        <Briefcase size={18} />
                        Deals
                    </NavLink>

                    <NavLink
                        to="/activities"
                        className={({ isActive }) =>
                            `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                        }
                    >
                        <Activity size={18} />
                        Activities
                    </NavLink>
                    {user.role === "admin" &&
                        <NavLink
                            to="/admin-users"
                            className={({ isActive }) =>
                                `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`
                            }
                        >
                            <User size={18} />
                            Users
                        </NavLink>
                    }
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;