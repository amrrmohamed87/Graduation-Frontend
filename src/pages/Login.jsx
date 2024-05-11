import { Form, Link, useNavigate } from "react-router-dom";
import Input from "../components/NewInput";
import { useState, useEffect } from "react";
import { FaRegEyeSlash, FaRegEye, FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

function Login() {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const hospitalID = data.user._id;
      if (
        role === "hospitalManager" ||
        role === "HospitalAdmin" ||
        role === "doctor"
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

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("hospitalID", hospitalID);

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

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <section className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="md:flex md:items-center md:justify-center md:gap-14 px-4">
        <div className="text-center md:w-1/2">
          <h1 className="text-emerald-800 text-[23px] mb-4 md:text-[49px] md:mb-4">
            مصر للتأمين الصحي
          </h1>
          <p className="text-emerald-700 text-[18px] px-8 md:text-[25px]">
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
        <div className="w-full mt-4 md:mt-0 max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-xl font-bold text-center text-emerald-800 mb-10">
            مصر للتأمين الصحي
          </h1>
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
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
