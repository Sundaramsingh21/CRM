import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { ArrowLeft, Pencil } from "lucide-react";
import Modal from "../../components/common/Modal";
import DealForm from "../../components/deal/DealForm";
import { getDealStageStyle } from "../../utils/dealStageBadge";

const DealDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { BackendURL, token } = useContext(AppContext);

    const [deal, setDeal] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const fetchDeal = async () => {
        try {
            const res = await axios.get(
                `${BackendURL}/api/deals/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (res.data.status) {
                setDeal(res.data.deal);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDeal();
    }, [id]);

    if (!deal) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <p className="text-gray-500">Loading deal...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen p-8 max-sm:p-2">

            <div className="max-w-6xl mx-auto space-y-8">

                {/* Top Bar */}
                <div className="flex justify-between items-center">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                    >
                        <ArrowLeft size={18} />
                        Back to Deals
                    </button>

                    <button
                        onClick={() => setOpenEdit(true)}
                        className="flex cursor-pointer items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
                    >
                        <Pencil size={16} />
                        Edit Deal
                    </button>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 space-y-10">

                    {/* Header */}
                    <div className="flex justify-between items-start">

                        <div className="space-y-3">
                            <h1 className="text-3xl max-sm:text-xl font-bold text-gray-900">
                                {deal.title}
                            </h1>

                            <span
                                className={`px-4 py-1.5 rounded-full text-sm font-medium ${getDealStageStyle(
                                    deal.stage?.toLowerCase()
                                )}`}
                            >
                                {deal.stage}
                            </span>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500">Deal Value</p>
                            <p className="text-3xl max-sm:text-xl font-bold text-indigo-600">
                                ₹ {deal.amount.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="border-t"></div>

                    {/* Deal Info Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Deal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Stage
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    {deal.stage}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Amount
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    ₹ {deal.amount.toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Created At
                                </p>
                                <p className="text-lg text-gray-700">
                                    {new Date(deal.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Last Updated
                                </p>
                                <p className="text-lg text-gray-700">
                                    {new Date(deal.updatedAt).toLocaleString()}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="border-t"></div>

                    {/* Lead Info Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Lead Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Name
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    {deal.lead?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Email
                                </p>
                                <p className="text-lg text-gray-700">
                                    {deal.lead?.email}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Company
                                </p>
                                <p className="text-lg text-gray-700">
                                    {deal.lead?.company}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="border-t"></div>

                    {/* Owner Section */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Owner Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Assigned To
                                </p>
                                <p className="text-lg font-medium text-gray-800">
                                    {deal.assignedTo?.name}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-wide text-gray-400">
                                    Email
                                </p>
                                <p className="text-lg text-gray-700">
                                    {deal.assignedTo?.email}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Edit Modal */}
            <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
                <DealForm
                    initialData={deal}
                    onClose={() => {
                        setOpenEdit(false);
                        fetchDeal(); // refresh data without reload
                    }}
                />
            </Modal>

        </div>
    );
};


export default DealDetail;

