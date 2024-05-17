import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import "../css/DoctorDashboard.css";
import axios from "axios";

//Amr's work
import { motion, AnimatePresence } from "framer-motion";
import Select from "react-select";
import "../css/Select.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IoOpenOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbEmergencyBed } from "react-icons/tb";

export function DoctorDashBoard() {
  // get doctor id
  const doctorId = localStorage.getItem("DoctorId");
  // console.log(doctorId);
  const name = localStorage.getItem("name");
  const specialize = localStorage.getItem("specialize");
  // ------------------
  // getcount bta3t aldoctor fy kol 7aga
  const [countOfEverythingTodoc, setcountOfEverythingTodoc] = useState({});
  async function showAllCountAboutDic() {
    try {
      let { data } = await axios.get(
        `https://mhiproject.onrender.com/doctor/countBooks/${doctorId}`
      );
      setcountOfEverythingTodoc(data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("لا يوجد حجوزات");
        setErrorClass("fs-1 text-center mt-5 mb-5");
        setClassForTable("d-none");
      }
    }
  }
  async function StatusOfPatient(bookingIds) {
    let newStatus = {
      bookingID: bookingIds,
      status: "Done",
    };

    try {
      let { data } = await axios.patch(
        "https://mhiproject.onrender.com/doctor/changeBookingStatus",
        newStatus
      );
      console.log(data);
      showAllCountAboutDic();
      getBooking();
    } catch (error) {
      console.error(error);
    }
  }
  async function setStatusOfPatientIfCancel(status) {
    let newStatus = {
      bookingID: status,
      status: "Cancelled",
    };

    try {
      let { data } = await axios.patch(
        "https://mhiproject.onrender.com/doctor/changeBookingStatus",
        newStatus
      );
      console.log(data);
      showAllCountAboutDic();
      getBooking();
    } catch (error) {
      console.error(error);
    }
  }
  // --------------------------
  // get booking
  const [isLoading, setIsLoading] = useState(true);
  const [getBookForDoct, setgetBookForDoct] = useState([]);
  console.log(getBookForDoct);
  const [error, setError] = useState("");
  const [errorClass, setErrorClass] = useState("d-none");
  const [ClassForTable, setClassForTable] = useState("table shadow");
  const [classOfFilterButton, setclassOfFilterButton] =
    useState("btn btn-success");
  async function getBooking() {
    try {
      let { data } = await axios.get(
        `https://mhiproject.onrender.com/doctor/showBooking/${doctorId}`
      );
      setgetBookForDoct(data.getbook);
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("لا يوجد حجوزات");
        setIsLoading(false);
        setErrorClass("fs-1 text-center mt-5 mb-5");
        setClassForTable("d-none");
        setclassOfFilterButton("d-none");
      }
    }
  }

  useEffect(() => {
    getBooking();
    showAllCountAboutDic();
  }, []);

  // filter and page count
  // two arrows
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = getBookForDoct.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (
      direction === "next" &&
      currentPage < Math.ceil(getBookForDoct.length / rowsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };
  // ------------------------------------
  const [showFilter, setShowFilter] = useState(false);
  const [idFilter, setIdFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [showResult, setShowResult] = useState("d-none");
  const [currentResult, setcurrentResult] = useState("");
  const toggleFilter = () => {
    setShowFilter(!showFilter);
    setShowResult("d-none");
    setcurrentResult("");
  };

  const handleIdFilter = (value) => {
    setIdFilter(value);
    setShowResult("");
    setcurrentResult("d-none");
  };

  const handleNameFilter = (value) => {
    setNameFilter(value);
    setShowResult("");
    setcurrentResult("d-none");
  };

  const filteredRows = getBookForDoct.filter((element) => {
    return (
      element.patientID.code.includes(idFilter) &&
      element.patientID.name.includes(nameFilter)
    );
  });

  // --------------------------------
  const hospitalId = localStorage.getItem("hospitalAdminHospitalID");
  const [patientRecord, setPatientRecord] = useState([]);
  const [isLoadingPatientRecord, setIsLoadingPatientRecord] = useState(false);

  const [currentRecordPage, setCurrentRecordPage] = useState(1);
  const [rowsPerRecordPage, setRowsPerRecordPage] = useState(3);
  const [filter, setFilter] = useState(false);

  const [doctorOptions, setDoctorOptions] = useState([]);
  const [doctorFilter, setDoctorFilter] = useState("");

  const [diagnoseOptions, setDiagnoseOptions] = useState([]);
  const [diagnoseFilter, setDiagnoseFilter] = useState("");

  const [medicineOptions, setMedicineOptions] = useState([]);
  const [medicineFilter, setMedicineFilter] = useState("");

  const [dateOptions, setDateOptions] = useState([]);
  const [dateFilter, setDateFilter] = useState("");

  const [specializes, setSpecializes] = useState([]);
  const [isFetchingSpecializes, setIsFetchingSpecializes] = useState(false);
  const specializeOptions = specializes.map((specialize) => ({
    label: specialize.name,
    value: specialize._id,
  }));
  const [selectedSpecialize, setSelectedSpecialize] = useState(null);

  const [createRecord, setCreateRecord] = useState({
    patientID: "",
    doctorID: "",
    medicine: "",
    diagnose: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [requestSurgery, setRequestSurgery] = useState({
    doctor: "",
    patient: "",
    hospitalID: hospitalId,
    specialize: "",
    description: "",
  });
  const [isRequestingSurgery, setIsRequestingSurgery] = useState(false);
  const [surgeries, setSurgeries] = useState([]);
  const [isFetchingSurgeries, setIsFetchingSurgeries] = useState(false);

  const handleFetchingPatientRecord = async (id) => {
    setIsLoadingPatientRecord(true);
    try {
      const response = await fetch(
        `https://mhiproject.onrender.com/doctor/getPatientRecord/${id}`
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "حدث خطأ أثناء التحميل");
        setIsLoadingPatientRecord(false);
        return;
      }
      setPatientRecord(resData.userR);

      const name = [
        ...new Set(resData.userR.map((doctor) => doctor.doctor.name)),
      ].map((doctor) => ({ label: doctor, value: doctor }));

      const diagnose = [
        ...new Set(resData.userR.map((diagnose) => diagnose.diagnose)),
      ].map((diagnose) => ({ label: diagnose, value: diagnose }));

      const medicine = [
        ...new Set(resData.userR.map((medicine) => medicine.medicine)),
      ].map((medicine) => ({ label: medicine, value: medicine }));

      const date = [
        ...new Set(resData.userR.map((date) => formateDate(date.date))),
      ].map((date) => ({ label: date, value: date }));

      setDoctorOptions(name);
      setDiagnoseOptions(diagnose);
      setMedicineOptions(medicine);
      setDateOptions(date);
      setIsLoadingPatientRecord(false);
    } catch (error) {
      toast.error("حدث خطأ");
      setIsLoadingPatientRecord(false);
    }
  };

  //Load Specializes
  useEffect(() => {
    async function loadSpecializes() {
      setIsFetchingSpecializes(true);

      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/hospitalAdmin/getSpecializes"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingSpecializes(false);
          return;
        }

        setSpecializes(resData);
        setIsFetchingSpecializes(false);
      } catch (error) {
        toast.error("Unexpected error during fetching specializes");
        setIsFetchingSpecializes(false);
        return;
      }
    }
    loadSpecializes();
  }, []);

  //Load Surgeries
  useEffect(() => {
    async function loadSurgeries() {
      setIsFetchingSurgeries(true);

      try {
        const response = await fetch(
          `https://mhiproject.onrender.com/doctor/getSurgeries/${doctorId}`
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingSurgeries(false);
          return;
        }

        setSurgeries(resData);
        setIsFetchingSurgeries(false);
      } catch (error) {
        toast.error("unexpected error during fetching surgeries");
        setIsFetchingSurgeries(false);
        return;
      }
    }
    loadSurgeries();
  }, []);

  console.log(surgeries);
  //Send patient id to the API
  const handleGetPatientId = (id) => {
    handleFetchingPatientRecord(id);
  };

  //Formate date
  const formateDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  //Filter patientRecord state for filtration
  const filteredData = patientRecord.filter(
    (patient) =>
      (!doctorFilter ||
        patient.doctor.name.toLowerCase() === doctorFilter.toLowerCase()) &&
      (!diagnoseFilter ||
        patient.diagnose.toLowerCase() === diagnoseFilter.toLowerCase()) &&
      (!medicineFilter ||
        patient.medicine.toLowerCase() === medicineFilter.toLowerCase()) &&
      (!dateFilter || formateDate(patient.date) === dateFilter)
  );

  //Total pages and Current Table Data calculation
  const totalPages = Math.ceil(filteredData.length / rowsPerRecordPage);
  const currentData = filteredData.slice(
    (currentRecordPage - 1) * rowsPerRecordPage,
    currentRecordPage * rowsPerRecordPage
  );

  //handle pagination
  const handleRowsPerPage = (event) => {
    setRowsPerRecordPage(event.target.value);
    setCurrentRecordPage(1);
  };

  const handleLastPagination = () => {
    setCurrentRecordPage(totalPages);
  };

  const handleFirstPagination = () => {
    setCurrentRecordPage(1);
  };

  //handle create medical record
  const handlePassingIds = (id) => {
    setCreateRecord((prev) => ({
      ...prev,
      doctorID: doctorId,
      patientID: id,
    }));
    toast.success("Doctor and Patient IDS are successfully added");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(createRecord);
  };

  //Create medical record api
  const handleCreateMedicalRecord = async () => {
    setIsCreating(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/doctor/createRecord",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(createRecord),
        }
      );
      const resData = response.json();

      if (!response.ok) {
        toast.error(resData.message || "Failed to Create");
        setIsCreating(false);
        return;
      }

      toast.success("Record Created Successfully");
      setCreateRecord({
        patientID: "",
        doctorID: "",
        medicine: "",
        diagnose: "",
      });
      setIsCreating(false);
    } catch (error) {
      toast.error("Unexpected error occurred");
      setIsCreating(false);
    }
  };

  //Request Surgery
  function handleRequestSurgeryIds(id) {
    setRequestSurgery((prev) => ({
      ...prev,
      doctor: doctorId,
      patient: id,
    }));
    toast.success("Ids are passed to the body");
  }

  function handleRequestSurgeryChange(event) {
    const { name, value } = event.target;
    setRequestSurgery((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleRequestSurgery = async (event) => {
    // event.preventDefault();
    setIsRequestingSurgery(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/doctor/requestSurgery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestSurgery),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsRequestingSurgery(false);
        return;
      }

      toast.success("Successfully requested");
      setRequestSurgery({
        doctor: "",
        patient: "",
        specialize: "",
        description: "",
      });
      setIsRequestingSurgery(false);
    } catch (error) {
      toast.error("unexpected error during requesting a surgery");
      setIsRequestingSurgery(false);
      return;
    }
  };

  //Pagination component
  const Pagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={rowsPerRecordPage}
            onChange={handleRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentRecordPage} of {totalPages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} />
          </button>
          <button
            disabled={currentRecordPage === 1}
            onClick={() => setCurrentRecordPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} />
          </button>
          <button
            disabled={currentRecordPage === totalPages}
            onClick={() => setCurrentRecordPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleLastPagination}
          >
            <MdKeyboardDoubleArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer />
      <Dashboard />
      {/* section show booking */}
      <section className="py-4">
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col-md-10 p-5 mb-5 ">
              <div className="d-flex gap-3 justify-content-evenly mb-4">
                <div className="widthForCard  shadow rounded-3 p-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <h1 className="fs-4">العمليات</h1>
                    <i className="fa-solid fa-stethoscope ms-4 me-1 text-muted"></i>
                  </div>
                  <div className="justify-content-center d-flex">
                    <h1 className="fs-5 text-muted mt-3">{surgeries.length}</h1>
                  </div>
                </div>
                <div className="widthForCard  shadow rounded-3 p-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <h1 className="fs-4">المواعيد الملغاه</h1>
                    <i className="text-danger fs-5 fa-solid fa-ban ms-3 me-1"></i>
                  </div>
                  <div className="justify-content-center d-flex">
                    <h1 className="fs-5 text-muted mt-3">
                      {countOfEverythingTodoc.cancelledCounter}
                    </h1>
                  </div>
                </div>
                <div className="widthForCard  shadow rounded-3 p-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <h1 className="fs-4"> المواعيد المقبولة</h1>
                    <i className="text-success fs-5 fa-regular fa-circle-check ms-2 "></i>
                  </div>
                  <div className="justify-content-center d-flex">
                    <h1 className="fs-5 text-muted mt-3">
                      {countOfEverythingTodoc.doneCounter}
                    </h1>
                  </div>
                </div>
                <div className="widthForCard  shadow rounded-3 p-3">
                  <div className="d-flex align-items-center justify-content-end">
                    <h1 className="fs-4"> المواعيد الجديدة</h1>
                    <i className="text-primary fs-5 fa-regular fa-square-plus ms-2 "></i>
                  </div>
                  <div className="justify-content-center d-flex">
                    <h1 className="fs-5 text-muted mt-3">
                      {countOfEverythingTodoc.waitingCounter}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2 text-end">
              <h1 className="fs-3 py-1 ">د/ {name}</h1>
              <p className="text-muted fs-5">{specialize}</p>
            </div>
            <div className="mt-3 col-md-10 text-center bg-muted rounded-4 p-5">
              <h1 className={errorClass}>{error}</h1>
              {isLoading == true ? (
                <h1 className="text-center fs-1 m-5">جارى التحميل</h1>
              ) : (
                ""
              )}
              <div className="d-flex justify-content-start mb-2">
                <button className={classOfFilterButton} onClick={toggleFilter}>
                  {" "}
                  Filter{" "}
                  {showFilter ? (
                    <i className="fa-solid fa-arrow-up "></i>
                  ) : (
                    <i className="fa-solid fa-arrow-down"></i>
                  )}
                </button>
              </div>
              {
                <div
                  className={`d-flex justify-content-evenly filter-content ${
                    showFilter ? "active" : ""
                  }`}
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control text-end"
                      placeholder="ادخل كود المريض"
                      id="idFilter"
                      onChange={(e) => handleIdFilter(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="ادخل الاسم"
                      className="form-control text-end"
                      id="nameFilter"
                      onChange={(e) => handleNameFilter(e.target.value)}
                    />
                  </div>
                </div>
              }

              <div className="table-responsive w-100">
                <table className={ClassForTable}>
                  <thead>
                    <tr className="table-success">
                      <th scope="col">تعليقات</th>
                      <th scope="col">التاريخ</th>
                      <th scope="col">الوقت</th>
                      <th scope="col">سجله الطبى</th>
                      <th scope="col"> كود المريض</th>
                      <th scope="col">اسم المريض</th>
                    </tr>
                  </thead>
                  <tbody className={showResult}>
                    {filteredRows.map((element, i) => (
                      <tr key={i}>
                        <td>
                          <button
                            onClick={() => {
                              setStatusOfPatientIfCancel(element._id);
                            }}
                            className="btn btn-danger me-2 widthForButton"
                          >
                            الغاء
                          </button>
                          <button
                            onClick={() => {
                              StatusOfPatient(element._id);
                            }}
                            className="btn btn-success widthForButton"
                          >
                            حضور
                          </button>
                        </td>
                        <td>
                          <p className="w-100">{element.day.slice(0, 10)}</p>
                        </td>

                        <td>
                          <p className="w-100">{element.time}</p>
                        </td>
                        {/* 7tt amr fy code alfilter */}
                        <td>
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handleGetPatientId(element.patientID._id)
                                  }
                                >
                                  <IoOpenOutline
                                    size={20}
                                    className="text-blue-800"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-5xl mx-auto p-4">
                                <DialogHeader>
                                  <DialogTitle>Patient Information</DialogTitle>
                                  <DialogDescription>
                                    You can easily create a new medical record
                                    for by pressing on The button "Create" Below
                                    the table
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col p-6 mb-12 bg-white rounded-lg shadow-xl w-full mx-auto">
                                  <div className="flex justify-between items-center">
                                    <button
                                      className="flex items-center gap-2 bg-emerald-600 text-white shadow-md px-8 py-2 rounded-md mb-2 hover:bg-blue-700 transition-all duration-300"
                                      onClick={() => {
                                        setFilter(!filter);
                                      }}
                                    >
                                      Filter
                                      <motion.span
                                        animate={{ rotate: filter ? -180 : 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <MdKeyboardArrowDown size={20} />
                                      </motion.span>
                                    </button>
                                  </div>

                                  <AnimatePresence>
                                    {filter && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        {filter && (
                                          <div className="flex justify-between items-center my-6 px-1">
                                            <Select
                                              options={dateOptions}
                                              onChange={(date) =>
                                                setDateFilter(
                                                  date ? date.value : ""
                                                )
                                              }
                                              value={dateOptions.find(
                                                (date) =>
                                                  date.value === dateFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Date..."
                                            />
                                            <Select
                                              options={medicineOptions}
                                              onChange={(medicine) =>
                                                setMedicineFilter(
                                                  medicine ? medicine.value : ""
                                                )
                                              }
                                              value={medicineOptions.find(
                                                (medicine) =>
                                                  medicine.value ===
                                                  medicineFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Medicine..."
                                            />

                                            <Select
                                              options={diagnoseOptions}
                                              onChange={(diagnose) =>
                                                setDiagnoseFilter(
                                                  diagnose ? diagnose.value : ""
                                                )
                                              }
                                              value={diagnoseOptions.find(
                                                (diagnose) =>
                                                  diagnose.value ===
                                                  diagnoseFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Diagnose..."
                                            />

                                            <Select
                                              options={doctorOptions}
                                              onChange={(name) =>
                                                setDoctorFilter(
                                                  name ? name.value : ""
                                                )
                                              }
                                              value={doctorOptions.find(
                                                (name) =>
                                                  name.value === doctorFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Doctor's Name..."
                                            />
                                          </div>
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="overflow-x-auto rounded-[5px]">
                                    <table className="min-w-full divide-y divide-gray-300">
                                      <thead className="bg-emerald-600">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            التاريخ
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            الدواء
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            التشخيص
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            أسم الدكتور
                                          </th>
                                        </tr>
                                      </thead>
                                      {isLoadingPatientRecord ? (
                                        <p>Loading...</p>
                                      ) : (
                                        <tbody className="bg-white divide-y divide-gray-300">
                                          {currentData.map((record, index) => (
                                            <tr
                                              key={index}
                                              className="hover:bg-gray-50"
                                            >
                                              <td className="px-6 py-4 text-center  whitespace-nowrap text-md text-gray-900">
                                                {formateDate(record.date)}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.medicine}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.diagnose}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.doctor.name}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      )}
                                    </table>
                                  </div>
                                  <Pagination />
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handlePassingIds(element.patientID._id)
                                  }
                                >
                                  <TfiWrite
                                    size={20}
                                    className="text-emerald-700"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[650px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Create New Medical Records
                                  </DialogTitle>
                                  <DialogDescription>
                                    You can easily create a new medical record
                                    by pressing on The button "Create" after
                                    filling the form.
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <form method="post">
                                    <h1 className="text-center text-[18px] mb-2">
                                      The following is a list of items you
                                      should not include in the medical entry
                                    </h1>
                                    <p className="text-left pl-4 mb-2">
                                      (Financial or health insurance
                                      information, Subjective opinions,
                                      Speculations, Blame of others or
                                      self-doubt, Legal information such as
                                      narratives provided to your professional
                                      liability carrier or correspondence with
                                      your defense attorney)
                                    </p>
                                    <div className="flex flex-col bg-white shadow-lg p-6">
                                      <div className="flex flex-col justify-start">
                                        <label
                                          htmlFor="diagnose"
                                          className="mb-2 text-[18px]"
                                        >
                                          Diagnose
                                        </label>
                                        <textarea
                                          id="diagnose"
                                          type="text"
                                          name="diagnose"
                                          placeholder="Write your diagnose..."
                                          value={createRecord.diagnose}
                                          onChange={handleChange}
                                          className="w-full pl-2 py-2 border rounde-lg"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-start mt-4">
                                        <label
                                          htmlFor="medicine"
                                          className="mb-2 text-[18px]"
                                        >
                                          Medicine
                                        </label>
                                        <textarea
                                          id="medicine"
                                          type="text"
                                          name="medicine"
                                          placeholder="Write the prescription medication..."
                                          value={createRecord.medicine}
                                          onChange={handleChange}
                                          className="w-full pl-2 py-2 border rounde-lg"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <DialogFooter>
                                  <Button
                                    className={`px-10 text-[18px] tracking-wider bg-emerald-700 hover:bg-blue-600 transition-all duration-300 ${
                                      isCreating
                                        ? "bg-blue-600"
                                        : "bg-emerald-700"
                                    }`}
                                    type="submit"
                                    disabled={isCreating}
                                    onClick={handleCreateMedicalRecord}
                                  >
                                    {isCreating ? "Creating..." : "Create"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handleRequestSurgeryIds(
                                      element.patientID._id
                                    )
                                  }
                                >
                                  <TbEmergencyBed
                                    size={20}
                                    className="text-red-500"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[650px]">
                                <DialogHeader>
                                  <DialogTitle>Request a Surgery</DialogTitle>
                                  <DialogDescription>
                                    You can easily request a surgery by pressing
                                    on The button "Create" after filling the
                                    form.
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <form method="post">
                                    <h1 className="text-center text-[18px] mb-2">
                                      The following is a list of items you
                                      should not include in the medical entry
                                    </h1>
                                    <p className="text-left pl-4 mb-2">
                                      (Financial or health insurance
                                      information, Subjective opinions,
                                      Speculations, Blame of others or
                                      self-doubt, Legal information such as
                                      narratives provided to your professional
                                      liability carrier or correspondence with
                                      your defense attorney)
                                    </p>
                                    <div className="flex flex-col bg-white shadow-lg p-6">
                                      <div className="flex flex-col justify-start items-end">
                                        <label
                                          htmlFor="diagnose"
                                          className="mb-2 text-[18px]"
                                        >
                                          العملية
                                        </label>
                                        <Select
                                          id="doctorSpecialization"
                                          isClearable
                                          placeholder="...التخصص"
                                          type="text"
                                          name="specialize"
                                          className="text-end w-full pl-2 py-2  rounde-lg"
                                          options={specializeOptions}
                                          value={selectedSpecialize}
                                          onChange={(option) => {
                                            setSelectedSpecialize(option);
                                            setRequestSurgery((prev) => ({
                                              ...prev,
                                              specialize: option
                                                ? option.value
                                                : "",
                                            }));
                                          }}
                                        />
                                        {/* <Select
                                          isClearable
                                          id="diagnose"
                                          type="text"
                                          name="diagnose"
                                          placeholder="Write your diagnose..."
                                          options={surgeries}
                                          onChange={(surgery) => {
                                            setRequestSurgery((prev) => ({
                                              ...prev,
                                              specialize: surgery
                                                ? surgery.value
                                                : "",
                                            }));
                                            console.log(requestSurgery);
                                          }}
                                          value={surgeries.find(
                                            (surgery) =>
                                              surgery.label ===
                                              requestSurgery.specialize
                                          )}
                                          className="w-full pl-2 py-2  rounde-lg"
                                        /> */}
                                      </div>
                                      <div className="flex flex-col justify-start items-end mt-4">
                                        <label
                                          htmlFor="description"
                                          className="mb-2 text-[18px]"
                                        >
                                          التفصيل
                                        </label>
                                        <textarea
                                          id="description"
                                          type="text"
                                          name="description"
                                          placeholder="...اذكر أسبابك لطلب إجراء عملية جراحية"
                                          value={requestSurgery.description}
                                          onChange={handleRequestSurgeryChange}
                                          className="w-full pl-2 py-2 border rounde-lg text-right pr-4"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <DialogFooter>
                                  <Button
                                    className={`px-10 text-[18px] tracking-wider bg-emerald-700 hover:bg-blue-600 transition-all duration-300 ${
                                      isRequestingSurgery
                                        ? "bg-blue-600"
                                        : "bg-emerald-700"
                                    }`}
                                    type="submit"
                                    disabled={isRequestingSurgery}
                                    onClick={handleRequestSurgery}
                                  >
                                    {isRequestingSurgery
                                      ? "Requesting..."
                                      : "Request"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                        {/* end of 7tt amr */}
                        <td>{element.patientID.code}</td>
                        <td>{element.patientID.name}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tbody className={currentResult}>
                    {currentRows.map((element, i) => (
                      <tr key={i}>
                        <td>
                          <button
                            onClick={() => {
                              setStatusOfPatientIfCancel(element._id);
                            }}
                            className="btn btn-danger me-2 widthForButton"
                          >
                            الغاء
                          </button>
                          <button
                            onClick={() => {
                              StatusOfPatient(element._id);
                            }}
                            className="btn btn-success widthForButton"
                          >
                            حضور
                          </button>
                        </td>
                        <td>
                          <p>{element.day.slice(0, 10)}</p>
                        </td>
                        <td>
                          <p>{element.time}</p>
                        </td>

                        {/* Medical Records - Amr */}
                        <td>
                          <div>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handleGetPatientId(element.patientID._id)
                                  }
                                >
                                  <IoOpenOutline
                                    size={20}
                                    className="text-blue-800"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-5xl mx-auto p-4">
                                <DialogHeader>
                                  <DialogTitle>Patient Information</DialogTitle>
                                  <DialogDescription>
                                    You can easily create a new medical record
                                    for by pressing on The button "Create" Below
                                    the table
                                  </DialogDescription>
                                </DialogHeader>

                                <div className="flex flex-col p-6 mb-12 bg-white rounded-lg shadow-xl w-full mx-auto">
                                  <div className="flex justify-between items-center">
                                    <button
                                      className="flex items-center gap-2 bg-emerald-600 text-white shadow-md px-8 py-2 rounded-md mb-2 hover:bg-blue-700 transition-all duration-300"
                                      onClick={() => {
                                        setFilter(!filter);
                                      }}
                                    >
                                      Filter
                                      <motion.span
                                        animate={{ rotate: filter ? -180 : 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        <MdKeyboardArrowDown size={20} />
                                      </motion.span>
                                    </button>
                                  </div>

                                  <AnimatePresence>
                                    {filter && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.4 }}
                                      >
                                        {filter && (
                                          <div className="flex justify-between items-center my-6 px-1">
                                            <Select
                                              options={dateOptions}
                                              onChange={(date) =>
                                                setDateFilter(
                                                  date ? date.value : ""
                                                )
                                              }
                                              value={dateOptions.find(
                                                (date) =>
                                                  date.value === dateFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Date..."
                                            />
                                            <Select
                                              options={medicineOptions}
                                              onChange={(medicine) =>
                                                setMedicineFilter(
                                                  medicine ? medicine.value : ""
                                                )
                                              }
                                              value={medicineOptions.find(
                                                (medicine) =>
                                                  medicine.value ===
                                                  medicineFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Medicine..."
                                            />

                                            <Select
                                              options={diagnoseOptions}
                                              onChange={(diagnose) =>
                                                setDiagnoseFilter(
                                                  diagnose ? diagnose.value : ""
                                                )
                                              }
                                              value={diagnoseOptions.find(
                                                (diagnose) =>
                                                  diagnose.value ===
                                                  diagnoseFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Diagnose..."
                                            />

                                            <Select
                                              options={doctorOptions}
                                              onChange={(name) =>
                                                setDoctorFilter(
                                                  name ? name.value : ""
                                                )
                                              }
                                              value={doctorOptions.find(
                                                (name) =>
                                                  name.value === doctorFilter
                                              )}
                                              isClearable
                                              className="custom-select"
                                              classNamePrefix="react-select"
                                              placeholder="Doctor's Name..."
                                            />
                                          </div>
                                        )}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>

                                  <div className="overflow-x-auto rounded-[5px]">
                                    <table className="min-w-full divide-y divide-gray-300">
                                      <thead className="bg-emerald-600">
                                        <tr>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            التاريخ
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            الدواء
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            التشخيص
                                          </th>
                                          <th
                                            scope="col"
                                            className="px-6 py-3 text-center text-lg font-semibold text-white tracking-wider"
                                          >
                                            أسم الدكتور
                                          </th>
                                        </tr>
                                      </thead>
                                      {isLoadingPatientRecord ? (
                                        <p>Loading...</p>
                                      ) : (
                                        <tbody className="bg-white divide-y divide-gray-300">
                                          {currentData.map((record, index) => (
                                            <tr
                                              key={index}
                                              className="hover:bg-gray-50"
                                            >
                                              <td className="px-6 py-4 text-center  whitespace-nowrap text-md text-gray-900">
                                                {formateDate(record.date)}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.medicine}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.diagnose}
                                              </td>
                                              <td className="px-6 py-4 text-center whitespace-nowrap text-md text-gray-900">
                                                {record.doctor.name}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      )}
                                    </table>
                                  </div>
                                  <Pagination />
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handlePassingIds(element.patientID._id)
                                  }
                                >
                                  <TfiWrite
                                    size={20}
                                    className="text-emerald-700"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[650px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    Create New Medical Records
                                  </DialogTitle>
                                  <DialogDescription>
                                    You can easily create a new medical record
                                    by pressing on The button "Create" after
                                    filling the form.
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <form method="post">
                                    <h1 className="text-center text-[18px] mb-2">
                                      The following is a list of items you
                                      should not include in the medical entry
                                    </h1>
                                    <p className="text-left pl-4 mb-2">
                                      (Financial or health insurance
                                      information, Subjective opinions,
                                      Speculations, Blame of others or
                                      self-doubt, Legal information such as
                                      narratives provided to your professional
                                      liability carrier or correspondence with
                                      your defense attorney)
                                    </p>
                                    <div className="flex flex-col bg-white shadow-lg p-6">
                                      <div className="flex flex-col justify-start">
                                        <label
                                          htmlFor="diagnose"
                                          className="mb-2 text-[18px]"
                                        >
                                          Diagnose
                                        </label>
                                        <textarea
                                          id="diagnose"
                                          type="text"
                                          name="diagnose"
                                          placeholder="Write your diagnose..."
                                          value={createRecord.diagnose}
                                          onChange={handleChange}
                                          className="w-full pl-2 py-2 border rounde-lg"
                                        />
                                      </div>
                                      <div className="flex flex-col justify-start mt-4">
                                        <label
                                          htmlFor="medicine"
                                          className="mb-2 text-[18px]"
                                        >
                                          Medicine
                                        </label>
                                        <textarea
                                          id="medicine"
                                          type="text"
                                          name="medicine"
                                          placeholder="Write the prescription medication..."
                                          value={createRecord.medicine}
                                          onChange={handleChange}
                                          className="w-full pl-2 py-2 border rounde-lg"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <DialogFooter>
                                  <Button
                                    className={`px-10 text-[18px] tracking-wider bg-emerald-700 hover:bg-blue-600 transition-all duration-300 ${
                                      isCreating
                                        ? "bg-blue-600"
                                        : "bg-emerald-700"
                                    }`}
                                    type="submit"
                                    disabled={isCreating}
                                    onClick={handleCreateMedicalRecord}
                                  >
                                    {isCreating ? "Creating..." : "Create"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline-none"
                                  onClick={() =>
                                    handleRequestSurgeryIds(
                                      element.patientID._id
                                    )
                                  }
                                >
                                  <TbEmergencyBed
                                    size={20}
                                    className="text-red-500"
                                  />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[650px]">
                                <DialogHeader>
                                  <DialogTitle>Request a Surgery</DialogTitle>
                                  <DialogDescription>
                                    You can easily request a surgery by pressing
                                    on The button "Create" after filling the
                                    form.
                                  </DialogDescription>
                                </DialogHeader>
                                <div>
                                  <form method="post">
                                    <h1 className="text-center text-[18px] mb-2">
                                      The following is a list of items you
                                      should not include in the medical entry
                                    </h1>
                                    <p className="text-left pl-4 mb-2">
                                      (Financial or health insurance
                                      information, Subjective opinions,
                                      Speculations, Blame of others or
                                      self-doubt, Legal information such as
                                      narratives provided to your professional
                                      liability carrier or correspondence with
                                      your defense attorney)
                                    </p>
                                    <div className="flex flex-col bg-white shadow-lg p-6">
                                      <div className="flex flex-col justify-start items-end">
                                        <label
                                          htmlFor="diagnose"
                                          className="mb-2 text-[18px]"
                                        >
                                          العملية
                                        </label>
                                        <Select
                                          id="doctorSpecialization"
                                          isClearable
                                          placeholder="...التخصص"
                                          type="text"
                                          name="specialize"
                                          className="text-end w-full pl-2 py-2  rounde-lg"
                                          options={specializeOptions}
                                          value={selectedSpecialize}
                                          onChange={(option) => {
                                            setSelectedSpecialize(option);
                                            setRequestSurgery((prev) => ({
                                              ...prev,
                                              specialize: option
                                                ? option.value
                                                : "",
                                            }));
                                          }}
                                        />
                                        {/* <Select
                                          isClearable
                                          id="diagnose"
                                          type="text"
                                          name="diagnose"
                                          placeholder="Write your diagnose..."
                                          options={surgeries}
                                          onChange={(surgery) => {
                                            setRequestSurgery((prev) => ({
                                              ...prev,
                                              specialize: surgery
                                                ? surgery.value
                                                : "",
                                            }));
                                            console.log(requestSurgery);
                                          }}
                                          value={surgeries.find(
                                            (surgery) =>
                                              surgery.label ===
                                              requestSurgery.specialize
                                          )}
                                          className="w-full pl-2 py-2  rounde-lg"
                                        /> */}
                                      </div>
                                      <div className="flex flex-col justify-start items-end mt-4">
                                        <label
                                          htmlFor="description"
                                          className="mb-2 text-[18px]"
                                        >
                                          التفصيل
                                        </label>
                                        <textarea
                                          id="description"
                                          type="text"
                                          name="description"
                                          placeholder="...اذكر أسبابك لطلب إجراء عملية جراحية"
                                          value={requestSurgery.description}
                                          onChange={handleRequestSurgeryChange}
                                          className="w-full pl-2 py-2 border rounde-lg text-right pr-4"
                                        />
                                      </div>
                                    </div>
                                  </form>
                                </div>
                                <DialogFooter>
                                  <Button
                                    className={`px-10 text-[18px] tracking-wider bg-emerald-700 hover:bg-blue-600 transition-all duration-300 ${
                                      isRequestingSurgery
                                        ? "bg-blue-600"
                                        : "bg-emerald-700"
                                    }`}
                                    type="submit"
                                    disabled={isRequestingSurgery}
                                    onClick={handleRequestSurgery}
                                  >
                                    {isRequestingSurgery
                                      ? "Requesting..."
                                      : "Request"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                        {/* End */}

                        <td>{element.patientID.code}</td>
                        <td>{element.patientID.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* two arrows to go between pages */}
              <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate("prev")}
                      >
                        &laquo;
                      </button>
                    </li>
                    <li className="page-item disabled">
                      <span className="page-link">{currentPage}</span>
                    </li>
                    <li
                      className={`page-item ${
                        currentPage ===
                        Math.ceil(getBookForDoct.length / rowsPerPage)
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate("next")}
                      >
                        &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
