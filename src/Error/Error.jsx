import { Link } from "react-router-dom";
export default function Error() {
  return (
    <>
      <main className="m-16 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl text-emerald-950 text-center">
          حدث خطأ
        </h1>
        <p className="text-2xl text-slate-600 text-center">
          لا يمكن العثور على هذه الصفحة
        </p>
        <button className="mt-4 bg-emerald-950 p-3 rounded-2xl text-white">
          <Link to=".." relative="path">
            العودة إلى الصفحة الرئيسية
          </Link>
        </button>
      </main>
    </>
  );
}
