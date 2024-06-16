import { NavLink, Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import { navLinks } from "../data/constants";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { TbLogout2 } from "react-icons/tb";

import logo1 from "../assets/images/MHI.png";
import logo2 from "../assets/images/MHI-Emerald.svg";
import { Sidebar } from "lucide-react";

function NewNavbar() {
  const name = localStorage.getItem("patientName");
  const role = localStorage.getItem("role");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
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

  function logoutHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    submit(null, { action: "/logout", method: "post" });
  }

  return (
    <header className="z-10 absolute">
      <nav
        className={`fixed w-full h-[4rem] md:h-[5.5rem] max-w-[2500px] transition-all duration-300 ${
          isScrolled
            ? "bg-emerald-950 bg-opacity-80 shadow-md"
            : "bg-transparent shadow-none"
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
                    ? "bg-white px-4 text-emerald-950 rounded-lg"
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
                    ? "bg-white px-4 text-emerald-950 rounded-lg"
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
                    ? "bg-white px-4 text-emerald-950 rounded-lg"
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
                    ? "bg-white px-4 text-emerald-950 rounded-lg"
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

          {token && role === "patient" && (
            <div
              onMouseEnter={() => {
                setDropdownVisible(true);
              }}
              onMouseLeave={() => {
                setDropdownVisible(false);
              }}
              className="pr-4 relative cursor-pointer hidden md:block"
            >
              <div className="flex place-items-center bg-white text-emerald-950 p-2 rounded">
                <motion.div
                  animate={{ rotate: dropdownVisible ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdKeyboardArrowDown />
                </motion.div>
                <NavLink to="/profile">{name}</NavLink>
              </div>
              {dropdownVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-4 mt-[1px] w-full min-w-[150px] p-3 bg-white rounded-md shadow-lg"
                >
                  <NavLink to="/profile">
                    <p className="text-emerald-900 text-end mb-2">
                      الصفحة الشخصية
                    </p>
                  </NavLink>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <div className="flex items-center justify-end gap-2  md:gap-8 cursor-pointer">
                        <TbLogout2 size={20} className="text-emerald-900" />
                        <button className="text-emerald-900">
                          تسجيل الخروج
                        </button>
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white w-[320px] md:w-[500px]">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-[#056558]">
                          هل أنت متأكد؟
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-emerald-700 text-[15px] md:text-[20px]">
                          سيؤدي هذا الإجراء إلى تسجيل خروجك نهائيًا من حسابك ولن
                          تعد متاحًا لاستخدام هذه الخدمات حتى تقوم بتسجيل الدخول
                          مرة أخرى.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex items-center gap-3">
                        <AlertDialogCancel className="w-[150px] bg-red-600 text-white mb-1 text-[18px] font-bold hover:bg-red-900 transition-all duration-300">
                          إلغاء
                        </AlertDialogCancel>
                        <form
                          action="/logout"
                          method="post"
                          onClick={logoutHandler}
                          className="flex items-center gap-2 w-[150px] bg-emerald-700 rounded-lg px-3 py-2 md:gap-8 cursor-pointer hover:bg-emerald-900 transition-all duration-300"
                        >
                          <TbLogout2 size={20} className="text-white" />
                          <button className="text-white">تسجيل الخروج</button>
                        </form>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </motion.div>
              )}
            </div>
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
                onClick={() => {
                  setIsSidebar(false);
                }}
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

/**
 * 
 * <NavigationMenu className="mr-12">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-[20px]">
                    {name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="md:w-[400px] lg:w-[140px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <div className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md">
                            <NavLink
                              to="/profile"
                              className="mb-2 text-lg font-medium"
                            >
                              Profile
                            </NavLink>
                            <li
                              className={`hidden md:block list-none text-[16px] hover:animate-pulse text-black`}
                            >
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <button>تسجيل الخروج</button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-white w-[320px] md:w-[500px]">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-[#056558]">
                                      هل أنت متأكد؟
                                    </AlertDialogTitle>
                                    <AlertDialogDescription className="text-emerald-700 text-[15px] md:text-[20px]">
                                      سيؤدي هذا الإجراء إلى تسجيل خروجك نهائيًا
                                      من حسابك ولن تعد متاحًا لاستخدام هذه
                                      الخدمات حتى تقوم بتسجيل الدخول مرة أخرى
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
                                      <TbLogout2
                                        size={20}
                                        className="text-emerald-950"
                                      />
                                      <button className="text-emerald-950">
                                        تسجيل الخروج
                                      </button>
                                    </Form>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </li>
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
                <AlertDialogContent className="bg-white w-[320px] md:w-[500px]">
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
 */
