import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import Input from "@/components/AdminInput";

const HospitalAdmin = () => {
  const hospitalId = localStorage.getItem("hospitalAdminHospitalID");

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
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);
  const [hospitalManager, setHospitalManager] = useState({
    name: "",
    username: "",
    password: "",
    hospitalID: hospitalId,
  });
  const [isAddingHospitalManager, setIsAddingHospitalManager] = useState(false);

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
      toast.error(error);
      setIsAddingDirector(false);
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

  const handleAddDoctor = async (event) => {
    event.preventDefault();
    setIsAddingDoctor(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/hospitalAdmin/signupDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(doctor),
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
      });
      setIsAddingDoctor(false);
    } catch (error) {
      toast.error("fucking error");
      setIsAddingDoctor(false);
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
      toast.error("Fucking error");
      setIsAddingHospitalManager(false);
      return;
    }
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
                {isAddingDirector ? "جاري إضافة الدواء" : "إضافة دواء"}
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
                {isAddingHospitalManager ? "جاري إضافة المدير" : "إضافة مدير"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default HospitalAdmin;
