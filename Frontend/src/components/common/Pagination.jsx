const Pagination = ({ pagination, setPage }) => {
    const { currentPage, totalPages } = pagination;

    return (
        <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                            ? "bg-indigo-600 text-white"
                            : "bg-white border"
                        }`}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;