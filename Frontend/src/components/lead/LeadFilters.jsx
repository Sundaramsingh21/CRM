import { Search, SlidersHorizontal, X } from "lucide-react";

const LeadFilters = ({ search, setSearch, status, setStatus }) => {
    const clearFilters = () => {
        setSearch("");
        setStatus("");
    };

    return (
        <div className="bg-white p-5 md:p-6 rounded-xl shadow-sm border border-gray-200">

            <div className="flex flex-col md:flex-row gap-4 md:items-center">

                {/* Search Input */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search by name, email, company..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 text-sm border border-gray-300 rounded-lg 
                                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                                   outline-none transition"
                    />
                </div>

                {/* Status Dropdown */}
                <div className="relative w-full md:w-52">
                    <SlidersHorizontal
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg
                                   focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                   outline-none transition appearance-none bg-white cursor-pointer"
                    >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>

                {/* Clear Button */}
                {(search || status) && (
                    <button
                        onClick={clearFilters}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-sm 
                                   bg-gray-100 hover:bg-gray-200 text-gray-600 
                                   rounded-lg transition"
                    >
                        <X size={16} />
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default LeadFilters;
