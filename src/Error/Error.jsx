import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  let title = "حدث خطأ";
  let message = "هناك خطأ ما";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "غير معثور عليه";
    message = "لا يمكن العثور على هذه الصفحة";
  }

  return (
    <>
      <main className="m-16 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl text-emerald-950 text-center">
          {title}
        </h1>
        <p className="text-2xl text-slate-600 text-center">{message}</p>
        <button className="mt-4 bg-emerald-950 p-3 rounded-2xl text-white">
          <Link to=".." relative="path">
            العودة إلى الصفحة الرئيسية
          </Link>
        </button>
      </main>
    </>
  );
}
