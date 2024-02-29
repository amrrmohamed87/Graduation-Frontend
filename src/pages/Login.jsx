import { Form, Link, useNavigate } from "react-router-dom";
import Input from "../components/NewInput";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
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
    setUserData({
      ...userData,
      [name]: value,
    });
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
      const name = data.user.name;
      const role = data.user.role;
      const token = data.token;
      const specialize = data.user.specialize;
      const hospital = data.user.address;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("specialize", specialize);
      localStorage.setItem("hospital", hospital);
      switch (role) {
        case "doctor":
          navigate("/doctor");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "hospital":
          navigate("/hospital");
          break;
        case "patient":
          navigate("/");
          break;
        default:
          console.error("Unexpected role:", role);
          setError("Unauthorized access");
      }
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <section className="flex flex-col">
      <div className="mt-24 md:mt-36 md:flex md:items-center md:gap-14">
        <div className="text-center md:w-1/2 md:ml-24">
          <h1 className="text-[27px] md:text-[49px] md:mb-4">
            مصر للتأمين الصحي
          </h1>
          <p className="text-[22px] px-8 md:text-[25px]">
            مرحبًا! مجرد تذكير بأنه لكي تتمكن من تسجيل الدخول، يجب أن تكون
            مسجلاً في التأمين الصحي في مصر. إذا كانت لديك أي أسئلة حول حالة
            التسجيل الخاصة بك أو كنت بحاجة إلى المساعدة، فلا تتردد في التواصل
            معي وسأبذل قصارى جهدي لمساعدتك
          </p>
          <div className="mt-4 flex justify-center items-center gap-12 md:gap-6">
            <Link
              to="/contact-us"
              className="bg-emerald-950 px-3 py-1 rounded-xl text-white hover:bg-emerald-700 text-[20px] md:text-[25px] flex justify-center items-center gap-1"
            >
              <FaPhoneAlt size={20} />
              <button>التواصل معنا</button>
            </Link>

            <Link
              to=".."
              relative="path"
              className="bg-emerald-950 px-3 py-1 rounded-xl text-white hover:bg-emerald-700 text-[20px] md:text-[25px] flex justify-center items-center gap-1"
            >
              <IoHome size={20} />
              <button>العودة إلى الصفحة الرئيسية</button>
            </Link>
          </div>
        </div>
        <div className="bg-emerald-950 shadow-[-0px_15px_40px_-10px_rgba(0,0,0,0.9)] p-8 mx-4 mt-8 rounded-xl">
          <form onSubmit={handleLogin}>
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

            {/* {data && data.message && (
            <p className="text-center mb-4 text-red-500 text-[18px]">
              {data.message}
            </p>
          )} */}
            {error && <p className="text-center text-red-600 my-8">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-white px-6 py-1 text-emerald-950 rounded-lg transition-all hover:bg-slate-500 md:text-[25px] md:px-10"
            >
              {loading ? "...جاري الدخول" : "التالي"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;

/* const fetchUserRole = async (token) => {
    try {
      const response = await fetch(
        "https://mhiproject.onrender.com/auth/author",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not fetch user role.");
      }

      const { userInfo } = await response.json();
      const role = userInfo.role;
      return role;
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  }; */

/* async function handleLogin(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to log in
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

      // Extract token from response
      const { token } = await response.json();
      localStorage.setItem("token", token);

      // Decode token to get user role
      const decoded = jwtDecode(token);
      console.log("Decoded token:", decoded); // Debug: Log decoded token

      // Assuming the role is directly available as decoded.role
      const user = { ...decoded };
      console.log("User role:", user.role); // Debug: Log user role

      // Ensure role is correctly identified before navigation
      switch (user.role) {
        case "doctor":
          navigate("/doctor-profile");
          break;
        case "hospital":
          navigate("/hospital");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "patient":
          navigate("/");
          break;
        default:
          // If no roles match, log the unexpected role for debugging
          console.error("Unexpected role:", role);
          setError("Unauthorized access");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  } */
