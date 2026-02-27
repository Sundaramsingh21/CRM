const StatCard = ({ title, value, icon }) => {
    return (
        <div className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-gray-100">

            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500">{title}</p>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">
                        {value}
                    </h2>
                </div>

                <div className="p-3 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                    {icon}
                </div>
            </div>

            {/* subtle glow */}
            <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-indigo-100 rounded-full blur-2xl opacity-30"></div>
        </div>
    );
};

export default StatCard;