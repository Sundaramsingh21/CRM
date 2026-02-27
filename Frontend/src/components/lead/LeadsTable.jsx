import { Link } from "react-router-dom";

const LeadsTable = ({ leads, setOpenEdit, setOpenDelete }) => {
    if (!leads?.length) {
        return (
            <div className="bg-white p-10 rounded-xl shadow-sm border text-center text-gray-500">
                No leads found
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* ================= Desktop Table ================= */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Company</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {leads.map((lead) => (
                            <tr
                                key={lead._id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {lead.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {lead.email}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {lead.phone}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {lead.company}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600 capitalize">
                                        {lead.status}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <div className="flex justify-center gap-4 text-sm font-medium">
                                        <button
                                            onClick={() => setOpenEdit(lead)}
                                            className="text-indigo-600 hover:text-indigo-800 transition"
                                        >
                                            Edit
                                        </button>

                                        <Link
                                            to={`/leads/${lead?._id}`}
                                            className="text-green-600 hover:text-green-800 transition"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={() => setOpenDelete(lead)}
                                            className="text-red-500 hover:text-red-700 transition"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= Mobile Card View ================= */}
            <div className="md:hidden divide-y divide-gray-200">
                {leads.map((lead) => (
                    <div
                        key={lead._id}
                        className="p-5 space-y-3"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">
                                    {lead.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {lead.company}
                                </p>
                            </div>

                            <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600 capitalize">
                                {lead.status}
                            </span>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                            <p><span className="font-medium">Email:</span> {lead.email}</p>
                            <p><span className="font-medium">Phone:</span> {lead.phone}</p>
                        </div>

                        <div className="flex gap-4 pt-2 text-sm font-medium">
                            <button
                                onClick={() => setOpenEdit(lead)}
                                className="text-indigo-600"
                            >
                                Edit
                            </button>

                            <Link
                                to={`/leads/${lead?._id}`}
                                className="text-green-600"
                            >
                                View
                            </Link>

                            <button
                                onClick={() => setOpenDelete(lead)}
                                className="text-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default LeadsTable;
