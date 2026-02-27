import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { getUserStatusStyle } from "../../utils/userStatusBadge";
import CreateUserModal from "./CreateUserModal";
import Modal from "../common/Modal";
import ConfirmActionModal from "./ConfirmActionModal";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import Loading from "../Loading";

const AllUsers = () => {
    const { BackendURL, token } = useContext(AppContext);

    const [users, setUsers] = useState([]);
    const [openCreate, setOpenCreate] = useState(false);
    const [openReject, setOpenReject] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionType, setActionType] = useState(null); // "approve" or "reject"
    const [loading, setloading] = useState(false)

    const fetchUsers = async () => {

        try {
            setloading(true)
            const res = await axios.get(
                `${BackendURL}/api/auth/sales/users`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                setUsers(res.data.users);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setloading(false)
        }
    };

    const handleConfirm = async () => {
        if (!selectedUser || !actionType) return;

        try {
            const res = await axios.put(
                `${BackendURL}/api/auth/${selectedUser._id}/${actionType}`,
                {},
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (res.data?.status) {
                toast.success(res.data.message);

                setOpenReject(false);
                setSelectedUser(null);
                setActionType(null);

                fetchUsers();
            }

        } catch (error) {
            toast.error("Something went wrong");
            console.log("Action error:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <Loading />
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex justify-end">
                <button
                    onClick={() => setOpenCreate(true)}
                    className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl"
                >
                    <Plus size={16} />
                    Create  User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-x-auto">

                <table className="w-full text-sm overflow-x-auto">

                    <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left">Name</th>
                            <th className="px-6 py-4 text-left">Email</th>
                            <th className="px-6 py-4 text-left">Status</th>
                            <th className="px-6 py-4 text-left">Role</th>
                            <th className="px-6 py-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t border-gray-400 hover:bg-gray-50">

                                <td className="px-6 py-4 font-medium">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {user.email}
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

                                <td className="px-6 py-4 capitalize">
                                    {user.role}
                                </td>
                                <td className="px-6 py-4 flex gap-3">

                                    {user.status === "approved" && (
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setActionType("reject");
                                                setOpenReject(true);
                                            }}
                                            className="px-4 border border-red-300 cursor-pointer py-2 text-xs bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                        >
                                            Reject
                                        </button>
                                    )}

                                    {user.status === "rejected" && (
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setActionType("approve");
                                                setOpenReject(true);
                                            }}
                                            className="px-4 border border-green-300 cursor-pointer py-2 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
                                        >
                                            Approve
                                        </button>
                                    )}

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {/* Create Modal */}
            <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
                <CreateUserModal
                    onClose={() => {
                        setOpenCreate(false);
                        fetchUsers();
                    }}
                />
            </Modal>

            {/* Reject Modal */}
            <Modal open={openReject} onClose={() => setOpenReject(false)}>
                <ConfirmActionModal
                    user={selectedUser}
                    actionType={actionType}
                    onClose={() => {
                        setOpenReject(false);
                        setSelectedUser(null);
                        setActionType(null);
                    }}
                    onConfirm={handleConfirm}
                />
            </Modal>

        </div>
    );
};


export default AllUsers;
