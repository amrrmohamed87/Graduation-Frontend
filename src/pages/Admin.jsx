import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../components/Dashboard";
import Input from "../components/AdminInput";
import TextArea from "@/components/AdminTextArea";

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
import { FaHospitalAlt } from "react-icons/fa";
import { FaRegHospital } from "react-icons/fa";
import { LuUsers } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";

function Admin() {
  //Sign up patient states
  const [patient, setPatient] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    birthday: "",
    mobileNumber: "",
  });
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [patientError, setPatientError] = useState("");

  //Sign up doctor states
  const [doctor, setDoctor] = useState({
    name: "",
    username: "",
    password: "",
    specialize: "",
    id: "",
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [doctorError, setDoctorError] = useState("");

  /* const [hospitalAdmin, setHospitalAdmin] = useState({
    name: "",
    username: "",
    password: "",
    hospitalID: "",
  });
  const [isAddingAdmin, setIsAddingAdmin] = useState(false); */

  //Sign up hospital states
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
  });
  const [isAddingHospital, setIsAddingHospital] = useState(false);
  const [hospitalError, setHospitalError] = useState("");
  const [doctorImage, setDoctorImage] = useState(null);

  //Create medicine states
  const [medicines, setMedicines] = useState({
    name: "",
    description: "",
    howToUse: "",
    components: "",
    tradeMark: "",
  });
  const [isAddingMedicine, setIsAddingMedicine] = useState(false);

  //Fetch hospitals and patients states
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [patientsInfo, setPatientsInfo] = useState([]);
  const [isFetchingPatients, setIsFetchingPatiens] = useState(false);
  const [patientsId, setPatientId] = useState({
    patientID: "",
  });
  const [hospitalsId, setHospitalId] = useState({
    hospitalID: "",
  });
  const [adminId, setAdminId] = useState({
    adminID: "",
  });
  const [isDeletingPatient, setIsDeletingPatient] = useState(false);
  const [isDeletingHospital, setIsDeletingHospital] = useState(false);
  const [isDeletingAdmin, setIsDeletingAdmin] = useState(false);
  //Hospital filter
  const [hospitalQuery, setHospitalQuery] = useState("");
  const [currentHospitalPage, setCurrentHospitalPage] = useState(1);
  const [hospitalRowsPerPage, setHospitalRowsPerPage] = useState(5);

  //Patient Filter
  const [patientQuery, setPatientQuery] = useState("");
  const [currentPatientPage, setCurrentPatientPage] = useState(1);
  const [patientRowsPerPage, setPatientRowsPerPage] = useState(5);

  const [hospitalAdminData, setHospitalAdminData] = useState({
    name: "",
    username: "",
    password: "",
    hospitalID: "",
  });
  const [isAddingAdminHospital, setIsAddingHospitalAdmin] = useState(false);

  //Fetch HospitalAdmins State
  const [adminsData, setAdminsData] = useState([]);
  const [isFetchingAdmins, setIsFetchingAdmins] = useState(false);

  //admins Filter
  const [adminQuery, setAdminQuery] = useState("");
  const [currentAdminPage, setCurrentAdminPage] = useState(1);
  const [adminRowsPerPage, setAdminRowsPerPage] = useState(5);

  //Fetch HospitalAdmins API
  useEffect(() => {
    async function loadAdmins() {
      setIsFetchingAdmins(true);
      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/auth/getHospitalAdmins"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetchingAdmins(false);
          return;
        }

        setAdminsData(resData);
        setIsFetchingAdmins(false);
      } catch (error) {
        toast.error("Unexpected error during fetching admins");
        setIsFetchingAdmins();
        return;
      }
    }
    loadAdmins();
  }, [isDeletingAdmin || isAddingAdminHospital || isDeletingHospital]);

  function handleHospitalAdminChange(event) {
    const { name, value } = event.target;
    setHospitalAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleAddHospitalAdmin = async (event) => {
    event.preventDefault();
    setIsAddingHospitalAdmin(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/singupHospitalAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalAdminData),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Bitchy error");
        setIsAddingHospitalAdmin(false);
        return;
      }

      toast.success("تم اضافة أدمن بنجاح");
      setHospitalAdminData({
        name: "",
        username: "",
        password: "",
        hospitalID: "",
      });
      setIsAddingHospitalAdmin(false);
    } catch (error) {
      toast.error("Fucking error");
      setIsAddingHospitalAdmin(false);
      return;
    }
  };
  //fetch hospitals
  useEffect(() => {
    async function loadHospitals() {
      setIsFetching(true);

      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/auth/getHospitals"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message);
          setIsFetching(false);
          return;
        }

        setHospitalInfo(resData.allHospitals);
        setIsFetching(false);
      } catch (error) {
        toast.error("unexpected error during fetching hospitals");
        setIsFetching(false);
        return;
      }
    }

    loadHospitals();
  }, [isDeletingHospital, isAddingHospital]);

  //fetch patients
  useEffect(() => {
    async function loadPatients() {
      setIsFetchingPatiens(true);
      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/auth/getPatients"
        );
        const resData = await response.json();

        if (!response.ok) {
          toast.error(resData.message || "Couldn't fetch the patients");
          setIsFetchingPatiens(false);
          return;
        }

        setPatientsInfo(resData);
        setIsFetchingPatiens(false);
      } catch (error) {
        toast.error("Unexpected error during fetching patients");
        setIsFetchingPatiens(false);
        return;
      }
    }
    loadPatients();
  }, [isDeletingPatient, isAddingPatient]);

  //Sign up patient API
  function handlePatientChange(event) {
    const { name, value } = event.target;
    setPatient({
      ...patient,
      [name]: value,
    });
  }

  const handleAddPatient = async (event) => {
    event.preventDefault();
    setIsAddingPatient(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/signupPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        const errorMessage = resData.message || "فشل في إضافة المريض";
        toast.error(errorMessage);
        setIsAddingPatient(false);
        return;
      }
      toast.success("تمت إضافة المريض بنجاح");
      setPatient({
        name: "",
        username: "",
        password: "",
        address: "",
        birthday: "",
        mobileNumber: "",
      });
      setIsAddingPatient(false);
    } catch (error) {
      toast.error("Unexpected Error during signup patient");
      setIsAddingPatient(false);
    }
  };

  //Signup Admin for the hospital
  /* /*  function handleAdminChange(event) {
    const { name, value } = event.target;
    if (name === "hospitalID" && value) {
      const selectedHospital = hospitalInfo.find(
        (hospital) => hospital.name === value
      );

      setHospitalAdmin((prev) => ({
        ...prev,
        hospitalID: selectedHospital ? selectedHospital._id : "",
        [name]: value,
      }));
      console.log(hospitalAdmin.hospitalID);
    } else {
      setHospitalAdmin((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    console.log(hospitalAdmin);
  }
 
  function handleAdminChange(event) {
    const { name, value } = event.target;
    setHospitalAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(hospitalAdmin);
  }
  const handleAddAdmin = async (event) => {
    event.preventDefault();
    setIsAddingAdmin(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/hospitalAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalAdmin),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Fe error fl signup");
        setIsAddingAdmin(false);
        return;
      }

      toast.success("تم اضافة الأدمن بنجاح");
      setHospitalAdmin({
        name: "",
        username: "",
        password: "",
        hospitalID: "",
      });
      setIsAddingAdmin(false);
    } catch (error) {
      toast.error("Fe error ghareb");
      setIsAddingAdmin(false);
      return;
    }
  }; */

  //Sign up Doctor API
  /* function handleDoctorChange(event) {
    const { name, value } = event.target;

    if (name === "hospitalID" && value) {
      const selectedHospital = hospitalInfo.find(
        (hospital) => hospital.name === value
      );

      setDoctor((prev) => ({
        ...prev,
        id: selectedHospital ? selectedHospital._id : "",
        [name]: value,
      }));

      console.log(selectedHospital._id);
    } else {
      setDoctor((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log(doctor);
    }
  } */

  /* const handleAddDoctor = async (event) => {
    event.preventDefault();
    setIsAddingDoctor(true);

    const data = {
      username: doctor.username,
      password: doctor.password,
      name: doctor.name,
      specialize: doctor.specialize,
      hospitalID: doctor.id,
    };
    console.log(data);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/signupDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const resData = await response.json();

      if (!response.ok) {
        const errorMessage = resData.message || "Failed to create doctor";
        toast.error(errorMessage);
        setIsAddingDoctor(false);
        return;
      }

      toast.success("تمت إضافة الدكتور بنجاح");
      setIsAddingDoctor(false);
      setDoctor({
        name: "",
        username: "",
        password: "",
        specialize: "",
        hospitalID: "",
      });
    } catch (error) {
      toast.error("Unexpected Error");
      setIsAddingDoctor(false);
    }
  }; */

  //Delete patient
  const handleDeletePatient = async () => {
    //event.preventDefault();
    setIsDeletingPatient(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/deletePatient",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientsId),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Failed to delete user");
        setIsDeletingPatient(false);
        return;
      }

      toast.success("تم مسح المريض بنجاح");
      setIsDeletingPatient(false);
    } catch (error) {
      toast.error("fe Error");
      setIsDeletingPatient(false);
      return;
    }
  };

  //Delete Hospital
  const handleDeleteHospital = async () => {
    //event.preventDefault();
    setIsDeletingHospital(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/deleteHopsital",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospitalsId),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message || "Failed to delete user");
        setIsDeletingHospital(false);
        return;
      }

      toast.success("تم مسح المستشفي بنجاح");
      setIsDeletingHospital(false);
    } catch (error) {
      toast.error("fe Error");
      setIsDeletingHospital(false);
      return;
    }
  };

  //Delete Hospital
  const handleDeleteAdmin = async () => {
    //event.preventDefault(); removed to close the dialoge automatically
    setIsDeletingAdmin(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/deleteHospitalAdmin",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminId),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsDeletingAdmin(false);
        return;
      }

      toast.success("تم مسج الأدمن بنجاح");
      setAdminId({
        adminID: "",
      });
      setIsDeletingAdmin(false);
    } catch (error) {
      toast.error("unexpected error");
      setIsDeletingAdmin(false);
      return;
    }
  };

  //Sign up Hospital API
  function handleAddHospitalChange(event) {
    const { name, value } = event.target;
    setHospital({
      ...hospital,
      [name]: value,
    });
  }

  //Delete Doctor

  const handleAddHospital = async (event) => {
    event.preventDefault();
    setIsAddingHospital(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/signupHospital",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hospital),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        const errorMessage = resData.message || "فشل في إضافة المستشفي";
        toast.error(errorMessage);
        setIsAddingHospital(false);
        return;
      }
      toast.success("تمت إضافة المستشفي بنجاح");
      setHospital({
        name: "",
        username: "",
        password: "",
        address: "",
      });
      setIsAddingHospital(false);
    } catch (error) {
      toast.error("Unexpected Error");
      setIsAddingHospital(false);
    }
  };

  //Create Medicine API
  function handleCreateMedicineChange(event) {
    const { name, value } = event.target;
    setMedicines({
      ...medicines,
      [name]: value,
    });
  }

  const handleCreateMedicine = async (event) => {
    event.preventDefault();
    setIsAddingMedicine(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/createMedicine",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicines),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        const errorMessage = resData.message || "فشل في إضافة الدواء";
        toast.error(errorMessage);
        setIsAddingMedicine(false);
        return;
      }
      toast.success("تمت إضافة الدواء بنجاح");
      setMedicines({
        name: "",
        description: "",
        howToUse: "",
        components: "",
        tradeMark: "",
      });
      setIsAddingMedicine(false);
    } catch (error) {
      toast.error("Unexpected Error");
      setIsAddingMedicine(false);
    }
  };

  //Searchable input for hospitals
  const filteredHospital = hospitalInfo.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(hospitalQuery.toLowerCase()) ||
      hospital.code.toLowerCase().includes(hospitalQuery.toLowerCase())
  );

  const totalHospitalTablePages = Math.ceil(
    filteredHospital.length / hospitalRowsPerPage
  );
  const currentHospitalData = filteredHospital.slice(
    (currentHospitalPage - 1) * hospitalRowsPerPage,
    currentHospitalPage * hospitalRowsPerPage
  );

  //searchable input for patients
  const filteredPatients = patientsInfo.filter(
    (patient) =>
      patient.name.toLowerCase().includes(patientQuery.toLowerCase()) ||
      patient.code.toLowerCase().includes(patientQuery.toLowerCase())
  );
  const totalPatientTablePages = Math.ceil(
    filteredPatients.length / patientRowsPerPage
  );
  const currentPatientData = filteredPatients.slice(
    (currentPatientPage - 1) * patientRowsPerPage,
    currentPatientPage * patientRowsPerPage
  );

  //Searchable input for Admins
  const filteredAdmins = adminsData.filter(
    (admin) =>
      admin.name.toLowerCase().includes(adminQuery.toLowerCase()) ||
      admin.code.toLowerCase().includes(adminQuery.toLowerCase())
  );
  const totalAdminTablePages = Math.ceil(
    filteredAdmins.length / adminRowsPerPage
  );
  const currentAdminData = filteredAdmins.slice(
    (currentAdminPage - 1) * adminRowsPerPage,
    currentAdminPage * adminRowsPerPage
  );

  //Handle pagination for hospital

  function handleHospitalSearch(event) {
    setHospitalQuery(event.target.value);
    setCurrentHospitalPage(1);
  }

  const handleHospiatlRowsPerPage = (event) => {
    setHospitalRowsPerPage(event.target.value);
    setCurrentHospitalPage(1);
  };

  const handleLastHospitalPagination = () => {
    setCurrentHospitalPage(totalHospitalTablePages);
  };

  const handleFirstHospitalPagination = () => {
    setCurrentHospitalPage(1);
  };

  //handle pagination for the patient
  function handlePatientSearch(event) {
    setPatientQuery(event.target.value);
    setCurrentPatientPage(1);
  }

  const handlePatientRowsPerPage = (event) => {
    setPatientRowsPerPage(event.target.value);
    setCurrentPatientPage(1);
  };

  const handleLastPatientPagination = () => {
    setCurrentPatientPage(totalPatientTablePages);
  };

  const handleFirstPatientPagination = () => {
    setCurrentPatientPage(1);
  };

  //HandlePagination for admins
  function handleAdminSearch(event) {
    setAdminQuery(event.target.value);
    setCurrentAdminPage(1);
  }

  const handleAdminRowsPerPage = (event) => {
    setAdminRowsPerPage(event.target.value);
    setCurrentAdminPage(1);
  };

  const handleAdminLastPagination = () => {
    setCurrentAdminPage(totalAdminTablePages);
  };

  const handleFirstAdminPagination = () => {
    setCurrentAdminPage(1);
  };

  const HospitalPagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={hospitalRowsPerPage}
            onChange={handleHospiatlRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentHospitalPage} of {totalHospitalTablePages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstHospitalPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentHospitalPage === 1}
            onClick={() => setCurrentHospitalPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentHospitalPage === totalHospitalTablePages}
            onClick={() => setCurrentHospitalPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} className="text-emerald-700" />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleLastHospitalPagination}
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

  const PatientPagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={patientRowsPerPage}
            onChange={handlePatientRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentPatientPage} of {totalPatientTablePages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstPatientPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentPatientPage === 1}
            onClick={() => setCurrentPatientPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentPatientPage === totalPatientTablePages}
            onClick={() => setCurrentPatientPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} className="text-emerald-700" />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleLastPatientPagination}
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

  const AdminPagination = () => {
    return (
      <div className="flex justify-end items-center gap-6 mt-6">
        <p>
          Rows per Page{" "}
          <input
            type="number"
            value={adminRowsPerPage}
            onChange={handleAdminRowsPerPage}
            className="w-12 pl-3 border-2 rounded-md"
          />
        </p>
        <p>
          page {currentAdminPage} of {totalAdminTablePages}
        </p>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleFirstAdminPagination}
          >
            <MdKeyboardDoubleArrowLeft size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentAdminPage === 1}
            onClick={() => setCurrentAdminPage((prev) => prev - 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <GrFormPrevious size={20} className="text-emerald-700" />
          </button>
          <button
            disabled={currentAdminPage === totalAdminTablePages}
            onClick={() => setCurrentAdminPage((prev) => prev + 1)}
            className="px-2 py-1 rounded-md border-2 text-gray-800"
          >
            <MdNavigateNext size={20} className="text-emerald-700" />
          </button>
          <button
            className="px-2 py-1 rounded-md border-2"
            onClick={handleAdminLastPagination}
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
  console.log(patientsId);
  console.log(adminsData);

  return (
    <main>
      <ToastContainer />
      <Dashboard />
      <section className="mt-16 md:mb-8">
        <div className="flex justify-center items-center gap-12">
          {/* <div className="bg-white w-[250px] rounded-lg border shadow-md p-3 flex justify-end gap-2">
            <div className="flex  flex-col justify-end items-end gap-1">
              <h1 className="text-[28px]">المديرين</h1>
              <p className="text-[19px] text-gray-700">{adminsData.length}</p>
            </div>
            <GrUserAdmin size={25} className="text-emerald-500" />
          </div> */}
          <h1 className="text-[20px] text-emerald-950 md:text-[50px]">
            منظمة التأمين الصحي
          </h1>
          {/* <div className="bg-white w-[250px] rounded-lg border shadow-md p-3 flex justify-end gap-2">
            <div className="flex  flex-col justify-end items-end gap-1">
              <h1 className="text-[28px]">المستشفيات</h1>
              <p className="text-[19px] text-gray-700">{hospitalInfo.length}</p>
            </div>
            <FaRegHospital size={25} className="text-emerald-500" />
          </div> */}
        </div>
      </section>
      <section className="mb-8 md:mb-12 bg-white shadow-md rounded-md border m-9">
        <h1 className="text-center mt-4 text-emerald-700 text-2xl">
          إضافة دواء - مسؤل - مستشفى
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center md:mx-16 md:mt-4">
          {/* <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-2xl mb-4">
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
              <Input
                id="doctorSpecialization"
                label="التخصص"
                type="text"
                name="specialize"
                value={doctor.specialize}
                onChange={handleDoctorChange}
              />

              {isFetching ? (
                <p>Loading...</p>
              ) : (
                <select
                  id="hospital"
                  label="المستشفي"
                  name="hospitalID"
                  value={doctor.id}
                  onChange={handleDoctorChange}
                  className="h-[30px] w-full border-2 mb-4 text-right border-gray-300 focus:border-gray-950 rounded-lg pl-2 md:h-[40px]"
                >
                  <option value="">اختر المستشفى</option>
                  {hospitalInfo.map((hospital) => (
                    <option key={hospital._id} value={hospital.name}>
                      {hospital.name}
                    </option>
                  ))}
                </select>
              )}
              {doctorError && <p className="text-center text-red-500"></p>}
              <button
                type="submit"
                onClick={handleAddDoctor}
                disabled={isAddingDoctor}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingDoctor ? "جاري إضافة الطبيب" : "إضافة طبيب"}
              </button>
            </div>
          </form> */}

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-2xl mb-4">
                إضافة مستشفي
              </h1>
              <Input
                id="hospitalName"
                label="أسم المستشفي"
                type="text"
                name="name"
                value={hospital.name}
                onChange={handleAddHospitalChange}
              />
              <Input
                id="hosptialAddress"
                label="العنوان"
                type="text"
                name="address"
                value={hospital.address}
                onChange={handleAddHospitalChange}
              />
              <button
                type="submit"
                onClick={handleAddHospital}
                disabled={isAddingHospital}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingHospital ? "جاري إضافة المستشفى" : "إضافة مستشفى"}
              </button>
            </div>
          </form>

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-2xl mb-4">
                إضافة أدمن للمستشفيات
              </h1>
              <Input
                id="adminFullName"
                label="الأسم ثلاثي"
                type="text"
                name="name"
                value={hospitalAdminData.name}
                onChange={handleHospitalAdminChange}
              />
              <Input
                id="adminUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={hospitalAdminData.username}
                onChange={handleHospitalAdminChange}
              />
              <Input
                id="adminPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={hospitalAdminData.password}
                onChange={handleHospitalAdminChange}
              />
              <select
                name="hospitalID"
                id="hospital"
                label="المستشفي"
                value={hospitalAdminData.hospitalID}
                onChange={handleHospitalAdminChange}
                className="h-[30px] w-full border-2 mt-8 mb-4 text-right border-gray-300 focus:border-gray-950 rounded-lg pl-2 md:h-[40px]"
              >
                <option value="">اختر المستشفى</option>
                {hospitalInfo.map((hospital) => (
                  <option key={hospital._id} value={hospital._id}>
                    {hospital.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                onClick={handleAddHospitalAdmin}
                disabled={isAddingAdminHospital}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingAdminHospital ? "جاري إضافة الأدمن" : "إضافة أدمن"}
              </button>
            </div>
          </form>

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-2xl mb-4">
                إضافة دواء
              </h1>
              <Input
                id="medicineName"
                label="أسم الدواء"
                type="text"
                name="name"
                value={medicines.name}
                onChange={handleCreateMedicineChange}
              />
              <Input
                id="description"
                label="الوصف"
                type="text"
                name="description"
                value={medicines.description}
                onChange={handleCreateMedicineChange}
              />
              <TextArea
                id="prescription"
                label="كيفية الاستخدام"
                type="text"
                name="howToUse"
                value={medicines.howToUse}
                onChange={handleCreateMedicineChange}
              />
              <TextArea
                id="components"
                label="المكونات"
                type="text"
                name="components"
                value={medicines.components}
                onChange={handleCreateMedicineChange}
              />
              <Input
                id="tradeMark"
                label="العلامة تجارية"
                type="text"
                name="tradeMark"
                value={medicines.tradeMark}
                onChange={handleCreateMedicineChange}
              />
              <button
                type="submit"
                onClick={handleCreateMedicine}
                disabled={isAddingMedicine}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingMedicine ? "جاري إضافة الدواء" : "إضافة دواء"}
              </button>
            </div>
          </form>

          {/* <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-2xl mb-4">
                إضافة مريض
              </h1>
              <Input
                id="patientFullName"
                label="الأسم ثلاثي"
                type="text"
                name="name"
                value={patient.name}
                onChange={handlePatientChange}
              />
              <Input
                id="patientUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={patient.username}
                onChange={handlePatientChange}
              />
              <Input
                id="patientPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={patient.password}
                onChange={handlePatientChange}
              />
              <Input
                id="patientAddress"
                label="العنوان"
                type="text"
                name="address"
                value={patient.address}
                onChange={handlePatientChange}
              />
              <Input
                id="patientBirthDate"
                label="تاريخ الميلاد"
                type="date"
                name="birthday"
                value={patient.birthday}
                onChange={handlePatientChange}
              />
              <Input
                id="mobileNumber"
                label="رقم الهاتف"
                type="text"
                name="mobileNumber"
                value={patient.mobileNumber}
                onChange={handlePatientChange}
              />
              {patientError && (
                <p className="text-center text-red-500">{patientError}</p>
              )}
              <button
                type="submit"
                disabled={isAddingPatient}
                onClick={handleAddPatient}
                className="bg-emerald-700 px-4 py-2 text-[20px] text-white rounded-xl hover:bg-[#056658] transition-colors duration-150"
              >
                {isAddingPatient ? "جاري إضافة المريض" : "إضافة مريض"}
              </button>
            </div>
          </form> */}
        </div>
      </section>

      <section>
        <div className="flex flex-col mt-8 lg:flex-row">
          <div className="overflow-x-auto p-4 w-full lg:w-1/2">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    placeholder="...المستشفي / الكود"
                    onChange={handleHospitalSearch}
                    value={hospitalQuery}
                    className="w-[220px] border rounded-md h-9 text-right p-2"
                  />
                  <div className="flex items-start gap-1">
                    <h1 className="text-right text-[20px]">قائمة المستشفيات</h1>
                    <FaRegHospital size={20} className="text-emerald-500" />
                  </div>
                </div>
                {isFetching && <p>Loading...</p>}
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
                    {currentHospitalData.map((hospital, index) => (
                      <tr key={index} className="border text-right">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <p>
                                <RiDeleteBin5Fill
                                  onClick={() => {
                                    setHospitalId({
                                      hospitalID: hospital._id,
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
                                  حساب المستشفي الخاص بها نهائيًا وإزالتها من
                                  خدمتنا
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-500 text-white trasnition-all duration-300 hover:bg-red-900">
                                  إلغاء
                                </AlertDialogCancel>
                                <form method="delete">
                                  <AlertDialogAction className="mt-2 bg-emerald-600 text-white trasnition-all duration-300 hover:bg-emerald-900">
                                    <p
                                      type="submit"
                                      disabled={isDeletingHospital}
                                      onClick={handleDeleteHospital}
                                    >
                                      {isDeletingHospital
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
                          {hospital.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {hospital.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {hospitalInfo.length <= 0 && <p>You have zero hospitals</p>}
                <HospitalPagination />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4 w-full lg:w-1/2">
            <div className="py-2 inline-block w-full">
              <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
                <div className="flex items-center justify-between mb-3">
                  <input
                    type="text"
                    placeholder="...المريض / الكود"
                    onChange={handlePatientSearch}
                    value={patientQuery}
                    className="w-[220px] border rounded-md h-9 text-right p-2"
                  />
                  <div className="flex items-start gap-1">
                    <h1 className="text-right text-[20px]">قائمة المرضى</h1>
                    <LuUsers size={20} className="text-emerald-500" />
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
                    {currentPatientData.map((patient, index) => (
                      <tr key={index} className="border text-right">
                        <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <p>
                                <RiDeleteBin5Fill
                                  onClick={() => {
                                    setPatientId({ patientID: patient._id });
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
                                  حساب المريض الخاص به/لها نهائيًا وإزالته من
                                  خدمتنا
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-500 text-white trasnition-all duration-300 hover:bg-red-900">
                                  إلغاء
                                </AlertDialogCancel>
                                <form method="delete">
                                  <AlertDialogAction className="mt-2 bg-emerald-600 text-white trasnition-all duration-300 hover:bg-emerald-900">
                                    <p
                                      type="submit"
                                      disabled={isDeletingPatient}
                                      onClick={handleDeletePatient}
                                    >
                                      {isDeletingPatient
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
                          {patient.code}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                          {patient.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {patientsInfo.length <= 0 && <p>You have zero patients</p>}
                <PatientPagination />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="overflow-x-auto p-4 w-full lg:w-1/2">
          <div className="py-2 inline-block w-full">
            <div className="overflow-hidden bg-white rounded-md shadow-md p-4 border">
              <div className="flex items-center justify-between mb-3">
                <input
                  type="text"
                  placeholder="...الأدمن / الكود"
                  onChange={handleAdminSearch}
                  value={adminQuery}
                  className="w-[220px] border rounded-md h-9 text-right p-2"
                />
                <div className="flex items-start gap-1">
                  <h1 className="text-right text-[20px]">قائمة الأدمن</h1>
                  <GrUserAdmin size={20} className="text-emerald-500" />
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
                  {currentAdminData.map((admin, index) => (
                    <tr key={index} className="border text-right">
                      <td className="px-6 py-4 whitespace-nowrap text-md text-gray-500 flex justify-end items-center">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <p>
                              <RiDeleteBin5Fill
                                onClick={() => {
                                  setAdminId({
                                    adminID: admin._id,
                                  });
                                }}
                                size={20}
                                className="text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer"
                              />
                            </p>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                              <AlertDialogDescription>
                                لا يمكن التراجع عن هذا الإجراء. هذا سوف حذف حساب
                                الأدمن الخاص به/لها نهائيًا وإزالته من خدمتنا
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-red-500 text-white trasnition-all duration-300 hover:bg-red-900">
                                إلغاء
                              </AlertDialogCancel>

                              <form method="delete">
                                <AlertDialogAction className="mt-2 bg-emerald-600 text-white trasnition-all duration-300 hover:bg-emerald-900">
                                  <p
                                    type="submit"
                                    disabled={isDeletingAdmin}
                                    onClick={handleDeleteAdmin}
                                  >
                                    {isDeletingAdmin
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
                        {admin.code}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900">
                        {admin.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {adminsData.length <= 0 && (
                <p className="text-center">You have zero Admins</p>
              )}
              <AdminPagination />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Admin;
