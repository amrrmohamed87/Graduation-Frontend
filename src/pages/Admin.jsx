import Dashboard from "../components/Dashboard";
import Input from "../components/AdminInput";
import { useState } from "react";

function Admin() {
  const [patient, setPatient] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
    birthday: "",
  });
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [patientError, setPatientError] = useState("");

  const [doctor, setDoctor] = useState({
    name: "",
    username: "",
    password: "",
    specialize: "",
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [doctorError, setDoctorError] = useState("");

  const [hospital, setHospital] = useState({
    name: "",
    username: "",
    password: "",
    address: "",
  });
  const [isAddingHospital, setIsAddingHospital] = useState(false);
  const [hospitalError, setHospitalError] = useState("");

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

      if (response.status === 400) {
        throw new Error("user is already existed");
      }
      setIsAddingPatient(false);

      window.alert("Done");
      setIsAddingPatient(false);
      setPatient({
        name: "",
        username: "",
        password: "",
        address: "",
        birthday: "",
      });
    } catch (error) {
      setPatientError(error.message);
      setIsAddingPatient(false);
    }
  };

  function handleDoctorChange(event) {
    const { name, value } = event.target;
    setDoctor({
      ...doctor,
      [name]: value,
    });
  }

  const handleAddDoctor = async (event) => {
    event.preventDefault();
    setIsAddingDoctor(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/signupDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctor),
        }
      );

      if (response.status === 400) {
        throw new Error("doctor is already exists");
      }

      setIsAddingDoctor(false);
      window.alert("Done");
      setDoctor({
        name: "",
        username: "",
        password: "",
        specialize: "",
      });
    } catch (error) {
      setDoctorError(error.message);
      setIsAddingDoctor(false);
    }
  };

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

      if (response.status === 400) {
        throw new Error("user is already exists");
      }

      setIsAddingHospital(false);
      window.alert("Done");
      setHospital({
        name: "",
        username: "",
        password: "",
        address: "",
      });
    } catch (error) {
      setHospitalError(error.message);
      setIsAddingHospital(false);
    }
  };

  return (
    <main>
      <Dashboard />
      <h1 className="text-center mt-16 text-[25px] text-emerald-950 md:mb-8 md:text-[50px]">
        منظمة التأمين الصحي
      </h1>
      <section className="">
        <div className="flex flex-col md:flex-row justify-center items-start md:mt-4">
          <form method="post">
            <div className="bg-emerald-950 shadow-2xl rounded-[20px] p-4 m-4">
              <h1 className="text-center text-white text-[25px] mb-2">
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
                className="bg-white px-4 py-2 text-[20px] text-emerald-950 rounded-[20px]"
              >
                {isAddingPatient ? "جاري إضافة المريض" : "إضافة مريض"}
              </button>
            </div>
          </form>
          <form method="post">
            <div className="bg-emerald-950 shadow-2xl rounded-[20px] p-4 m-4">
              <h1 className="text-center text-white text-[25px] mb-2">
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
              {doctorError && <p className="text-center text-red-500"></p>}
              <button
                type="submit"
                onClick={handleAddDoctor}
                disabled={isAddingDoctor}
                className="bg-white px-4 py-2 text-[20px] text-emerald-950 rounded-[20px]"
              >
                {isAddingDoctor ? "جاري إضافة الطبيب" : "إضافة طبيب"}
              </button>
            </div>
          </form>
          <form method="post">
            <div className="bg-emerald-950 shadow-2xl rounded-[20px] p-4 m-4">
              <h1 className="text-center text-white text-[25px] mb-2">
                إضافة مستشفى
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
                className="bg-white px-4 py-2 text-[20px] text-emerald-950 rounded-[20px]"
              >
                {isAddingHospital ? "جاري إضافة المستشفى" : "إضافة مستشفى"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Admin;