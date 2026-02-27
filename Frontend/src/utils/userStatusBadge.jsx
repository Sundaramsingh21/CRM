export const getUserStatusStyle = (status) => {
    switch (status) {
        case "approved":
            return "bg-green-100 text-green-600";
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "rejected":
            return "bg-red-100 text-red-600";
        default:
            return "bg-gray-100 text-gray-600";
    }
};