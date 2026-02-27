import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const DeleteConfirm = ({ lead, onClose }) => {
    const { deleteLead } = useContext(AppContext);

    const handleDelete = () => {
        deleteLead(lead._id);
        onClose();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-600">
                Delete Lead
            </h2>

            <p>
                Are you sure you want to delete{" "}
                <strong>{lead.name}</strong>?
            </p>

            <div className="flex justify-end gap-4">
                <button onClick={onClose} className="px-4 py-2 border rounded-lg">
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirm;