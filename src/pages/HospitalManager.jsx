import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BsPersonVcard } from "react-icons/bs";
import { BsHospital } from "react-icons/bs";

function HospitalManager() {
  const name = localStorage.getItem("name");
  const hospitalName = localStorage.getItem("hospitalNameFromHospitaldDetails");
  const hospitalId = localStorage.getItem("hospitalAdminHospitalID");
  console.log(hospitalId);

  const [requestedSurgeries, setRequestSurgeries] = useState([]);
  const [isFetchingRequestedSurgeries, setIsFetchingRequestedSurgeries] =
    useState(false);
  const [scheduleSurgery, setScheduleSurgery] = useState({
    patientID: "",
    doctorID: "",
    day: "",
    time: "",
  });
  const [isSchedulingSurgery, setIsSchedulingSurgery] = useState(false);

  useEffect(() => {
    async function loadRequestedSurgeries() {
      setIsFetchingRequestedSurgeries(true);
      try {
        const response = await fetch(
          `https://mhiproject.onrender.com/hospitalManager/getRequests/${hospitalId}`
        );
        const resData = await response.json();
        console.log(resData);

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingRequestedSurgeries(false);
          return;
        }

        setRequestSurgeries(resData);
        setIsFetchingRequestedSurgeries(false);
      } catch (error) {
        toast.error("unexpected error during fetching requested surgeries");
        setIsFetchingRequestedSurgeries(false);
        return;
      }
    }
    loadRequestedSurgeries();
  }, []);

  function handleScheduleChange(event) {
    const { name, value } = event.target;
    setScheduleSurgery((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  console.log(requestedSurgeries);

  return (
    <>
      <Dashboard />
      <section className="mt-8 mr-6">
        <div className="flex justify-end">
          <div className=" bg-gray-50 border rounded-lg shadow-md p-4">
            <div className="flex justify-end items-center gap-2 mb-2">
              <h1 className="text-right text-2xl">
                <span>{name}</span> /المدير
              </h1>
              <BsPersonVcard size={25} className="text-emerald-700" />
            </div>
            <div className="flex justify-end items-center gap-2">
              <h1 className="text-right text-2xl">{hospitalName}</h1>
              <BsHospital size={25} className="text-emerald-700" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HospitalManager;
