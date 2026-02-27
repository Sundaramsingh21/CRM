const LeadFilters = ({ search, setSearch, status, setStatus }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md  flex flex-col md:flex-row gap-4 items-center">

            <input
                type="text"
                placeholder="Search by name, email, company..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-4 py-3 cursor-pointer border border-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
            </select>
        </div>
    );
};

export default LeadFilters;