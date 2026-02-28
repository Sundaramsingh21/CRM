import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import Modal from "../../components/common/Modal";
import ActivityForm from "../../components/activity/ActivityForm";
import DeleteConfirmActivity from "../../components/activity/DeleteConfirmActivity";
import Loading from "../../components/Loading";

const ActivityDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BackendURL, token } = useContext(AppContext);

    const [activity, setActivity] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const fetchActivity = async () => {
        try {
            const res = await axios.get(
                `${BackendURL}/api/activities/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                setActivity(res.data.activity);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchActivity();
    }, [id]);

    if (!activity) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loading />
            </div>
        );
    }

    const isOverdue =
        activity.reminderDate &&
        new Date(activity.reminderDate) < new Date();

    return (
        <div className="bg-gray-50 min-h-screen p-8 max-sm:p-2">

            <div className="max-w-5xl mx-auto space-y-8">

                {/* Top Bar */}
                <div className="flex justify-between items-center">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
                    >
                        <ArrowLeft size={18} />
                        Back to Activities
                    </button>

                    <div className="flex gap-3">

                        <button
                            onClick={() => setOpenEdit(true)}
                            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                        >
                            <Pencil size={16} />
                            Edit
                        </button>

                    </div>
                </div>

                {/* Main Card */}
                <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-300 space-y-10">

                    {/* Header */}
                    <div className="flex justify-between items-start">

                        <div>
                            <h1 className="text-2xl font-bold capitalize">
                                {activity.type}
                            </h1>

                            <div className="flex gap-3 mt-3">

                                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 capitalize">
                                    {activity.type}
                                </span>

                                {activity.reminderDate && (
                                    <span
                                        className={`px-3 py-1 text-xs rounded-full ${isOverdue
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {isOverdue ? "Overdue" : "Upcoming"}
                                    </span>
                                )}

                            </div>
                        </div>

                    </div>

                    <div className="border-t border-gray-300"></div>

                    {/* Activity Info */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6">
                            Activity Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Notes
                                </p>
                                <p className="text-gray-800">
                                    {activity.notes}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Reminder Date
                                </p>
                                <p>
                                    {activity.reminderDate
                                        ? new Date(activity.reminderDate).toLocaleDateString()
                                        : "—"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Created At
                                </p>
                                <p>
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Last Updated
                                </p>
                                <p>
                                    {new Date(activity.updatedAt).toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="border-t border-gray-300"></div>

                    {/* Lead Info */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6">
                            Lead Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Name
                                </p>
                                <p>{activity.lead?.name}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Company
                                </p>
                                <p>{activity.lead?.company}</p>
                            </div>

                        </div>
                    </div>

                    <div className="border-t border-gray-300"></div>

                    {/* Performed By */}
                    <div>
                        <h2 className="text-lg font-semibold mb-6">
                            Performed By
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Name
                                </p>
                                <p>{activity.performedBy?.name}</p>
                            </div>

                            <div>
                                <p className="text-xs text-gray-400 uppercase">
                                    Email
                                </p>
                                <p>{activity.performedBy?.email}</p>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

            {/* Edit Modal */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <ActivityForm
                    initialData={activity}
                    onClose={() => {
                        setOpenEdit(false);
                        fetchActivity();
                    }}
                />
            </Modal>

        </div>
    );
};


export default ActivityDetail;
