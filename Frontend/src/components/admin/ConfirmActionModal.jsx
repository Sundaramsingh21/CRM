const ConfirmActionModal = ({
    user,
    actionType,
    onConfirm,
    onClose
}) => {
    if (!user) return null;

    const isApprove = actionType === "approve";

    return (
        <div className=" bg-white rounded-2xl p-1">

            <h2 className="text-lg font-semibold mb-4">
                Confirm {isApprove ? "Approval" : "Rejection"}
            </h2>

            <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to{" "}
                <span
                    className={`font-medium ${isApprove
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {actionType}
                </span>{" "}
                user <strong>{user.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">

                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={onConfirm}
                    className={`px-4 py-2 cursor-pointer text-sm text-white rounded-lg ${isApprove ? "bg-green-600" : "bg-red-600"
                        }`}
                >
                    Yes, {isApprove ? "Approve" : "Reject"}
                </button>

            </div>
        </div>
    );
};

export default ConfirmActionModal;