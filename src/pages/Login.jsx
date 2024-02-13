import Input from "../components/Input";

import login from "../assets/images/login2.jpg";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isNotEmpty, isUsername } from "../util/validation";

export default function Login() {
  const {
    value: usernameValue,
    handleInputChange: handleUsernameChange,
    handleInputValidation: handleUsernameBlur,
    hasError: usernameHasError,
  } = useInput("", (value) => isUsername(value, 6) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputValidation: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 14));

  function handleSubmit(event) {
    event.preventDefault();

    if (usernameHasError || passwordHasError) {
      return;
    }

    console.log(usernameValue, passwordValue);
  }
  return (
    <main className="flex flex-col">
      <section className="relative h-screen w-full">
        <div className="absolute w-full">
          <img
            src={login}
            className="object-cover object-center w-full h-screen"
          />
        </div>
        <div className="absolute">
          <h1
            className="text-center text-white 
           text-2xl p-8 md:px-96 mt-36 md:mt-20 "
          >
            مرحبًا! مجرد تذكير بأنه لكي تتمكن من تسجيل الدخول، يجب أن تكون
            مسجلاً في التأمين الصحي في مصر. إذا كانت لديك أي أسئلة حول حالة
            التسجيل الخاصة بك أو كنت بحاجة إلى المساعدة، فلا تتردد في التواصل
            معي وسأبذل قصارى جهدي لمساعدتك
          </h1>
          <form
            onSubmit={handleSubmit}
            className="w-[90%] max-w-2xl mx-auto mb-8 p-8  bg-opacity-80 rounded-lg shadow-2xl"
          >
            <h2 className="text-center mb-8 text-2xl text-[#dff6f6]">
              تسجيل الدخول
            </h2>
            <div className="flex flex-1 justify-end gap-4">
              <Input
                label="كلمة المرور"
                id="password"
                type="password"
                name="password"
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                value={passwordValue}
                error={passwordHasError && "كلمة المرور يجب أن تكون 14 رقم "}
              />
              <Input
                label="أسم المستخدم"
                id="text"
                type="text"
                name="text"
                onChange={handleUsernameChange}
                onBlur={handleUsernameBlur}
                value={usernameValue}
                error={usernameHasError && "الرجاءادخال اسم مستخدم صحيح "}
              />
            </div>
            <p className="flex justify-center md:justify-start gap-4">
              <button className="border border-slate-100 px-12 py-2 rounded-full text-[1rem] text-white hover:bg-[#319890] hover:border-none">
                التالي
              </button>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
