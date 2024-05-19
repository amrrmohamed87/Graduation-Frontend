import { Form, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import Input from "../components/NewInput";
import { useState, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye, FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signin, setSignin] = useState(false);
  const [patientData, setPatientData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    birthday: "",
  });
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  function handleChange(event) {
    const { name, value } = event.target;
    setError("");
    setUserData({ ...userData, [name]: value });
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    setShowPassword(false);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("أسم المستخدم أو كلمة المرور خطأ");
      }

      const data = await response.json();
      console.log(data);

      const role = data.user.role;
      const token = data.token;
      //const hospitalID = data.user._id; no longer available will be deleted later
      if (
        role === "hospitalManager" ||
        role === "HospitalAdmin" ||
        role === "doctor" ||
        role === "CLinicsDirector"
      ) {
        const name = data.user.name;
        const DoctorId = data.user._id;

        const specialize = data.user.specialize;
        const hospital = data.user.address;
        const hospitalAdminHospitalID = data.hospitalDetails._id;
        const hospitalNameFromHospitaldDetails = data.hospitalDetails.name;
        const hospitalLocation = data.hospitalDetails.address;

        localStorage.setItem("name", name);
        localStorage.setItem("DoctorId", DoctorId);

        localStorage.setItem("specialize", specialize);
        localStorage.setItem("hospital", hospital);
        localStorage.setItem(
          "hospitalNameFromHospitaldDetails",
          hospitalNameFromHospitaldDetails
        );
        localStorage.setItem(
          "hospitalAdminHospitalID",
          hospitalAdminHospitalID
        );
        localStorage.setItem("hospitalLocation", hospitalLocation);
      }

      if (role === "patient") {
        const patientName = data.user.name;
        const patientCode = data.user.code;

        localStorage.setItem("patientName", patientName);
        localStorage.setItem("patientCode", patientCode);
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      //localStorage.setItem("hospitalID", hospitalID);

      switch (role) {
        case "doctor":
          navigate("/doctor");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "CLinicsDirector":
          navigate("/clinicsDirector");
          break;
        case "patient":
          navigate("/");
          break;
        case "HospitalAdmin":
          navigate("/hospitalAdmin");
          break;
        case "hospitalManager":
          navigate("/hospitalManager");
          return;
          break;
        default:
          console.error("Unexpected role:", role);
          setError("Unauthorized access");
      }
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  function handleSignupPatientChange(event) {
    const { name, value } = event.target;
    setPatientData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSignupPatient = async (event) => {
    event.preventDefault();
    setIsCreatingAccount(true);

    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/signupPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patientData),
        }
      );
      const resData = await response.json();

      if (!response.ok) {
        toast.error(resData.message);
        setIsCreatingAccount(false);
        return;
      }

      toast.success("Account Created Successfully");
      setPatientData({
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        birthday: "",
      });
      setIsCreatingAccount(false);
      setSignin(false);
    } catch (error) {
      toast.error("unexpected error during sign up!");
      setIsCreatingAccount(false);
      return;
    }
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  const upwardMotionVariants = {
    offscreen: {
      opacity: 0,
      y: 300, // Start below the natural position
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.3, // Adjust the bounce effect, if spring type is used
        duration: 2,
      },
    },
  };

  const animationVariants = {
    enterFromRight: {
      x: 20,
      opacity: 0,
    },
    enterFromLeft: {
      x: -300,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="md:flex md:items-center md:justify-center md:gap-14 px-4">
        <div className="text-center md:w-1/2">
          <h1 className="text-emerald-800 text-[23px] mb-4 md:text-[49px] md:mb-4">
            مصر للتأمين الصحي
          </h1>
          <p className="text-emerald-700 text-[18px]  md:text-[25px]">
            مرحبًا! مجرد تذكير بأنه لكي تتمكن من تسجيل الدخول، يجب أن تكون
            مسجلاً في التأمين الصحي في مصر. إذا كانت لديك أي أسئلة حول حالة
            التسجيل الخاصة بك أو كنت بحاجة إلى المساعدة، فلا تتردد في التواصل
            معي وسأبذل قصارى جهدي لمساعدتك.
          </p>
          <div className="mt-4 flex justify-center items-center gap-6 md:gap-8">
            <Link
              to="/contact-us"
              className="bg-emerald-800 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white text-[10px] md:text-xl flex items-center gap-2 transition-colors duration-300 ease-in-out"
            >
              <FaPhoneAlt size="15" />
              التواصل معنا
            </Link>
            <Link
              to="/"
              className="bg-emerald-800 hover:bg-emerald-700 px-4 py-2 rounded-lg text-white text-[10px] md:text-xl flex items-center gap-2 transition-colors duration-300 ease-in-out"
            >
              <IoHome size="15" />
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true }}
          variants={upwardMotionVariants}
          className="w-full mt-4 md:mt-0 max-w-md p-8 bg-white rounded-lg shadow-lg"
        >
          <h1 className="text-[24px] font-bold text-center text-emerald-800 mb-2">
            مصر للتأمين الصحي
          </h1>
          {signin ? (
            <p className="text-[18px] font-bold text-center text-gray-500 mb-4">
              إنشاء حساب
            </p>
          ) : (
            <p className="text-[18px] font-bold text-center text-gray-500 mb-4">
              تسجيل الدخول
            </p>
          )}

          {signin ? (
            <motion.form
              initial="enterFromRight"
              animate="center"
              exit="enterFromLeft"
              variants={animationVariants}
              onSubmit={handleSignupPatient}
              className="space-y-6"
            >
              <Input
                id="patientFullName"
                label="الأسم ثلاثي"
                type="text"
                name="name"
                value={patientData.name}
                onChange={handleSignupPatientChange}
              />
              <Input
                id="patientUserName"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={patientData.username}
                onChange={handleSignupPatientChange}
              />
              <Input
                id="patientPassword"
                label="كلمة المرور"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={patientData.password}
                onChange={handleSignupPatientChange}
                icon={
                  !showPassword ? (
                    <FaRegEye size={20} className="text-emerald-950" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-emerald-950" />
                  )
                }
              />
              <Input
                id="confirmPassword"
                label="تأكيد كلمة المرور"
                type={!showPassword ? "password" : "text"}
                name="confirmPassword"
                value={patientData.confirmPassword}
                onChange={handleSignupPatientChange}
                icon={
                  !showPassword ? (
                    <FaRegEye size={20} className="text-emerald-950" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-emerald-950" />
                  )
                }
              />
              <Input
                id="patientBirthDate"
                label="تاريخ الميلاد"
                type="date"
                name="birthday"
                value={patientData.birthday}
                onChange={handleSignupPatientChange}
              />
              <button
                type="submit"
                disabled={isCreatingAccount}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 transform bg-emerald-800 rounded-md hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700"
              >
                {isCreatingAccount ? "...جاري التجيل" : "إنشاء حساب"}
              </button>
              <h1 className="flex justify-center gap-2">
                <Link
                  className="text-[#056550]"
                  onClick={() => {
                    setSignin(!signin);
                  }}
                >
                  تسجيل الدخول
                </Link>
                هل لديك حساب؟
              </h1>
            </motion.form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                id="username"
                label="أسم المستخدم"
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
              />
              <Input
                id="password"
                label="كلمة المرور"
                type={!showPassword ? "password" : "text"}
                name="password"
                value={userData.password}
                onChange={handleChange}
                showPassword={handleShowPassword}
                icon={
                  !showPassword ? (
                    <FaRegEye size={20} className="text-emerald-950" />
                  ) : (
                    <FaRegEyeSlash size={20} className="text-emerald-950" />
                  )
                }
              />
              {error && <p className="text-center text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 transform bg-emerald-800 rounded-md hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700"
              >
                {loading ? "...جاري الدخول" : "تسجيل الدخول"}
              </button>

              <h1 className="flex justify-center gap-2">
                <Link
                  className="text-[#056550]"
                  onClick={() => {
                    setSignin(!signin);
                  }}
                >
                  إنشاء حساب
                </Link>{" "}
                ليس لديك حساب؟
              </h1>
            </form>
          )}
          {/* <form onSubmit={handleLogin} className="space-y-6">
            <Input
              id="username"
              label="أسم المستخدم"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
            />
            <Input
              id="password"
              label="كلمة المرور"
              type={!showPassword ? "password" : "text"}
              name="password"
              value={userData.password}
              onChange={handleChange}
              showPassword={handleShowPassword}
              icon={
                !showPassword ? (
                  <FaRegEye size={20} className="text-emerald-950" />
                ) : (
                  <FaRegEyeSlash size={20} className="text-emerald-950" />
                )
              }
            />
            {error && <p className="text-center text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-200 transform bg-emerald-800 rounded-md hover:bg-emerald-700 focus:outline-none focus:bg-emerald-700"
            >
              {loading ? "...جاري الدخول" : "تسجيل الدخول"}
            </button>

            <h1 className="flex justify-center gap-2">
              <Link className="text-[#056550]">إنشاء حساب</Link> ليس لديك حساب؟
            </h1>
          </form> */}
        </motion.div>
      </div>
    </section>
  );
}

export default Login;
