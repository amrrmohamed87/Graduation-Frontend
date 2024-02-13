import { Form } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { hasMinLength, isNotEmpty, isUsername } from "../util/validation";
import Input from "../components/Input";

function Signin() {
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
    <section className="mt-40 md:mt-0 md:h-screen flex flex-col justify-center md:flex-row md:justify-between items-center gap-4">
      <div className="w-full px-4 mb-4 md:b-0 md:w-1/2 md:pl-32 text-center">
        <h1 className="text-2xl font-bold mb-2">مصر للتأمين الصحي</h1>
        <p className="text-xl text-slate-900">
          مرحبًا! مجرد تذكير بأنه لكي تتمكن من تسجيل الدخول، يجب أن تكون مسجلاً
          في التأمين الصحي في مصر. إذا كانت لديك أي أسئلة حول حالة التسجيل
          الخاصة بك أو كنت بحاجة إلى المساعدة، فلا تتردد في التواصل معي وسأبذل
          قصارى جهدي لمساعدتك
        </p>
      </div>
      <div className="w-full  ml-20 md:w-1/2 md:pl-4 md:ml-0">
        <Form onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-2xl w-[80%] px-8 md:w-[60%] md:px-16 py-4">
            <h1 className="mb-4 text-xl md:text-3xl text-right">
              تسجيل الدخول
            </h1>
            <div>
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
              <p className="flex justify-center mb-4">
                <button className="bg-emerald-800 rounded-2xl py-1 px-12 md:px-20 text-white hover:bg-emerald-900">
                  التالي
                </button>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}

export default Signin;
