import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const DealForm = ({ initialData = {}, onClose }) => {
    const { createDeal, updateDeal, leads } = useContext(AppContext);

    const [form, setForm] = useState({
        title: "",
        amount: "",
        stage: "Prospect",
        lead: "",
    });
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (initialData._id) {
            setForm({
                title: initialData.title || "",
                amount: initialData.amount || "",
                stage: initialData.stage || "Prospect",
                lead: initialData.lead?._id || "",
            });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);

        if (initialData._id) {
            updateDeal(initialData._id, form);
        } else {
            createDeal(form);
        }

        setLoading(false);

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <h2 className="text-xl font-bold text-gray-800">
                {initialData._id ? "Edit Deal" : "Create Deal"}
            </h2>

            <input
                type="text"
                placeholder="Deal Title"
                required
                value={form.title}
                onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <input
                type="number"
                placeholder="Amount"
                required
                value={form.amount}
                onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <select
                value={form.stage}
                onChange={(e) =>
                    setForm({ ...form, stage: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                <option value="Prospect">Prospect</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
            </select>

            <select
                required
                value={form.lead}
                onChange={(e) =>
                    setForm({ ...form, lead: e.target.value })
                }
                className="w-full border px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            >
                <option value="">Select Lead</option>
                {leads?.map((lead) => (
                    <option key={lead._id} value={lead._id}>
                        {lead.name} ({lead.company})
                    </option>
                ))}
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
                {initialData._id ? "Update Deal" : "Create Deal"}
            </button>

        </form>
    );
};

export default DealForm;