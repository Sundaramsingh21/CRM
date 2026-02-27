import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { getUserStatusStyle } from "../../utils/userStatusBadge";
import Modal from "../common/Modal";
import ConfirmActionModal from "./ConfirmActionModal";
import { toast } from "react-toastify";

const PendingUsers = () => {
    const { BackendURL, token } = useContext(AppContext);

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(null);
    const [openConfirm, setOpenConfirm] = useState(false);

    const fetchPendingUsers = async () => {
        try {
            const res = await axios.get(
                `${BackendURL}/api/auth/pending`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                setUsers(res.data.users);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleActionClick = (user, type) => {
        setSelectedUser(user);
        setActionType(type); // "approve" or "reject"
        setOpenConfirm(true);
    };
    const handleConfirm = async () => {
        try {
            const endpoint =
                actionType === "approve"
                    ? `${BackendURL}/api/auth/${selectedUser._id}/approve`
                    : `${BackendURL}/api/auth/${selectedUser._id}/reject`;

            const res = await axios.put(
                endpoint,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data?.status) {
                setOpenConfirm(false);
                setSelectedUser(null);
                setActionType(null);
                toast.success(
                    actionType === "approved"
                        ? "User approved successfully"
                        : "User rejected successfully"
                );

                fetchPendingUsers(); // refresh table
            }
        } catch (error) {
            console.log("Error updating user:", error);
        }
    };

    return (
        <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">

                <table className="w-full text-sm overflow-x-auto">

                    <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="4"
                                    className="text-center py-10 text-gray-400"
                                >
                                    No pending users found
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {user.name}
                                    </td>


                                    <td className="px-6 py-4 text-gray-600">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {user?.role}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full ${getUserStatusStyle(
                                                user.status
                                            )}`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 flex gap-3 justify-center ">

                                        <button
                                            onClick={() => handleActionClick(user, "approve")}
                                            className="px-5 py-2 text-xs cursor-pointer border border-green-300 bg-green-100 text-green-600  rounded-lg hover:bg-green-200"
                                        >
                                            Approve
                                        </button>

                                        <button
                                            onClick={() => handleActionClick(user, "rejecte")}
                                            className="px-5 py-2 border cursor-pointer border-red-300 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                        >
                                            Reject
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>

            {/* Confirmation Modal */}
            <Modal
                open={openConfirm}
                onClose={() => setOpenConfirm(false)}
            >
                <ConfirmActionModal
                    user={selectedUser}
                    actionType={actionType}
                    onConfirm={handleConfirm}
                    onClose={() => setOpenConfirm(false)}
                />
            </Modal>

        </div>
    );
};


export default PendingUsers;
