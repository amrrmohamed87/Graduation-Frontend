import { useState, useEffect, useRef } from "react";
import Dashboard from "@/components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import Input from "@/components/AdminInput";
import Select from "react-select";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { GrUserManager } from "react-icons/gr";

const HospitalAdmin = () => {
  const hospitalId = localStorage.getItem("hospitalAdminHospitalID");
  const imageInputRef = useRef(null);

  //Signup States
  const [addClinicDirector, setAddClinicDirector] = useState({
    name: "",
    username: "",
    password: "",
    hospitalID: hospitalId,
  });
  const [isAddingDirector, setIsAddingDirector] = useState(false);
  const [doctor, setDoctor] = useState({
    name: "",
    username: "",
    password: "",
    specialize: "",
    hospitalID: hospitalId,
    image: "",
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [hospitalManager, setHospitalManager] = useState({
    name: "",
    username: "",
    password: "",
    hospitalID: hospitalId,
  });
  const [isAddingHospitalManager, setIsAddingHospitalManager] = useState(false);

  //Delete States
  const [doctorId, setDoctorId] = useState({
    doctorID: "",
  });
  const [isDeletingDoctor, setIsDeletingDoctor] = useState(false);
  const [directorId, setDirectorId] = useState({
    directorID: "",
  });
  const [isDeletingDirector, setIsDeletingDirector] = useState(false);

  //Fetch States
  const [doctorslist, setDoctorsList] = useState([]);
  const [isFetchingDoctors, setIsFetchingDoctors] = useState(false);
  const [directorsList, setDirectorList] = useState([]);
  const [isFetchingDirectors, setIsFetchingDirectors] = useState(false);
  const [specializes, setSpecializes] = useState([]);
  const [isFetchingSpecializes, setIsFetchingSpecializes] = useState(false);
  const specializeOptions = specializes.map((specialize) => ({
    label: specialize.name,
    value: specialize._id,
  }));
  const [selectedSpecialize, setSelectedSpecialize] = useState(null);
  console.log(directorsList);

  //doctor filter search state
  const [doctorQuery, setDoctorQuery] = useState("");
  const [currentDoctorPage, setCurrentDoctorPage] = useState(1);
  const [doctorRowsPerPage, setDoctorRowsPerPage] = useState(5);

  //director filter search state
  const [directorQuery, setDirectorQuery] = useState("");
  const [currentDirectorPage, setCurrentDirectorPage] = useState(1);
  const [directorRowsPerPage, setDirectorRowsPerPage] = useState(5);

  //Sign up clinic director
  function handleDirectorChange(event) {
    const { name, value } = event.target;
    setAddClinicDirector((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAddDirector = async (event) => {
    event.preventDefault();
    setIsAddingDirector(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalAdmin/signupClinicsDirector",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(addClinicDirector),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsAddingDirector(false);
        return;
      }

      toast.success("Done");
      setAddClinicDirector({
        name: "",
        username: "",
        password: "",
        hospitalID: hospitalId,
      });
      setIsAddingDirector(false);
    } catch (error) {
      toast.error("الرجاء إدخال البيانات أولا");
      setIsAddingDirector(false);
      return;
    }
  };

  //Delete Director
  const handleDeleteDireector = async () => {
    setIsDeletingDirector(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalAdmin/deleteClinincsDirector",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(directorId),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsDeletingDirector(false);
        return;
      }

      toast.success("تم مسح المدير بنجاح");
      setDirectorId({
        directorID: "",
      });
      setIsDeletingDirector(false);
    } catch (error) {
      toast.error("unexpected error during deleting director");
      setIsDeletingDirector(false);
      return;
    }
  };

  //Sign up doctor
  function handleDoctorChange(event) {
    const { name, value } = event.target;
    setDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleImageOnChange(event) {
    const file = event.target.files[0];
    setDoctor((prev) => ({
      ...prev,
      image: file,
    }));
  }

  const handleAddDoctor = async (event) => {
    event.preventDefault();
    setIsAddingDoctor(true);
    const formData = new FormData();
    formData.append("name", doctor.name);
    formData.append("username", doctor.username);
    formData.append("password", doctor.password);
    formData.append("specialize", doctor.specialize);
    formData.append("hospitalID", doctor.hospitalID);

    if (doctor.image) {
      formData.append("image", doctor.image);
    }

    try {
      const response = await fetch(
        "https://mhi-production.up.railway.app/hospitalAdmin/signupDoctor",
        {
          method: "POST",
          body: formData,
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsAddingDoctor(false);
        return;
      }

      toast.success("تم إضافة طبيب بنجاح");
      setDoctor({
        name: "",
        username: "",
        password: "",
        specialize: "",
        hospitalID: hospitalId,
        image: "",
      });
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setSelectedSpecialize(null);
      setIsAddingDoctor(false);
    } catch (error) {
      toast.error("الرجاء إدخال البيانات أولا");
      setIsAddingDoctor(false);
      return;
    }
  };

  //Delete Doctor
  const handleDeleteDoctor = async () => {
    setIsDeletingDoctor(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalAdmin/deleteDoctor",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctorId),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsDeletingDoctor(false);
        return;
      }

      toast.success("تم مسح الدكتور بنجاح");
      setDoctorId({
        doctorID: "",
      });
      setIsDeletingDoctor(false);
    } catch (error) {
      toast.error("Unexpected error during deleting the doctor");
      setIsDeletingDoctor(false);
      return;
    }
  };

  //Sign up hospital manager
  function handleHospitalManagerChange(event) {
    const { name, value } = event.target;
    setHospitalManager((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAddHospitalManager = async (event) => {
    event.preventDefault();
    setIsAddingHospitalManager(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalAdmin/signupHospitalManager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalManager),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsAddingHospitalManager(false);
        return;
      }

      toast.success("تم إضافة المدير بنجاح");
      setHospitalManager({
        name: "",
        username: "",
        password: "",
        hospitalID: hospitalId,
      });
      setIsAddingHospitalManager(false);
    } catch (error) {
      toast.error("الرجاء إدخال البيانات أولا");
      setIsAddingHospitalManager(false);
      return;
    }
  };

  //Fetch Doctors List
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
        console.log(resData);
      } catch (error) {
        toast.error("unexpected doctor list error");
        setIsFetchingDoctors(false);
        return;
      }
    }
    loadDoctors();
  }, [isAddingDoctor, isDeletingDoctor]);

  //Fetch Directors List
  useEffect(() => {
    async function loadDirectors() {
      setIsFetchingDirectors(true);
      try {
        const response = await fetch(
          `https://mhiproject.onrender.com/hospitalAdmin/getClinicsDirectors/${hospitalId}`
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingDirectors(false);
          return;
        }

        setDirectorList(resData);
        setIsFetchingDirectors(false);
      } catch (error) {
        toast.error("Unexpected error during fetching directors");
        setIsFetchingDirectors(false);
        return;
      }
    }
    loadDirectors();
  }, [isAddingDirector, isDeletingDirector]);

  //Fetch Specializes
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
  console.log(specializes);

  //Filter Doctor's List && Handle Pagination functions
  const filteredDoctors = doctorslist.filter(
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

  //Filter Director's list && Handle Pagination functions + Pagination Component
  const filterDirectors = directorsList.filter(
    (director) =>
      director.name.toLowerCase().includes(directorQuery.toLowerCase()) ||
      director.code.toLowerCase().includes(directorQuery.toLowerCase())
  );
  const totalDirectorTablePages = Math.ceil(
    filterDirectors.length / directorRowsPerPage
  );
  const currenDirectorData = filterDirectors.slice(
    (currentDirectorPage - 1) * directorRowsPerPage,
    currentDirectorPage * directorRowsPerPage
  );

  function handleDirectorRowsPerPage(event) {
    setDirectorRowsPerPage(event.target.value);
    setCurrentDoctorPage(1);
  }

  function handleDirectorSearch(event) {
    setDirectorQuery(event.target.value);
    setCurrentDirectorPage(1);
  }

  const handleLastDirectorPagination = () => {
    setCurrentDirectorPage(totalDirectorTablePages);
  };

  const handleFirstDirectorPagination = () => {
    setCurrentDirectorPage(1);
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

  const DirectorPagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={directorRowsPerPage}
            onChange={handleDirectorRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentDirectorPage} of {totalDirectorTablePages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstDirectorPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentDirectorPage === 1}
            onClick={() => setCurrentDirectorPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentDirectorPage === totalDirectorTablePages}
            onClick={() => setCurrentDirectorPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} className="text-emerald-700" />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleLastDirectorPagination}
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
    <main>
      <ToastContainer />
      <Dashboard />
      <section className="mb-8 md:mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-start gap-8 md:ml-8 md:mt-4">
          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
                إضافة طبيب
              </h1>
              <Input
                id="doctorFullName"
                label="الأسم ثلاثي"
                type="text"
                name="name"
                value={doctor.name}
                onChange={handleDoctorChange}
              />
              <Input
                id="doctorUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={doctor.username}
                onChange={handleDoctorChange}
              />
              <Input
                id="doctorPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={doctor.password}
                onChange={handleDoctorChange}
              />
              <Select
                id="doctorSpecialization"
                isClearable
                placeholder="...التخصص"
                type="text"
                name="specialize"
                className="text-end mb-4"
                options={specializeOptions}
                value={selectedSpecialize}
                onChange={(option) => {
                  setSelectedSpecialize(option);
                  setDoctor((prev) => ({
                    ...prev,
                    specialize: option ? option.value : "",
                  }));
                }}
              />
              <input
                type="file"
                name="image"
                ref={imageInputRef}
                onChange={handleImageOnChange}
                className="w-full p-2 mb-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                onClick={handleAddDoctor}
                disabled={isAddingDoctor}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingDoctor ? "...جاري إضافة الطبيب" : "إضافة طبيب"}
              </button>
            </div>
          </form>

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
                إضافة مدير عيادات
              </h1>
              <Input
                id="directorName"
                label="الأسم "
                type="text"
                name="name"
                value={addClinicDirector.name}
                onChange={handleDirectorChange}
              />
              <Input
                id="directorUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={addClinicDirector.username}
                onChange={handleDirectorChange}
              />

              <Input
                id="directorPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={addClinicDirector.password}
                onChange={handleDirectorChange}
              />

              <button
                type="submit"
                onClick={handleAddDirector}
                disabled={isAddingDirector}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingDirector
                  ? "...جاري إضافة مدير عيادات"
                  : "إضافة مدير عيادات"}
              </button>
            </div>
          </form>

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
                إضافة مدير للمستشفي
              </h1>
              <Input
                id="managerFullName"
                label="الأسم ثلاثي"
                type="text"
                name="name"
                value={hospitalManager.name}
                onChange={handleHospitalManagerChange}
              />
              <Input
                id="managerUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={hospitalManager.username}
                onChange={handleHospitalManagerChange}
              />
              <Input
                id="mangerPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={hospitalManager.password}
                onChange={handleHospitalManagerChange}
              />
              <button
                type="submit"
                onClick={handleAddHospitalManager}
                disabled={isAddingHospitalManager}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingHospitalManager
                  ? "...جاري إضافة مدير مستشفي"
                  : "إضافة مدير مستشفي"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="overflow-x-auto p-4 w-full lg:w-1/2">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
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
                        حدف
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <p>
                                <RiDeleteBin5Fill
                                  onClick={() => {
                                    setDoctorId({
                                      doctorID: doctor._id,
                                    });
                                  }}
                                  size={20}
                                  className="text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer"
                                />
                              </p>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  هل أنت متأكد؟
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  لا يمكن التراجع عن هذا الإجراء. هذا سوف حذف
                                  حساب الأدمن الخاص به/لها نهائيًا وإزالته من
                                  خدمتنا
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>

                                <form method="delete" className="mt-2">
                                  <AlertDialogAction
                                    type="submit"
                                    disabled={isDeletingDoctor}
                                    onClick={handleDeleteDoctor}
                                  >
                                    {isDeletingDoctor
                                      ? "...جاري الحذف"
                                      : "تأكيد"}
                                  </AlertDialogAction>
                                </form>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
                {doctorslist.length <= 0 && (
                  <p className="text-center">You have zero Admins</p>
                )}
                <DoctorPagination />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4 w-full lg:w-1/2">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
                <div className="flex items-center justify-between mb-3">
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
                </div>

                <table className="w-full">
                  <thead className="bg-emerald-600 border">
                    <tr>
                      <th
                        scope="col"
                        className="text-md font-medium text-white px-6 py-4 text-right w-4"
                      >
                        حدف
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
                    {currenDirectorData.map((director, index) => (
                      <tr key={index} className="border text-right">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <p>
                                <RiDeleteBin5Fill
                                  onClick={() => {
                                    setDirectorId({
                                      directorID: director._id,
                                    });
                                  }}
                                  size={20}
                                  className="text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer"
                                />
                              </p>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  هل أنت متأكد؟
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  لا يمكن التراجع عن هذا الإجراء. هذا سوف حذف
                                  حساب الأدمن الخاص به/لها نهائيًا وإزالته من
                                  خدمتنا
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>

                                <form method="delete">
                                  <AlertDialogAction>
                                    <p
                                      type="submit"
                                      disabled={isDeletingDirector}
                                      onClick={handleDeleteDireector}
                                    >
                                      {isDeletingDirector
                                        ? "...جاري الحذف"
                                        : "تأكيد"}
                                    </p>
                                  </AlertDialogAction>
                                </form>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {director.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {director.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {directorsList.length <= 0 && (
                  <p className="text-center">You have zero Admins</p>
                )}
                <DoctorPagination />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HospitalAdmin;
