import { Form, Link, useNavigate } from "react-router-dom";
import Input from "../components/NewInput";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
function Login() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

      const { token } = await response.json();
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log(decoded);

      const user = { ...decoded };
      switch (user.userId) {
        case "65c63a722c04dbc59dfce9e4":
          navigate("/doctor-profile");
          break;
        case "65c63b961f77969fc15aad84":
          navigate("/hospital");
          break;

        case "65c63a3135a6469a0384304d":
          navigate("/");
          break;
        default:
          setError("Unauthorized access");
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsLoading(false);
    }
  };

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
          <div className="mt-4 flex justify-center items-center gap-12 md:gap-16">
            <Link
              to="/contact-us"
              className="hover:underline text-emerald-500 text-[20px] md:text-[25px]"
            >
              التواصل معنا
            </Link>
            <Link
              to=".."
              relative="path"
              className="hover:underline text-emerald-500 text-[20px] md:text-[25px]"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
        <div className="bg-white shadow-2xl p-8 mx-4 mt-8 rounded-xl">
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
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
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
              className="bg-emerald-500 px-6 py-1 text-white rounded-lg transition-all
         hover:bg-emerald-700 md:text-[25px] md:px-10"
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
