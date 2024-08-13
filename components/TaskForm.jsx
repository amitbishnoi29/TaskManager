"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import L from "leaflet";
import toast from "react-hot-toast";
import useTaskStore from "@/store/store";
import { v4 as uuid } from "uuid";

const TaskForm = ({ task, isAdding }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [location, setLocation] = useState(
    task?.location || { lat: 51.505, lng: -0.09 }
  );
  const [address, setAddress] = useState("");
  const router = useRouter();
  const { editTask, addTask } = useTaskStore();

  const handleSave = () => {
    if (!title || !description || !dueDate || !priority || !location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newTask = {
      id: isAdding ? uuid() : task.id,
      title,
      description,
      status: "To do",
      dueDate,
      priority,
      location,
    };

    if (isAdding) {
      addTask(newTask);
    } else {
      editTask(newTask);
    }
    toast.success("Data saved successfully");
    router.push("/"); 
  };

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" class="size-6">
          <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
        </svg>
      `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
  });

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
      );
      const data = await response.json();
      setAddress(data.display_name || "Address not found");
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Error fetching address");
    }
  };

  function LocationSelector() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setLocation({ lat, lng });
        fetchAddress(lat, lng);
      },
    });

    return location ? (
      <Marker position={[location.lat, location.lng]} icon={customIcon}>
        <Popup>{`Lat: ${location.lat.toFixed(6)}, Lng: ${location.lng.toFixed(
          6
        )}`}</Popup>
      </Marker>
    ) : null;
  }

  useEffect(() => {
    if (location && location.lat && location.lng) {
      fetchAddress(location.lat, location.lng);
    }
  }, [location]);

  return (
    <div className="h-full pb-20 bg-lightBg dark:bg-darkBg">
      <div className="px-6">
        <div className="flex gap-4 items-center mb-4">
          <button
            onClick={() => router.back()}
            className="mr-4 text-gray-600 hover:text-gray-800 flex items-center gap-2 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <ArrowLeftIcon height={15} />
            <span>Back</span>
            <hr />
          </button>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {task ? "Edit Task" : "Add Task"}
          </h2>
        </div>
        <div className="flex flex-col gap-4 md:flex-row h-full">
          <div className="md:w-1/2 p-6 bg-lightCard dark:bg-darkCard rounded-xl">
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-lightBg dark:bg-darkBg border text-sm rounded-md border-gray-300 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-lightBg dark:bg-darkBg border text-sm rounded-md border-gray-300 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 bg-lightBg dark:bg-darkBg border text-sm rounded-md border-gray-300 dark:border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border bg-lightBg dark:bg-darkBg text-sm rounded-md border-gray-300 dark:border-gray-600"
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              <textarea
                type="text"
                value={address}
                readOnly
                rows={4}
                // onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-gray-500 bg-lightBg dark:bg-darkBg text-sm p-2 border text-muted rounded-md outline-none border-gray-300 dark:border-gray-600 "
                required
              />
            </div>
            <button
              onClick={handleSave}
              className="p-3 mt-2 w-[150px] text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Save
            </button>
          </div>

          <div className="md:w-1/2 h-full rounded-lg shadow-md relative mt-10">
            <div className=" absolute top-[-50px] mb-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Selected Location: Lat {location.lat.toFixed(6)}, Lng{" "}
                {location.lng.toFixed(6)}
              </p>
            </div>
            <MapContainer
              center={[location.lat, location.lng]}
              style={{ width: "100%", height: "80vh", zIndex: 2 }}
              zoom={13}
              className="w-full h-full"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <LocationSelector />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
