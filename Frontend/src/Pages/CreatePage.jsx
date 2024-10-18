import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  let handleCreate = async () => {
    const data = {
      title,
      description,
      status,
    };

    const response = axios.post("http://localhost:5000/task/add", data);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="h-screen flex justify-center items-center">
        <div className="p-8 border shadow bg-slate-200 rounded">
          <h2 className=" font-bold text-2xl">Create Task</h2>
          <div className="flex flex-col">
            <input
              className="w-96 mt-3 py-1.5 px-2 shadow rounded"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-96 mt-3 py-1.5 px-2 shadow rounded"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <h4 className="text-xl font-semibold rounded">Status</h4>
            <select
              className="mt-3 w-96 py-2 px-1.5"
              onChange={(e) => setStatus(e.target.value)}
              name="Status"
            >
              <option value="new">New</option>
              <option value="ongoing">On Going</option>
              <option value="cancel">Cancel</option>
              <option value="completed">Completed</option>
            </select>

            <button
              onClick={() => handleCreate()}
              className="py-1.5 mt-3 px-2 rounded border text-white hover:text-[#04716F] hover:bg-transparent duration-300 border-[#04716F] font-semibold bg-[#04716F]"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
