import { Eye, Pencil, Trash2 } from "lucide-react";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const ActivityTable = ({
    activities,
    loading,
    onEdit,
    onDelete
}) => {

    const { navigate } = useContext(AppContext);
    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
                <p className="text-gray-500">Loading activities...</p>
            </div>
        );
    }

    if (!activities.length) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border p-10 text-center">
                <p className="text-gray-500">No activities found</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border  border-gray-400 overflow-x-auto">

            <table className="w-full text-sm overflow-x-auto">

                <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
                    <tr>
                        <th className="px-6 py-4 text-left">Type</th>
                        <th className="px-6 py-4 text-left">Lead</th>
                        <th className="px-6 py-4 text-left">Notes</th>
                        <th className="px-6 py-4 text-left">Reminder</th>
                        <th className="px-6 py-4 text-left">Performed By</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {activities.map((activity) => (
                        <tr
                            key={activity._id}
                            className="border-t border-gray-400 hover:bg-gray-50 transition"
                        >

                            <td className="px-6 py-4 font-medium capitalize">
                                {activity.type}
                            </td>

                            <td className="px-6 py-4">
                                <div className="font-medium">
                                    {activity.lead?.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {activity.lead?.company}
                                </div>
                            </td>

                            <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                                {activity.notes}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                                {activity.reminderDate
                                    ? new Date(activity.reminderDate).toLocaleDateString()
                                    : "—"}
                            </td>

                            <td className="px-6 py-4 text-gray-600">
                                {activity.performedBy?.name}
                            </td>

                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-4">

                                    <button
                                        onClick={() => onEdit(activity)}
                                        className="text-gray-500 cursor-pointer hover:text-indigo-600 transition"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button
                                        onClick={() => navigate(`/activities/${activity?._id}`)}
                                        className="text-gray-500 cursor-pointer hover:text-green-600 transition"
                                    >
                                        <Eye size={16} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(activity)}
                                        className="text-gray-500 cursor-pointer hover:text-red-500 transition"
                                    >
                                        <Trash2 size={16} />
                                    </button>

                                </div>
                            </td>

                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
};


export default ActivityTable;
