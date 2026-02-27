import { Link } from "react-router-dom";

const LeadsTable = ({ leads, setOpenEdit, setOpenDelete }) => {
    if (!leads?.length)
        return (
            <div className="bg-white p-8 rounded-2xl shadow-sm border text-center text-gray-500">
                No leads found
            </div>
        );

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
            <table className="w-full text-left">

                <thead className="bg-gray-100 text-gray-600 text-sm">
                    <tr>
                        <th className="p-5">Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th className="text-center pr-6">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {leads.map((lead) => (
                        <tr
                            key={lead._id}
                            className="border-t border-gray-400 hover:bg-gray-50 transition"
                        >
                            <td className="p-5 font-medium text-gray-800">
                                {lead.name}
                            </td>

                            <td className="text-gray-600">{lead.email}</td>
                            <td className="text-gray-600">{lead.phone}</td>
                            <td className="text-gray-600">{lead.company}</td>

                            <td>
                                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600">
                                    {lead.status}
                                </span>
                            </td>

                            <td className="text-center space-x-4">

                                <button
                                    onClick={() => setOpenEdit(lead)}
                                    className="text-indigo-600 cursor-pointer hover:underline"
                                >
                                    Edit
                                </button>

                                <Link to={`/leads/${lead?._id}`}>
                                <button className="text-green-600 cursor-pointer hover:underline">
                                    View
                                </button>
                                </Link>

                                <button
                                    onClick={() => setOpenDelete(lead)}
                                    className="text-red-500 cursor-pointer hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default LeadsTable;