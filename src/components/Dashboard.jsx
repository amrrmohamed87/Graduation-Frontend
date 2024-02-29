import { useSubmit, Form } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

function Dashboard() {
  const submit = useSubmit();
  function logoutHandler() {
    const proceed = window.confirm("هل أنت متأكد؟");

    if (proceed) {
      submit(null, { action: "/logout", method: "post" });
    }
  }

  return (
    <header className="bg-emerald-950">
      <div className="flex justify-between items-center cursor-pointr p-4">
        <h1 className="text-white text-[25px] md:text-[40px]">
          مصر للتأمين الصحي
        </h1>
        <Form
          action="/logout"
          method="post"
          onClick={logoutHandler}
          className="flex items-center gap-2 bg-white shadow-2xl rounded-[30px] px-3 py-2 md:gap-8 cursor-pointer"
        >
          <TbLogout2 size={20} className="text-emerald-950" />
          <button className="text-emerald-950">تسجيل الخروج</button>
        </Form>
      </div>
    </header>
  );
}

export default Dashboard;
