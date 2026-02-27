import { useContext , useState} from "react";
import { AppContext } from "../../context/AppContext";

const DeleteConfirm = ({ deal, onClose }) => {
    const { deleteDeal } = useContext(AppContext);
    const [loading, setloading] = useState(false)

    const handleDelete = () => {
        setloading(true)
        deleteDeal(deal._id);
        setloading(false);
        onClose();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-red-600">
                Delete Deal
            </h2>

            <p>
                Are you sure you want to delete{" "}
                <strong>{deal.title}</strong>?
            </p>

            <div className="flex justify-end gap-4">
                <button
                    onClick={onClose}
                    className="px-4 cursor-pointer py-2 border rounded-lg"
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteConfirm;