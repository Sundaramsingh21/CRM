import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";
import { getDealStageStyle } from "../../utils/dealStageBadge";

const DealsTable = ({ deals, loading, setOpenEdit, setOpenDelete }) => {
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                Loading deals...
            </div>
        );
    }

    if (!deals?.length) {
        return (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                No deals found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Lead</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Stage</th>
                            <th className="px-6 py-4">Assigned To</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {deals.map((deal) => (
                            <tr
                                key={deal._id}
                                className="hover:bg-gray-50 transition cursor-pointer"
                                onClick={() => navigate(`/deals/${deal._id}`)}
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {deal.title}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {deal.lead?.name || "-"}
                                </td>

                                <td className="px-6 py-4 font-semibold text-gray-800">
                                    ₹ {Number(deal.amount).toLocaleString("en-IN")}
                                </td>

                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getDealStageStyle(
                                            deal.stage
                                        )}`}
                                    >
                                        {deal.stage}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {deal.assignedTo?.name || "-"}
                                </td>

                                <td
                                    className="px-6 py-4 text-right"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-end gap-4">
                                        <button
                                            onClick={() => setOpenEdit(deal)}
                                            className="text-indigo-600 hover:text-indigo-800 transition"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() => navigate(`/deals/${deal._id}`)}
                                            className="text-green-600 hover:text-green-800 transition"
                                        >
                                            <Eye size={16} />
                                        </button>

                                        <button
                                            onClick={() => setOpenDelete(deal)}
                                            className="text-red-500 hover:text-red-700 transition"
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

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden divide-y divide-gray-200">
                {deals.map((deal) => (
                    <div
                        key={deal._id}
                        className="p-5 space-y-3 hover:bg-gray-50 transition cursor-pointer"
                        onClick={() => navigate(`/deals/${deal._id}`)}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {deal.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {deal.lead?.name || "-"}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getDealStageStyle(
                                    deal.stage
                                )}`}
                            >
                                {deal.stage}
                            </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p>
                                <span className="font-medium">Amount:</span> ₹{" "}
                                {Number(deal.amount).toLocaleString("en-IN")}
                            </p>
                            <p>
                                <span className="font-medium">Assigned To:</span>{" "}
                                {deal.assignedTo?.name || "-"}
                            </p>
                        </div>

                        <div
                            className="flex gap-4 pt-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setOpenEdit(deal)}
                                className="text-indigo-600"
                            >
                                <Pencil size={18} />
                            </button>

                            <button
                                onClick={() => navigate(`/deals/${deal._id}`)}
                                className="text-green-600"
                            >
                                <Eye size={18} />
                            </button>

                            <button
                                onClick={() => setOpenDelete(deal)}
                                className="text-red-500"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default DealsTable;
