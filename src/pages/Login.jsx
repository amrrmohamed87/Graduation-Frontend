import Input from "../components/Input";

import login from "../assets/images/login2.jpg";

export default function Login() {
  function handleSubmit(event) {
    event.preventDefault();
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
            <div className="flex flex-wrap justify-end gap-4">
              <Input
                label="كلمة المرور"
                id="password"
                type="password"
                name="password"
              />
              <Input label="أسم المستخدم" id="text" type="text" name="text" />
            </div>
            <p className="flex justify-start gap-4">
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
