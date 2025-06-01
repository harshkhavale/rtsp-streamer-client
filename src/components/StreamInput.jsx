import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStream } from "../../redux/slices/streamSlice";
import { Plus } from "lucide-react";
import { createStream } from "../utils";

const StreamInput = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rtsp_url: "",
    description: "",
    confidence_threshold: 0.8,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "confidence_threshold" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.rtsp_url.trim()) return;

    setLoading(true);
    try {
      const result = await createStream(formData);
      dispatch(addStream(result)); // Dispatch newly created stream (adjust if needed)
      closeForm();
      setFormData({
        name: "",
        rtsp_url: "",
        description: "",
        confidence_threshold: 0.8,
      });
    } catch (err) {
      alert(err.message || "Failed to create stream");
    }
    setLoading(false);
  };

  return (
    <>
      {!showForm && (
        <button
          onClick={openForm}
          className="px-4 py-2 absolute top-4 right-4 flex items-center gap-1 bg-blue-600 text-white rounded"
        >
          Create New Stream <Plus />
        </button>
      )}

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/10 bg-opacity-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-black rounded p-6 max-w-md w-full flex flex-col gap-4"
          >
            <h2 className="text-xl font-semibold">Create New Stream</h2>

            <input
              type="text"
              name="name"
              placeholder="Name (required)"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="rtsp_url"
              placeholder="RTSP URL (required)"
              value={formData.rtsp_url}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />

            <input
              type="text"
              name="description"
              placeholder="Description (optional)"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <input
              type="number"
              step="0.01"
              min="0"
              max="1"
              name="confidence_threshold"
              placeholder="Confidence Threshold (0-1)"
              value={formData.confidence_threshold}
              onChange={handleChange}
              className="border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeForm}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StreamInput;
