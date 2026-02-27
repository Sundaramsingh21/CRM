import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import ActivityTable from "../../components/activity/ActivityTable";
import ActivityForm from "../../components/activity/ActivityForm";
import DeleteConfirmActivity from "../../components/activity/DeleteConfirmActivity";
import Modal from "../../components/common/Modal";
import Pagination from "../../components/common/Pagination";
import { Plus } from "lucide-react";
import Loading from "../../components/Loading";

const Activities = () => {
  const { BackendURL, token } = useContext(AppContext);

  const [activities, setActivities] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedType, setSelectedType] = useState("all");

  const fetchActivities = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BackendURL}/api/activities?page=${page}&limit=10${selectedType !== "all" ? `&type=${selectedType}` : ""
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.status) {
        setActivities(res.data.activities);
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [page, selectedType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Activities
            </h1>
            <p className="text-sm text-gray-500">
              Manage and track all logged activities
            </p>
          </div>

          <button
            onClick={() => setOpenCreate(true)}
            className="flex items-center cursor-pointer gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-sm"
          >
            <Plus size={18} />
            Create
          </button>
        </div>

        {/* Type Filter */}
        <div className="flex gap-3">

          {["all", "call", "meeting", "email"].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-xl cursor-pointer border border-gray-400 text-sm font-medium transition ${selectedType === type
                ? "bg-indigo-600 text-white shadow"
                : "bg-white border hover:bg-gray-50"
                }`}
            >
              {type === "all"
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}

        </div>

        {/* Table */}
        <ActivityTable
          activities={activities}
          loading={loading}
          onEdit={(activity) => {
            setSelectedActivity(activity);
            setOpenEdit(true);
          }}
          onDelete={(activity) => {
            setSelectedActivity(activity);
            setOpenDelete(true);
          }}
        />

        <Pagination
          pagination={pagination}
          setPage={setPage}
        />

      </div>

      {/* Create Modal */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <ActivityForm
          onClose={() => {
            setOpenCreate(false);
            fetchActivities();
          }}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <ActivityForm
          initialData={selectedActivity}
          onClose={() => {
            setOpenEdit(false);
            fetchActivities();
          }}
        />
      </Modal>

      {/* Delete Modal */}
      <Modal open={openDelete} onClose={() => setOpenDelete(false)}>
        <DeleteConfirmActivity
          activity={selectedActivity}
          onClose={() => {
            setOpenDelete(false);
            fetchActivities();
          }}
        />
      </Modal>

    </div>
  );
};

export default Activities;