import { useEffect, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";
import LeadsTable from "../../components/lead/LeadsTable";
import LeadFilters from "../../components/lead/LeadFilters";
import Pagination from "../../components/common/Pagination";
import useDebounce from "../../hooks/useDebounce";
import Modal from "../../components/common/Modal";
import LeadForm from "../../components/lead/LeadForm";
import DeleteConfirm from "../../components/lead/DeleteConfirm";

const Leads = () => {
  const { leads, leadsLoading, leadsPagination, getLeads, user } = useContext(AppContext);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1)
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getLeads({ page, search: debouncedSearch, status });
  }, [page, debouncedSearch, status]);


  // useEffect(() => {
  //   getLeads({ page, search, status });
  // }, [page, search, status]);


  return (
    <div className="p-6 bg-gray-50 rounded-md min-h-screen space-y-6">

      <div className="flex justify-between items-center">
        <div className="max-sm:pr-6">
          <h1 className="md:text-3xl sm:text-2xl font-bold text-gray-800">
            Leads Management
          </h1>
          <p className="text-gray-500 max-sm:text-sm mt-1">
            Manage and track all your sales leads
          </p>
        </div>

        <button
          onClick={() => setOpenCreate(true)}
          className="bg-indigo-600 max-sm:w-18 max-sm:text-sm cursor-pointer text-white max-sm:px-2 px-5 py-2.5 rounded-xl shadow hover:bg-indigo-700 transition"
        >
          + Add
        </button>
      </div>

      <LeadFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      {leadsLoading ? (
        <Loading />
      ) : (
        <LeadsTable
          leads={leads}
          setOpenEdit={setOpenEdit}
          setOpenDelete={setOpenDelete}
        />
      )}


      {leadsPagination && (
        <Pagination
          pagination={leadsPagination}
          setPage={setPage}
        />
      )}

      {/* Create Lead Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <LeadForm onClose={() => setOpenCreate(false)} />
      </Modal>

      {/* Edit Lead Modal */}
      <Modal open={!!openEdit} onClose={() => setOpenEdit(null)}>
        {openEdit && (
          <LeadForm
            initialData={openEdit}
            onClose={() => setOpenEdit(null)}
          />
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal open={!!openDelete} onClose={() => setOpenDelete(null)}>
        {openDelete && (
          <DeleteConfirm
            lead={openDelete}
            onClose={() => setOpenDelete(null)}
          />
        )}
      </Modal>

    </div>
  );
};


export default Leads;

