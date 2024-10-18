import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function HomePage() {
  let [task, setTask] = useState([]);
  let [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/task/all");

        const task = response?.data?.data;

        setTask(task);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [fetch]);

  let handleDelete = async (id) => {
    let response = await axios.delete(
      `http://localhost:5000/task/delete/${id}`
    );
    console.log(response);
    setFetch(!fetch);
  };

  return (
    <div className="container">
      <div>
        <div className="flex justify-between py-8">
          <h1 className="font-bold text-2xl">Tasks</h1>
          <Link
            className="py-2 px-3 rounded bg-green-500 text-white font-semibold"
            to="/create"
          >
            Add Task
          </Link>
        </div>
        <div className="mt-8">
          {task?.map((item) => (
            <div className="p-5 rounded border shadow mt-5" key={item?._id}>
              <h2 className="font-bold text-xl">Task: {item?.title}</h2>
              <p className="font-semibold">Description: {item?.description}</p>
              <p className="">Status: {item?.status}</p>
              <MdDelete
                onClick={() => handleDelete(item?._id)}
                className="text-red-600 text-xl mt-2"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
