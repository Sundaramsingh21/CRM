import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";

const ActivityForm = ({ initialData, onClose }) => {
    const { BackendURL, token, leads } = useContext(AppContext);

    const [formData, setFormData] = useState({
        type: "",
        notes: "",
        lead: "",
        reminderDate: ""
    });


    const [loading, setLoading] = useState(false);

    // Populate edit data
    useEffect(() => {
        if (initialData) {
            setFormData({
                type: initialData.type || "",
                notes: initialData.notes || "",
                lead: initialData.lead?._id || "",
                reminderDate: initialData.reminderDate
                    ? initialData.reminderDate.split("T")[0]
                    : ""
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (initialData) {
                await axios.put(
                    `${BackendURL}/api/activities/${initialData._id}`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                await axios.post(
                    `${BackendURL}/api/activities/add`,
                    formData,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }

            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-white rounded-2xl p-3">

            <h2 className="text-xl font-semibold mb-6">
                {initialData ? "Edit Activity" : "Log Activity"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Type */}
                <div>
                    <label className="text-sm text-gray-600">Activity Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Type</option>
                        <option value="call">Call</option>
                        <option value="meeting">Meeting</option>
                        <option value="email">Email</option>
                    </select>
                </div>

                {/* Lead */}
                <div>
                    <label className="text-sm text-gray-600">Lead</label>
                    <select
                        name="lead"
                        value={formData.lead}
                        onChange={handleChange}
                        required
                        disabled={initialData}
                        className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Select Lead</option>
                        {leads.map((lead) => (
                            <option key={lead._id} value={lead._id}>
                                {lead.name} — {lead.company}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Notes */}
                <div>
                    <label className="text-sm text-gray-600">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Reminder */}
                <div>
                    <label className="text-sm text-gray-600">Reminder Date</label>
                    <input
                        type="date"
                        name="reminderDate"
                        value={formData.reminderDate}
                        onChange={handleChange}
                        className="w-full mt-1 border rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-xl hover:bg-indigo-700 transition"
                >
                    {loading
                        ? "Saving..."
                        : initialData
                            ? "Update Activity"
                            : "Create Activity"}
                </button>

            </form>
        </div>
    );
};

export default ActivityForm;