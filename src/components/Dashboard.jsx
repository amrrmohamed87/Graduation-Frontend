import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useSubmit } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

function Dashboard() {
  const submit = useSubmit();

  function logoutHandler() {
    submit(null, { action: "/logout", method: "post" });
  }

  return (
    <header className="bg-emerald-950 flex justify-end">
      <div className="flex w-full justify-between items-center p-4 flex-row-reverse">
        <h1 className="text-white text-[25px] md:text-[40px] ml-4">
          مصر للتأمين الصحي
        </h1>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex items-center gap-2 bg-white shadow-2xl rounded-[30px] px-3 py-2 md:gap-8 cursor-pointer">
              <TbLogout2 size={20} className="text-emerald-950" />
              <button className="text-emerald-950">تسجيل الخروج</button>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#056558]">
                هل أنت متأكد؟
              </AlertDialogTitle>
              <AlertDialogDescription className="text-emerald-700 text-[15px] md:text-[20px]">
                سيؤدي هذا الإجراء إلى تسجيل خروجك نهائيًا من حسابك ولن تعد
                متاحًا لاستخدام هذه الخدمات حتى تقوم بتسجيل الدخول مرة أخرى.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center gap-3">
              <AlertDialogCancel className="border-2 border-[#056558] text-emerald-950 mb-1 text-[18px] font-bold">
                إلغاء
              </AlertDialogCancel>
              <form
                action="/logout"
                method="post"
                onClick={logoutHandler}
                className="flex items-center gap-2 bg-white shadow-2xl rounded-[30px] px-3 py-2 md:gap-8 cursor-pointer"
              >
                <TbLogout2 size={20} className="text-emerald-950" />
                <button className="text-emerald-950">تسجيل الخروج</button>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </header>
  );
}

export default Dashboard;
