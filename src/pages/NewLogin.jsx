import { Link, json, redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function NewLogin() {
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
          <div className="mt-4 flex justify-center items-center gap-16">
            <Link
              to=".."
              relative="path"
              className="hover:underline text-emerald-500 text-[20px] md:text-[25px]"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
            <Link
              to="/contact-us"
              className="hover:underline text-emerald-500 text-[20px] md:text-[25px]"
            >
              التواصل معنا
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}

export default NewLogin;

export async function action({ request }) {
  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not authenticate this user." },
      { status: 500 }
    );
  }

  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);
  return redirect("/");
}
