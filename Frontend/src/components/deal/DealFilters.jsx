const DealFilters = ({ stage, setStage }) => {
    return (
        <div className="bg-white p-1 rounded-xl shadow-md  flex gap-4">

            <select
                value={stage}
                onChange={(e) => setStage(e.target.value)}
                className="px-2 py-1 cursor-pointer  rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                <option value="">All Stages</option>
                <option value="Prospect">Prospect</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
            </select>

        </div>
    );
};

export default DealFilters;