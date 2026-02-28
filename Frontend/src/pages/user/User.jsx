import { useState } from "react";
import AllUsers from "../../components/admin/AllUsers";
import PendingUsers from "../../components/admin/PendingUsers";

const Users = () => {
    const [activeTab, setActiveTab] = useState("all");

    return (
        <div className="bg-gray-50 min-h-screen p-8 max-sm:p-2">

            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        User Management
                    </h1>
                    <p className="text-sm text-gray-500">
                        Manage sales users and approvals
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-gray-300">

                    <button
                        onClick={() => setActiveTab("all")}
                        className={`pb-3 cursor-pointer text-sm font-medium ${activeTab === "all"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500"
                            }`}
                    >
                        All Sales Users
                    </button>

                    <button
                        onClick={() => setActiveTab("pending")}
                        className={`pb-3 cursor-pointer text-sm font-medium ${activeTab === "pending"
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-500"
                            }`}
                    >
                        Pending Approvals
                    </button>

                </div>

                {/* Tab Content */}
                {activeTab === "all" ? <AllUsers /> : <PendingUsers />}

            </div>
        </div>
    );
};


export default Users;
