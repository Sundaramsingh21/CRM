import { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const DeleteConfirmActivity = ({ activity, onClose }) => {
    const { BackendURL, token } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            await axios.delete(
                `${BackendURL}/api/activities/${activity._id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl p-3 text-center">

            <h3 className="text-lg font-semibold mb-3">
                Delete Activity?
            </h3>

            <p className="text-gray-500 mb-6">
                This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4">

                <button
                    onClick={onClose}
                    className="px-5 py-2 rounded-xl border"
                >
                    Cancel
                </button>

                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>

            </div>
        </div>
    );
};

export default DeleteConfirmActivity;