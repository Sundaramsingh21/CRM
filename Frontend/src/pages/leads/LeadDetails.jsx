import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ArrowLeft, Pencil } from "lucide-react";
import Modal from "../../components/common/Modal";
import LeadForm from "../../components/lead/LeadForm";

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { BackendURL, token } = useContext(AppContext);

  const [lead, setLead] = useState(null);
  const [deals, setDeals] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchLeadById = async () => {
      try {
        const res = await axios.get(`${BackendURL}/api/leads/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status) {
          setLead(res.data.lead);
          setDeals(res.data?.deal || []);
        } else {
          toast.error(res.data?.message || "Something went wrong");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch lead");
      }
    };

    fetchLeadById();
  }, [id, token]);

  const Detail = ({ label, value }) => (
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="text-base font-medium text-gray-800 wrap-break-word">
        {value || "—"}
      </p>
    </div>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-700";
      case "contacted":
        return "bg-yellow-100 text-yellow-700";
      case "qualified":
        return "bg-purple-100 text-purple-700";
      case "converted":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (!lead)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Loading lead details...</p>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen p-10">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top Navigation */}
        <div className="flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft size={18} />
            Back to Leads
          </button>

          <button
            onClick={() => setOpenEdit(true)}
            className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            <Pencil size={16} />
            Edit Lead
          </button>

        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100">

          {/* Header Section */}
          <div className="px-10 py-8 border-b bg-linear-to-r from-gray-50 to-white rounded-t-2xl">

            <div className="flex items-center justify-between">

              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 capitalize">
                  {lead.name}
                </h1>

                <p className="text-gray-500 text-sm">
                  {lead.company || "No company added"}
                </p>
              </div>

              <span
                className={`px-4 py-1.5 text-sm font-medium rounded-full ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>

            </div>

          </div>

          {/* Details Section */}
          <div className="px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-10">

            <Detail label="Email Address" value={lead.email} />


            <Detail
              label="Assigned To (Sales User)"
              value={lead.assignedTo?.name}
            />
            <Detail label="Phone Number" value={lead.phone} />

            <Detail
              label="Email (Sales User)"
              value={lead.assignedTo?.email}
            />

            <Detail
              label="Created At"
              value={new Date(lead.createdAt).toLocaleString()}
            />

            <Detail
              label="Last Updated"
              value={new Date(lead.updatedAt).toLocaleString()}
            />

          </div>

        </div>
        {/* Deals Section */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-10">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Related Deals
            </h2>

            <span className="text-sm text-gray-500">
              {deals.length} Deal{deals.length !== 1 && "s"}
            </span>
          </div>

          {deals.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No deals found for this lead.
            </div>
          ) : (
            <div className="space-y-4">
              {deals.map((deal) => (
                <div
                  key={deal._id}
                  className="p-6 border rounded-xl flex justify-between items-center hover:shadow-sm transition bg-gray-50"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {deal.title}
                    </h3>

                    <span className="text-sm text-gray-500">
                      Stage: {deal.stage}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-indigo-600 font-bold text-lg">
                      ₹ {deal.amount.toLocaleString()}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(deal.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <LeadForm
          initialData={lead}
          onClose={() => {
            setOpenEdit(false);
            window.location.reload(); // quick refresh after update
          }}
        />
      </Modal>

    </div>
  );
};

export default LeadDetail;
