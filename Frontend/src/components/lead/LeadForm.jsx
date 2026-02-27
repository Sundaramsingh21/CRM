import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const LeadForm = ({ initialData = {}, onClose }) => {
  const { createLead, updateLead } = useContext(AppContext);
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
  });

  // When editing, populate form
  useEffect(() => {
    if (initialData && initialData._id) {
      setForm({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        company: initialData.company || "",
        status: initialData.status || "new",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (initialData._id) {
      updateLead(initialData._id, form);
    } else {
      createLead(form);
    }

    setLoading(false)

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <h2 className="text-xl font-bold text-gray-800">
        {initialData._id ? "Edit Lead" : "Create Lead"}
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        required
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        className="w-full border px-4 py-3 border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email Address"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        className="w-full border px-4 py-3 border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Phone */}
      <input
        type="text"
        placeholder="Phone Number"
        value={form.phone}
        onChange={(e) =>
          setForm({ ...form, phone: e.target.value })
        }
        className="w-full border px-4 py-3 border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Company */}
      <input
        type="text"
        placeholder="Company Name"
        value={form.company}
        onChange={(e) =>
          setForm({ ...form, company: e.target.value })
        }
        className="w-full border px-4 py-3 border-gray-400 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
      />

      {/* Status Select */}
      <select
        value={form.status}
        onChange={(e) =>
          setForm({ ...form, status: e.target.value })
        }
        className="w-full border px-4 py-3 border-gray-400 cursor-pointer rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
      >
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="qualified">Qualified</option>
        <option value="converted">Converted</option>
      </select>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
      >
        {initialData._id ? "Update Lead" : "Create Lead"}
      </button>

    </form>
  );
};

export default LeadForm;