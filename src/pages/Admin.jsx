import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../components/Dashboard";
import Input from "../components/AdminInput";
import TextArea from "@/components/AdminTextArea";

function Admin() {
  //Sign up patient states
  const [patient, setPatient] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    birthday: "",
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
  const [hospitalInfo, setHospitalInfo] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  //Sign up hospital states
  const [hospital, setHospital] = useState({
    name: "",
    username: "",
    password: "",
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

  //fetch hospitals
  useEffect(() => {
    async function loadHospitals() {
      setIsFetching(true);

      try {
        const response = await fetch(
          "https://mhiproject.onrender.com/auth/getHospitals"
        );
        const resData = await response.json();
        console.log(resData.allHospitals);
        setHospitalInfo(resData.allHospitals);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadHospitals();
  }, []);

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
      });
      setIsAddingPatient(false);
    } catch (error) {
      toast.error("Unexpected Error");
      setIsAddingPatient(false);
    }
  };

  //Sign up Doctor API
  function handleDoctorChange(event) {
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
  }

  const handleAddDoctor = async (event) => {
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
  };

  //Sign up Hospital API
  function handleAddHospitalChange(event) {
    const { name, value } = event.target;
    setHospital({
      ...hospital,
      [name]: value,
    });
  }

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

  return (
    <main>
      <ToastContainer />
      <Dashboard />
      <h1 className="text-center mt-16 text-[25px] text-emerald-950 md:mb-8 md:text-[50px]">
        منظمة التأمين الصحي
      </h1>
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-3 place-items-start gap-8 md:ml-8 md:mt-4">
          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
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
                label="المستشفي"
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
          </form>

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
          </form>

          <form method="post">
            <div className="bg-white rounded-lg shadow-md p-4 m-4 border border-gray-200">
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
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
                id="hospitalUsername"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={hospital.username}
                onChange={handleAddHospitalChange}
              />
              <Input
                id="hospitalPassword"
                label="كلمة المرور"
                type="password"
                name="password"
                value={hospital.password}
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
              <h1 className="text-center text-gray-800 text-[25px] mb-4">
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
        </div>
      </section>
    </main>
  );
}

export default Admin;
