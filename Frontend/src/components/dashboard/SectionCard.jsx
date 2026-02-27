const SectionCard = ({ title, children }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
                {title}
            </h3>
            {children}
        </div>
    );
};

export default SectionCard;