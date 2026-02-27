const BreakdownList = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-gray-400">No data available</p>;
    }

    return (
        <div className="space-y-4">
            {data.map((item, index) => (
                <div key={index}>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span className="capitalize">{item._id}</span>
                        <span>{item.count}</span>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full">
                        <div
                            className="bg-indigo-500 h-2 rounded-full"
                            style={{ width: `${item.count * 20}%` }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BreakdownList;