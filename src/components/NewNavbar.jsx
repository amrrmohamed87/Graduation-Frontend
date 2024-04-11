import { NavLink, Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import { navLinks } from "../data/constants";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TbLogout2 } from "react-icons/tb";

import logo1 from "../assets/images/MHI.png";
import logo2 from "../assets/images/MHI-Emerald.svg";

function NewNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function handleSidebar() {
    setIsSidebar(!isSidebar);
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 0);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logoutHandler() {
    submit(null, { action: "/logout", method: "post" });
  }

  return (
    <header className="z-10 absolute">
      <nav
        className={`fixed w-full h-[4rem] md:h-[5.5rem] max-w-[1536px] transition-all duration-300 ${
          isScrolled ? "bg-emerald-950 shadow-md" : "bg-transparent shadow-none"
        }`}
      >
        <div className="md:flex md:justify-between md:items-center">
          <NavLink>
            <img
              src={isScrolled ? logo1 : logo1}
              className="w-[85px] ml-2 mb-2 hidden md:block"
            />
          </NavLink>
          <ul className="hidden md:flex ml-16 pr-4">
            {/* {navLinks.map((item) => (
              <li
                key={item.label}
                className={`text-[26px] p-6 pr-12  hover:animate-pulse ${
                  isScrolled ? "text-emerald-800" : "text-slate-100"
                }`}
              >
                <NavLink to={item.to}>{item.label}</NavLink>
              </li>
            ))} */}
            <li
              className={`text-[26px] pr-10  hover:animate-pulse ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white px-4 text-emerald-950 rounded-xl"
                    : "bg-transparent"
                }
              >
                التواصل معنا
              </NavLink>
            </li>
            <li
              className={`text-[26px] pr-10  hover:animate-pulse ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white px-4 text-emerald-950 rounded-xl"
                    : "bg-transparent"
                }
              >
                الخدمات
              </NavLink>
            </li>
            <li
              className={`text-[26px] pr-10  hover:animate-pulse ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <NavLink
                to="/health-awareness"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white px-4 text-emerald-950 rounded-xl"
                    : "bg-transparent"
                }
              >
                التوعية الصحية
              </NavLink>
            </li>
            <li
              className={`text-[26px] pr-10  hover:animate-pulse ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-white px-4 text-emerald-950 rounded-xl"
                    : "bg-transparent"
                }
                end
              >
                الصفحة الرئيسية
              </NavLink>
            </li>
          </ul>
          {!token && (
            <li
              className={`hidden md:block list-none text-[23px] p-6 hover:animate-pulse ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <NavLink to="/login">تسجيل الدخول</NavLink>
            </li>
          )}
          {token && (
            <li
              className={`hidden md:block list-none text-[23px] hover:animate-pulse p-6 ${
                isScrolled ? "text-white" : "text-slate-100"
              }`}
            >
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button>تسجيل الخروج</button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-[#056558]">
                      هل أنت متأكد؟
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-emerald-700 text-[15px] md:text-[20px]">
                      سيؤدي هذا الإجراء إلى تسجيل خروجك نهائيًا من حسابك ولن تعد
                      متاحًا لاستخدام هذه الخدمات حتى تقوم بتسجيل الدخول مرة
                      أخرى
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex items-center gap-3">
                    <AlertDialogCancel className="border-2 border-[#056558] text-emerald-950 mb-1 text-[18px] font-bold">
                      إلغاء
                    </AlertDialogCancel>
                    <Form
                      action="/logout"
                      method="post"
                      onClick={logoutHandler}
                      className="flex items-center gap-2 bg-white shadow-2xl rounded-[30px] px-3 py-2 md:gap-8 cursor-pointer"
                    >
                      <TbLogout2 size={20} className="text-emerald-950" />
                      <button className="text-emerald-950">تسجيل الخروج</button>
                    </Form>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          )}
        </div>

        <div
          onClick={handleSidebar}
          className="flex justify-end text-white cursor-pointer p-6 md:hidden"
        >
          {!isSidebar && <AiOutlineMenu size={20} />}
        </div>
        <div>
          <ul
            className={
              isSidebar
                ? "fixed md:hidden right-0 top-0 w-1/2 h-full bg-[#f5f5dc] bg-opacity-90 ease-in-out duration-500"
                : "fixed top-0 bottom-0 right-[-100%] w-[60%] ease-in-out duration-500"
            }
          >
            <div
              onClick={handleSidebar}
              className="flex justify-start cursor-pointer mt-4 ml-2"
            >
              {isSidebar && <AiOutlineClose size={20} />}
            </div>
            {/* {navLinks.map((item) => (
              <li
                key={item.label}
                className="text-right text-[23px] mr-6 mt-12"
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-emerald-500 px-6 py-1 text-white rounded-xl"
                      : "bg-transparent"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))} */}
            <li className="text-right text-[23px] mr-6 mt-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-emerald-500 px-6 py-1 text-white rounded-xl"
                    : "bg-transparent"
                }
                end
              >
                الصفحة الرئيسية
              </NavLink>
            </li>

            <li className="text-right text-[23px] mr-6 mt-12">
              <NavLink
                to="/health-awareness"
                className={({ isActive }) =>
                  isActive
                    ? "bg-emerald-500 px-6 py-1 text-white rounded-xl"
                    : "bg-transparent"
                }
              >
                التوعية الصحية
              </NavLink>
            </li>
            <li className="text-right text-[23px] mr-6 mt-12">
              <NavLink
                to="/service"
                className={({ isActive }) =>
                  isActive
                    ? "bg-emerald-500 px-6 py-1 text-white rounded-xl"
                    : "bg-transparent"
                }
              >
                الخدمات
              </NavLink>
            </li>
            <li className="text-right text-[23px] mr-6 mt-12">
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  isActive
                    ? "bg-emerald-500 px-6 py-1 text-white rounded-xl"
                    : "bg-transparent"
                }
              >
                التواصل معنا
              </NavLink>
            </li>
            {!token && (
              <li className="list-none text-right text-[23px] mr-6 mt-12">
                <NavLink to="/login">تسجيل الدخول</NavLink>
              </li>
            )}
            {token && (
              <li className="list-none text-right text-[23px] mr-6 mt-12">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button>تسجيل الخروج</button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white p-4">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-[#056558]">
                        هل أنت متأكد؟
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-emerald-700 text-[15px] md:text-[20px]">
                        سيؤدي هذا الإجراء إلى تسجيل خروجك نهائيًا من حسابك ولن
                        تعد متاحًا لاستخدام هذه الخدمات حتى تقوم بتسجيل الدخول
                        مرة أخرى
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-row justify-center items-center gap-3">
                      <AlertDialogCancel className="border-2 border-[#056558] text-emerald-950 mb-1 text-[18px] font-bold">
                        إلغاء
                      </AlertDialogCancel>
                      <Form
                        action="/logout"
                        method="post"
                        onClick={logoutHandler}
                        className="flex items-center gap-2 bg-white shadow-2xl rounded-[30px] px-3 py-2 md:gap-8 cursor-pointer"
                      >
                        <TbLogout2 size={20} className="text-emerald-950" />
                        <button className="text-emerald-950">
                          تسجيل الخروج
                        </button>
                      </Form>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default NewNavbar;
