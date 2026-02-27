import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import DealsTable from "../../components/deal/DealsTable";
import DealFilters from "../../components/deal/DealFilters";
import Modal from "../../components/common/Modal";
import DealForm from "../../components/deal/DealForm";
import DeleteConfirm from "../../components/deal/DeleteConfirm";
import Pagination from "../../components/common/Pagination";
import { Plus } from "lucide-react";
import Loading from "../../components/Loading";

const Deals = () => {
  const { deals, dealsLoading, dealsPagination, getDeals } =
    useContext(AppContext);

  const [stage, setStage] = useState("");
  const [page, setPage] = useState(1);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  useEffect(() => {
    getDeals({ page, stage });
  }, [page, stage]);

  if (dealsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-10 bg-gray-50 min-h-screen space-y-8">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Deals Pipeline
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track your active deals
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center cursor-pointer gap-2 px-5 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
          >
            <Plus size={18} />
            Add Deal
          </button>

          {/* Filters */}
          <DealFilters stage={stage} setStage={setStage} />
        </div>

      </div>



      {/* Table */}
      <DealsTable
        deals={deals}
        loading={dealsLoading}
        setOpenEdit={setOpenEdit}
        setOpenDelete={setOpenDelete}
      />

      {/* Pagination */}
      {dealsPagination && (
        <Pagination
          pagination={dealsPagination}
          setPage={setPage}
        />
      )}

      {/* Create Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <DealForm onClose={() => setOpenCreate(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal open={!!openEdit} onClose={() => setOpenEdit(null)}>
        {openEdit && (
          <DealForm
            initialData={openEdit}
            onClose={() => setOpenEdit(null)}
          />
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal open={!!openDelete} onClose={() => setOpenDelete(null)}>
        {openDelete && (
          <DeleteConfirm
            deal={openDelete}
            onClose={() => setOpenDelete(null)}
          />
        )}
      </Modal>

    </div>
  );
};

export default Deals;