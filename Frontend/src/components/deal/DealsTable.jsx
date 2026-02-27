import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 , Eye } from "lucide-react";
import { getDealStageStyle } from "../../utils/dealStageBadge";

const DealsTable = ({ deals, loading, setOpenEdit, setOpenDelete }) => {
    const navigate = useNavigate();

    if (loading)
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
                Loading deals...
            </div>
        );

    if (!deals?.length)
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border text-center text-gray-500">
                No deals found
            </div>
        );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">

            <table className="w-full text-left">

                <thead className="bg-gray-50 text-gray-600 text-sm">
                    <tr>
                        <th className="p-5">Title</th>
                        <th>Lead</th>
                        <th>Amount</th>
                        <th>Stage</th>
                        <th>Assigned To</th>
                        <th className="text-right pr-6">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {deals.map((deal) => (
                        <tr
                            key={deal._id}
                            className="border-t border-gray-400 hover:bg-gray-50 transition cursor-pointer"
                            onClick={() => navigate(`/deals/${deal._id}`)}
                        >
                            <td className="p-5 font-medium text-gray-800">
                                {deal.title}
                            </td>

                            <td className="text-gray-600">
                                {deal.lead?.name}
                            </td>

                            <td className="text-gray-700 font-semibold">
                                ₹ {deal.amount.toLocaleString()}
                            </td>

                            <td>
                                <span
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${getDealStageStyle(
                                        deal.stage
                                    )}`}
                                >
                                    {deal.stage}
                                </span>
                            </td>

                            <td className="text-gray-600">
                                {deal.assignedTo?.name}
                            </td>

                            <td
                                className="text-right pr-6 space-x-3"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setOpenEdit(deal)}
                                    className="text-indigo-600 cursor-pointer hover:text-indigo-800"
                                >
                                    <Pencil size={16} />
                                </button>

                                <button
                                    onClick={() => navigate(`/deals/${deal?._id}`)}
                                    className="text-green-600 cursor-pointer hover:text-green-800"
                                >
                                    <Eye size={16} />
                                </button>

                                <button
                                    onClick={() => setOpenDelete(deal)}
                                    className="text-red-500 cursor-pointer hover:text-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default DealsTable;