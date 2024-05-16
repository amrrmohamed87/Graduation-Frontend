import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";

import { BsPersonVcard } from "react-icons/bs";
import { BsHospital } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { SlUserFollowing } from "react-icons/sl";
import { BsFillPeopleFill } from "react-icons/bs";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { FaUserDoctor } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdMedicalInformation } from "react-icons/md";
import { RxCalendar } from "react-icons/rx";

function HospitalManager() {
  const name = localStorage.getItem("name");
  const hospitalName = localStorage.getItem("hospitalNameFromHospitaldDetails");
  const hospitalId = localStorage.getItem("hospitalAdminHospitalID");
  const location = localStorage.getItem("hospitalLocation");
  console.log(hospitalId);

  const [requestedSurgeries, setRequestSurgeries] = useState([]);
  const [isFetchingRequestedSurgeries, setIsFetchingRequestedSurgeries] =
    useState(false);
  const [doctorsList, setDoctorsList] = useState([]);
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(false);
  const [doctorQuery, setDoctorQuery] = useState("");
  const [currentDoctorPage, setCurrentDoctorPage] = useState(1);
  const [doctorRowsPerPage, setDoctorRowsPerPage] = useState(5);
  const [requestSpecificDoctors, setRequestSpecificDoctors] = useState({
    hospitalID: hospitalId,
    specialize: "",
  });
  const [specializedDoctors, setSpecializedDoctors] = useState([]);
  const [isFetchingSpecificDoctors, setIsFetchingSpecificDoctors] =
    useState(false);
  console.log(requestSpecificDoctors);
  const [surgeryData, setSurgeryData] = useState({
    patientID: "",
    doctorID: "",
    day: "",
    time: "",
  });
  const [isScheduling, setIsSechudling] = useState(false);
  console.log(surgeryData);
  const [date, setDate] = useState(new Date());
  const selectedDoctorForSurgery = specializedDoctors.map((doctor) => ({
    label: doctor.name,
    value: doctor._id,
  }));
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    setSurgeryData((prev) => ({
      ...prev,
      day: date.toISOString().slice(0, 10), // Formats date as 'YYYY-MM-DD'
    }));
  }, [date]);
  //fetch surgeries
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

  //fetch doctors
  useEffect(() => {
    async function loadDoctors() {
      setIsFetchingDoctors(true);

      try {
        const response = await fetch(
          `https://mhiproject.onrender.com/hospitalAdmin/getDoctors/${hospitalId}`
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingDoctors(false);
          return;
        }

        setDoctorsList(resData);
        setIsFetchingDoctors(false);
      } catch (error) {
        toast.error("unexpected error during fetching doctors");
        setIsFetchingDoctors(false);
        return;
      }
    }
    loadDoctors();
  }, []);
  console.log(doctorsList);
  console.log(requestedSurgeries);
  console.log(specializedDoctors);

  //return specific doctors based on the specialize
  const handleGetSpecificDoctors = async (event) => {
    event.preventDefault();
    setIsFetchingSpecificDoctors(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalManager/getDoctors",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestSpecificDoctors),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsFetchingSpecificDoctors(false);
        return;
      }

      setSpecializedDoctors(resData);
      setIsFetchingSpecificDoctors(false);
    } catch (error) {
      toast.error("unexpected error during fetching specialized doctors");
      setIsFetchingSpecificDoctors(false);
      return;
    }
  };

  //Schedule surgery
  const handleSchedulingSurgery = async (event) => {
    setIsSechudling(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalManager/appointSurgery",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surgeryData),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.error);
        setIsSechudling(false);
        return;
      }

      toast.success("Scheduled Successfully");
      setSurgeryData({
        doctorID: "",
        patientID: "",
        day: "",
        time: "",
      });
      setRequestSpecificDoctors({
        hospitalID: hospitalId,
        specialize: "",
      });
      setIsSechudling(false);
    } catch (error) {
      toast.error("unexpected error during scheduling");
      setIsSechudling(false);
      return;
    }
  };

  //Date formate
  const formateDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  //Filter Doctor's List && Handle Pagination functions
  const filteredDoctors = doctorsList.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(doctorQuery.toLowerCase()) ||
      doctor.code.toLowerCase().includes(doctorQuery.toLowerCase())
  );
  const totalDoctorTablePages = Math.ceil(
    filteredDoctors.length / doctorRowsPerPage
  );
  const currentDoctorData = filteredDoctors.slice(
    (currentDoctorPage - 1) * doctorRowsPerPage,
    currentDoctorPage * doctorRowsPerPage
  );

  function handleDoctorRowsPerPage(event) {
    setDoctorRowsPerPage(event.target.value);
    setCurrentDoctorPage(1);
  }

  function handleDoctorSearch(event) {
    setDoctorQuery(event.target.value);
    setCurrentDoctorPage(1);
  }

  const handleLastDoctorPagination = () => {
    setCurrentDoctorPage(totalDoctorTablePages);
  };

  const handleFirstDoctorPagination = () => {
    setCurrentDoctorPage(1);
  };

  //Pagination Components
  const DoctorPagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={doctorRowsPerPage}
            onChange={handleDoctorRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentDoctorPage} of {totalDoctorTablePages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstDoctorPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentDoctorPage === 1}
            onClick={() => setCurrentDoctorPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentDoctorPage === totalDoctorTablePages}
            onClick={() => setCurrentDoctorPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} className="text-emerald-700" />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleLastDoctorPagination}
          >
            <MdKeyboardDoubleArrowRight
              size={20}
              className="text-emerald-700"
            />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <Dashboard />
      <section className="mt-8 mr-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="bg-gray-100 border shadow-sm rounded-lg w-80 p-6">
            <div className="flex justify-end gap-2">
              <div className="flex flex-col">
                <h1 className="mt-3 text-[18px]">العمليات الجراحية الجديدة</h1>
                <p className="text-end text-[22px] font-bold">
                  {requestedSurgeries.length}
                </p>
              </div>
              <HiOutlineClipboardDocumentList
                size={50}
                className="text-blue-600 bg-white rounded-full p-2"
              />
            </div>
          </div>

          <div className="bg-gray-100 border shadow-sm rounded-lg p-6 w-80">
            <div className="flex justify-end gap-2">
              <div className="flex flex-col">
                <h1 className="mt-3 text-[18px]">الأطباء</h1>
                <p className="text-end text-[22px] font-bold">
                  {doctorsList.length}
                </p>
              </div>
              <BsFillPeopleFill
                size={50}
                className="text-blue-600 bg-white rounded-full p-2"
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 w-full md:w-[600px] bg-gray-50 border rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-[0.35rem]">
              <h1 className="text-right text-[20px]">{location}</h1>
              <ImLocation size={20} className="text-red-600" />
            </div>

            <div className="flex items-center gap-[0.35rem]">
              <h1 className="text-right text-[20px]">{hospitalName}</h1>
              <BsHospital size={20} className="text-emerald-600" />
            </div>

            <div className="flex items-center gap-[0.35rem]">
              <h1 className="text-right text-[20px]">{name}</h1>
              <SlUserFollowing size={20} className="text-blue-600" />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="overflow-x-auto p-4 ml-0 md:ml-16 w-full lg:w-[35%] xl:w-[40%]">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-3 border">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    placeholder="...الطبيب / الكود"
                    onChange={handleDoctorSearch}
                    value={doctorQuery}
                    className="w-[220px] border rounded-md h-9 text-right p-2"
                  />
                  <div className="flex items-start gap-1">
                    <h1 className="text-right text-[20px]">قائمة الأطباء</h1>
                    <FaUserDoctor size={20} className="text-emerald-500" />
                  </div>
                </div>

                <table className="w-full">
                  <thead className="bg-emerald-600 border">
                    <tr>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right w-4"
                      >
                        التخصص
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        الكود
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        الأسم
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentDoctorData.map((doctor, index) => (
                      <tr key={index} className="border text-right">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                          {/* <Dialog>
                            <DialogTrigger asChild>
                              <button>
                                <MdMedicalInformation
                                  size={20}
                                  className="text-emerald-600"
                                />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>بيانات الدكتور</DialogTitle>
                                <DialogDescription>
                                  Make changes to your profile here. Click save
                                  when you're done.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">hi</div>
                            </DialogContent>
                          </Dialog> */}
                          {doctor.specialize.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {doctor.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {doctor.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {doctorsList.length <= 0 && (
                  <p className="text-center">You have zero Admins</p>
                )}
                <DoctorPagination />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4 w-full lg:w-[70%]">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
                {/* <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    placeholder="...المدير / الكود"
                    onChange={handleDirectorSearch}
                    value={directorQuery}
                    className="w-[220px] border rounded-md h-9 text-right p-2"
                  />
                  <div className="flex items-start gap-1">
                    <h1 className="text-right text-[20px]">قائمة المديرين</h1>
                    <GrUserManager size={20} className="text-emerald-500" />
                  </div>
                </div> */}

                <table className="w-full">
                  <thead className="bg-emerald-600 border">
                    <tr>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        حجز
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right w-4"
                      >
                        البيانات
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        التاريخ
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        المريض
                      </th>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right"
                      >
                        الدكتور
                      </th>
                    </tr>
                  </thead>

                  {requestedSurgeries.length <= 0 ? (
                    <h1 className="text-center">You have zero surgeries</h1>
                  ) : (
                    <tbody>
                      {isFetchingRequestedSurgeries ? (
                        <h1 className="text-r text-2xl">...جار التحميل</h1>
                      ) : (
                        requestedSurgeries.map((request, index) => (
                          <tr key={index} className="border text-right">
                            <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <form
                                    method="post"
                                    onSubmit={handleGetSpecificDoctors}
                                  >
                                    <button
                                      onClick={() => {
                                        setRequestSpecificDoctors((prev) => ({
                                          ...prev,
                                          specialize: request.specialize,
                                        }));
                                        setSurgeryData((prev) => ({
                                          ...prev,
                                          patientID: request.patient._id,
                                        }));
                                      }}
                                    >
                                      <RxCalendar
                                        size={20}
                                        className="text-emerald-500 hover:text-emerald-700 transition-all duration-300 cursor-pointer"
                                      />
                                    </button>
                                  </form>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="w-[320px] md:w-[600px]">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      جدولة عملية جراحية
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      يجب الحفاظ على سرية جميع معلومات المريض
                                      واستخدامها فقط لأغراض الجدولة. لا تشارك
                                      تفاصيل المريض مع أفراد غير مصرح لهم بذلك
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <form>
                                    <div className="flex flex-col md:flex-row items-center gap-4">
                                      <div>
                                        <Calendar
                                          mode="single"
                                          name="date"
                                          selected={date}
                                          onSelect={setDate}
                                          className="rounded-md border shadow w-full"
                                        />
                                      </div>
                                      <div className="flex flex-col gap-2 w-full">
                                        <Select
                                          isClearable
                                          placeholder="...الدكتور"
                                          type="text"
                                          name="doctorID"
                                          className="text-end w-full mb-4"
                                          options={selectedDoctorForSurgery}
                                          value={selectedDoctor}
                                          onChange={(option) => {
                                            setSelectedDoctor(option);
                                            setSurgeryData((prev) => ({
                                              ...prev,
                                              doctorID: option
                                                ? option.value
                                                : "",
                                            }));
                                          }}
                                        />
                                        <input
                                          type="time"
                                          name="time"
                                          value={surgeryData.time}
                                          onChange={(event) => {
                                            setSurgeryData((prev) => ({
                                              ...prev,
                                              time: event.target.value,
                                            }));
                                          }}
                                          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 bg-white"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                  <AlertDialogFooter className="flex items-center gap-3">
                                    <AlertDialogCancel
                                      className="w-[150px] bg-red-600 text-white mb-2 text-[18px] font-bold hover:bg-red-900 transition-all duration-300"
                                      onClick={() => {
                                        setRequestSpecificDoctors({
                                          hospitalID: hospitalId,
                                          specialize: "",
                                        });
                                        setSurgeryData({
                                          patientID: "",
                                          doctorID: "",
                                          day: "",
                                          time: "",
                                        });
                                      }}
                                    >
                                      إلغاء
                                    </AlertDialogCancel>

                                    <form
                                      method="patch"
                                      onClick={handleSchedulingSurgery}
                                    >
                                      <AlertDialogAction className="w-[150px] bg-blue-600 text-[18px] rounded-lg px-3 py-2 cursor-pointer hover:bg-blue-900 transition-all duration-300">
                                        <button disabled={isScheduling}>
                                          {isScheduling
                                            ? "...جاري الحجز"
                                            : "تأكيد"}
                                        </button>
                                      </AlertDialogAction>
                                    </form>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <p>
                                    <HiOutlineClipboardDocumentList
                                      size={22}
                                      className="text-blue-600 ml-4"
                                    />
                                  </p>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>وثائق الجراحة</DialogTitle>
                                    <DialogDescription>
                                      توثيق كامل وأسباب طلب الجراحة
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-1 items-center gap-4 text-end">
                                      <h1>
                                        {request.patient.name}{" "}
                                        <span>:أسم المريض</span>
                                      </h1>
                                      <h1>
                                        {request.doctor.name}{" "}
                                        <span>:أسم الدكتور</span>
                                      </h1>
                                      <h1>
                                        {formateDate(request.date)}
                                        <span> :التاريخ</span>
                                      </h1>
                                      <h1>
                                        <span> التخصص:</span>{" "}
                                        {request.specialize}
                                      </h1>
                                      <h1>
                                        {request.description}{" "}
                                        <span>:الأسباب</span>
                                      </h1>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                              {formateDate(request.date)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                              {request.patient.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                              {request.doctor.name}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HospitalManager;
