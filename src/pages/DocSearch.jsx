import React, { useEffect, useState } from "react";
import "../css/Search.css";
import Footer from "../components/Footer";
import SearchPhoto from "../assets/images/search.jpg";
import firstSectionPhoto from "../assets/images/Concept Médical Médecin Et Patient Dans La Salle Intérieure De L'hôpital _ Vecteur Premium.jfif";
import secondSectionPhoto from "../assets/images/Download Cardiologists Doctor Pointing at Heart Diagram for free.jfif";
import BookingSectionPhoto from "../assets/images/Desk_calendar_with_marked_dates_3d_cartoon_style_icon-Photoroom.png-Photoroom.png";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AOS from "aos";
import "aos/dist/aos.css";
// import { Book } from "lucide-react";
// import { data } from "autoprefixer";
export function DocSearch() {
  const[IsLOadingDays , setIsLoadingDays] = useState(true)
  const [isLoadingForDateDoc , setIsLoadingForDateDoc] = useState(true)
  const [watingForSureBook , setWatingForSureBook] = useState(false)
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);
  const Token = localStorage.getItem("token");
  const name = localStorage.getItem("patientName");
  const decodedToken = jwtDecode(Token);
  // console.log(decodedToken);
  // name of user
  const UserNameOfLogin = decodedToken.email;
  const UserIdOfLogin = decodedToken.userId;
  // -------------------------------------------------
  let [NameSpecialize, setNameSpecialize] = useState("");
  let [searchUser, setSearchUser] = useState({
    name: "",
    specialize: "",
  });
  // console.log(searchUser);
  const [sureBookSection, setSureBookSection] = useState("d-none");
  const [ClassNamee, setClassName] = useState(
    "d-none position-fixed z-1 secBook rounded-5 shadow-lg bg-white"
  );
  // -----------------------------new Code ------------------------
  const [showDivSearch, setShowDivSearch] = useState("d-none");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showDiv2, setShowDiv2] = useState(false);
  // -----------------------------new code ------------------------
  let [DocData, setDocData] = useState([]);
    // console.log(DocData);
  let [showResult, setShowResult] = useState([]);
  // console.log(showResult);
  let [handleForSearch, setHandleForSearch] = useState(
    "w-25 d-flex justify-content-center "
  );
  let [docDetail, setDocDetail] = useState({
    name: "",
    id: "",
  });
  let [errorGetDoc, setErrorGetDoc] = useState("d-none");
  let [errorForSearch, setErrorForSearch] = useState("d-none");
  let [errorButton, setErrorButton] = useState("d-none");
  let [trueBook, setTrueBook] = useState("d-none");
  const [error, setError] = useState("");
  const [classOfError, setClassOfError] = useState(
    "text-center fs-5 text-danger"
  );
  const [isLoading, setIsLoading] = useState(true);
  let [BookTime, setBookTime] = useState({
    day: "",
    time: "",
    patientID: UserIdOfLogin,
    doctorID: docDetail.id,
  });
  useEffect(() => {
    getDoctors();
  }, []);
  function closeTrueBook() {
    setTrueBook("d-none");

    // code gded anta 7tato 34an lma ydos al8a2 aly fy window tm al7gz bnga7 mtbyn4 almw3ed tany
    setClassName("d-none");
    setClassOfDocTime("d-none");
    setActiveIndexOfDate(null);
    setActiveIndexOfTime(null);
    setErrorButton("d-none")
    setWatingForSureBook(false)
  }
  function closeBookSection() {
    let newBook = { ...BookTime, day: "", time: "" };
    setBookTime(newBook);
    // console.log(newBook);
    setClassName("d-none");
    setClassOfDocTime("d-none");
    setActiveIndexOfDate(null);
    setActiveIndexOfTime(null);
  }
  async function getDoctors() {
    try {
      let { data } = await axios.get(
        "https://mhiproject.onrender.com/patient/getDoctors"
      );
      setDocData(data.userD);
      setIsLoading(false);
    } catch (errorGetDoc) {
      if (errorGetDoc.data.status === 404) {
        setErrorGetDoc("text-center fs-1");
      } else {
        setErrorGetDoc("text-center fs-1");
      }
    }

    // if (sdata.userD == null) {
    //     setErrorGetDoc("text-center fs-1")
    // }
  }
  function searchForDoctor(e, idOfSpecializ, nameOfSpecialize) {
    let MyUser = {
      ...searchUser,
      specialize: idOfSpecializ,
    };
    MyUser[e.target.name] = e.target.value;
    setSearchUser(MyUser);
    if (MyUser.specialize == undefined) {
      setNameSpecialize("التخصصات");
    } else {
      setNameSpecialize(nameOfSpecialize);
    }
  }
  function HideSureBoook() {
    setSureBookSection("d-none");
    setClassName("d-none");
    setTrueBook("d-none");
    setClassOfDocTime("d-none");
    setActiveIndexOfDate(null);
    setActiveIndexOfTime(null);
    setClassOfError("d-none")
    setWatingForSureBook(false)
    setErrorButton("d-none")
    setWatingForSureBook(false)
  }
  async function submitSearch(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/search",
        searchUser
      );
      setShowResult(data.search);
      setHandleForSearch("w-25 d-flex justify-content-center");
      setErrorForSearch("d-none");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setHandleForSearch("d-none");
        setErrorForSearch("text-center text-muted fs-1 mt-5");
      }
    }
  }
  function ShowBookSection(IDdoc, DocName) {
    setClassName(" position-fixed z-3 secBook rounded-5 shadow-lg bg-white");
    setDocDetail({
      name: DocName,
      id: IDdoc,
    });
    GetDaysToDoctor(IDdoc);
  }
  function setDayOfBook(e) {
    setActiveIndexOfTime(null);
    setBookTime({ ...BookTime, day: e.target.value });
    GetTimeToDoctor(e.target.value);
    setClassOfDocTime("col-md-5");
  }
  function setTimeOfBook(e) {
    setBookTime({ ...BookTime, time: e.target.value });
  }
  // function setBookForPatient(e) {
  //     let myBook = { ...BookTime }
  //     myBook[e.target.name] = e.target.value
  //     setBookTime(myBook)
  // }
  function FirstSubmitBook(IdDoc) {
    setBookTime({
      ...BookTime,
      doctorID: IdDoc,
    });
    setClassName("d-none");
    setSureBookSection(
      "position-fixed w-50 sureBook bg-white rounded-5 shadow-lg"
    );
  }
  async function submitBook(e) {
    e.preventDefault();
    setWatingForSureBook(true)
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/book",
        BookTime
      );
      // setClassName("d-none")
      setWatingForSureBook(false)
      setSureBookSection("d-none");
      setTrueBook(
        "w-50 position-fixed secBook2 rounded-5 shadow-lg bg-white d-flex flex-wrap"
      );
    } catch (error) {
      if (error.response && error.response.status === 406) {
        setError("يرجى اختيار موعد حجز أخر");
        setErrorButton("btn btn-success me-5");
        setClassOfError("text-center fs-5 text-danger");
        setWatingForSureBook(false)
      } else if (error.response && error.response.status === 400) {
        setError("يرجى ادخال بيانات صحيحة ");
        setErrorButton("btn btn-success me-5");
        setClassOfError("text-center fs-5 text-danger");
        setWatingForSureBook(false)
      } else if (error.response && error.response.status === 404) {
        setError("يرجى اختيار موعد حجز أخر");
        setErrorButton("btn btn-success me-5");
        setClassOfError("text-center fs-5 text-danger");
        setWatingForSureBook(false)
      } else if (error.response && error.response.status === 422) {
        setError("لقد حجزت مع هذا الطبيب من قبل");
        setErrorButton("btn btn-success me-5");
        setClassOfError("text-center fs-5 text-danger");setWatingForSureBook(false)
      }
    }
  }
  function BackStep() {
    setSureBookSection("d-none");
    setClassName("position-fixed z-3 secBook rounded-5 shadow-lg bg-white");
    setErrorButton("d-none");
    setClassOfError("d-none");
    setWatingForSureBook(false)
  }
  // ---------------------new code-----------------
  function showSectionSearch() {
    setShowDivSearch("container position-relative mb-5 mt-5");
  }
  function CloseSectionSearch() {
    setShowDivSearch("d-none");
    setErrorForSearch("d-none");
    setShowResult([]);
    setNameSpecialize("التخصصات");
    setSearchUser({
      name: "",
      specialize: "",
    });
  }
  const toggleDivPosition = () => {
    if (!isSearchActive) {
      setShowDivSearch("searchSection active");
      setIsSearchActive(true);
    }
  };
  const toggleDivPosition2 = () => {
    setShowDiv(!showDiv);
  };
  const toggleDivPosition3 = () => {
    setShowDiv2(!showDiv2);
  };
  // -----------------------------------------------
  // booking section
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const [hospitalsInfo, setHospitalsInfo] = useState([]);
  const [classShowResultOfhospi, setclassShowResultOfhospi] =
    useState("d-none");
  const [ShowResultFromHospi, setShowResultFromHospi] = useState([]);
  //   console.log(ShowResultFromHospi);
  useEffect(() => {
    getHospitals();
  }, []);
  async function getHospitals() {
    let { data } = await axios.get(
      "https://mhiproject.onrender.com/patient/getHospitals"
    );
    setHospitalsInfo(data.findHospitals);
    setIsLoading(false);
  }
  async function searchDocINHospi(hospiID) {
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/searchHospital",
        { hospitalID: hospiID }
      );
      setShowResultFromHospi(data.searchName);
      setclassShowResultOfhospi(
        "container w-11/12 shadow rounded-4 HightForSlidedown position-relative styleScrollOfHospitalSection overflow-scroll mt-5"
      );
    } catch (error) {
      console.error("Error searching for hospital:", error);
    }
  }
  function closeHospitalSection() {
    setclassShowResultOfhospi("d-none");
    setClickedButtonId(null);
  }
  const [activeIndexOfDate, setActiveIndexOfDate] = useState(null);
  const [activeIndexOfTime, setActiveIndexOfTime] = useState(null);

  const toggleActiveButtonOfDate = (index) => {
    setActiveIndexOfDate(index === activeIndexOfDate ? null : index);
  };
  const toggleActiveButtonOfTime = (index) => {
    setActiveIndexOfTime(index === activeIndexOfTime ? null : index);
  };
  // ----------------------------------
  // doctor day and time work
  const [docDays, setDocDays] = useState([]);
  const [NotHaveDays, setNotHaveDays] = useState(false);
  //   console.log(docDays);
  async function GetDaysToDoctor(DocId) {
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/getDays",
        { doctorID: DocId }
      );
      setDocDays(data);
      setIsLoadingForDateDoc(false)
      setNotHaveDays(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNotHaveDays(true);
        setDocDays([]);
        setIsLoadingForDateDoc(false)
      }
    }
  }
  // show time
  let [docTimes, setDocTimes] = useState([]);
  const [classOfDocTime, setClassOfDocTime] = useState("d-none");
  async function GetTimeToDoctor(DayOfWork) {
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/getTime",
        { doctorID: docDetail.id, day: DayOfWork }
      );
      setDocTimes(data);
      setIsLoadingDays(false)
    } catch (error) {}
  }
  // -------------------
  //   get specialize
  const [specialize, setSpecialize] = useState([]);
  //   console.log(specialize);
  async function getSpecializes() {
    try {
      let { data } = await axios.get(
        "https://mhiproject.onrender.com/hospitalAdmin/getSpecializes"
      );
      setSpecialize(data);
    } catch (error) {}
  }
  // -----------------
  return (
    <>
      <header data-aos="fade-right" className="relative h-screen w-full ">
        <div className=" w-full h-screen">
          <img
            src={SearchPhoto}
            className="object-cover object-center h-screen w-full"
          />
        </div>
        <div className="absolute inset-1 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center"></div>
      </header>
      {/* da section al7gz */}
      <section>
        <div className={ClassNamee}>
          <p className="text-center UnderLineAfterP fs-1 mt-2">أحجز الأن</p>
          <form className="py-3">
            <div className="container py-4">
              <div className="d-flex justify-content-evenly mb-4">
                <div className="d-flex gap-2 justify-content-center ">
                  <h1 className="fs-3 fontSizeINSmallScreen">
                    {" "}
                    {name}
                  </h1>
                  <label
                    htmlFor="patientID"
                    className="  fontSizeINSmallScreen text-success fs-2 text-end"
                  >
                    : اسم المريض
                  </label>
                </div>
                <div className="d-flex gap-2 justify-content-center">
                  <h1 className="fs-3 fontSizeINSmallScreen">
                    {docDetail.name}
                  </h1>
                  <label
                    htmlFor="doctorID"
                    className=" text-success fontSizeINSmallScreen fs-2  text-end"
                  >
                    : اسم الدكتور
                  </label>
                </div>
              </div>
              <div className="row justify-content-evenly">
                <div className="col-md-5 rounded-3 ">
                  <div className="d-flex shadow rounded-3 justify-content-evenly bg-primary gap-3 hieghtInSmallScreen pt-5">
                    <i className="fa-regular text-white mt-2 fs-6 fa-calendar-days"></i>
                    <p className="text-end mb-1 fs-4 text-white">أختر الوقت</p>
                  </div>
                  <div className="d-flex w-100  toChangeStyleTime overflow-scroll position-relative justify-content-center border border-primary py-3 rounded-3 hieghtInSmallScreenForDate">
                    <div className="position-absolute">
                      {NotHaveDays === false ? (
                        ""
                      ) : (
                        <h1 className="text-center text-muted my-5">
                          لا يعمل هذا الطبيب
                        </h1>
                      )}
                     
                      {isLoadingForDateDoc ?  <h2 className="mt-5 text-center fs-5 text-muted">جارى التحميل</h2> : "" }
                      {docDays.map((element, i) => {
                        const date = new Date(element);
                        const formattedDate = date.toISOString().split("T")[0];
                        return (
                          <div key={i}>
                            <input
                              onClick={(e) => {
                                setDayOfBook(e);
                                toggleActiveButtonOfDate(i);
                              }}
                              name="day"
                              type="button"
                              value={formattedDate}
                              className={`form-control w-100   mt-2 ${
                                activeIndexOfDate === i
                                  ? "text-white bg-primary"
                                  : "bg-muted"
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className={classOfDocTime}>
                  <div className="container flex-column d-flex justify-content-center">
                    <div className="w-100 text-center border border-primary rounded-3 p-2">
                      <p>{BookTime.day}</p>
                    </div>

                    <div className="d-flex w-100 toChangeStyleTime overflow-scroll position-relative justify-content-center border py-3 rounded-3 hieghtInSmallScreenForDate">
                      <div className="position-absolute">
                        {IsLOadingDays? "جارى التحميل" : docTimes &&
                          docTimes.length > 0 &&
                          docTimes[0].map((element, i) => (
                            <div key={i} className="w-100">
                              <input
                                onClick={(e) => {
                                  setTimeOfBook(e);
                                  toggleActiveButtonOfTime(i);
                                }}
                                type="button"
                                className={`mt-2 form-control w-100 ${
                                  activeIndexOfTime === i
                                    ? " text-white bg-primary "
                                    : " bg-muted "
                                }}`}
                                name="time"
                                value={element}
                              />
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex mt-4 justify-content-center gap-5">
              <button
                onClick={() => FirstSubmitBook(docDetail.id)}
                type="button"
                className="btn btn-success text-black  "
              >
                احجز الان
              </button>
              <button
                onClick={() => closeBookSection()}
                type="button"
                className="btn btn-danger text-black "
              >
                اغلاق
              </button>
            </div>
          </form>
        </div>
      </section>
      {/* تاكيييد الحجز  */}
      <section className={sureBookSection}>
        <p className="text-center fs-1 mt-4 position-relative wordSureBook">
          تأكيد الحجز
        </p>
        <div className="container py-5">
          <div className="row gap-1 justify-content-evenly">
            <div className="col-md-5 d-flex">
              <p className="text-right fs-4 me-3 text-success">Patient :</p>
              <p className="fs-5 text-right"> {name} </p>
            </div>
            <div className="col-md-5 d-flex">
              <p className="text-right fs-4 me-3 text-success">Doctor :</p>
              <p className="fs-5 text-right"> {docDetail.name}</p>
            </div>
            <div className="col-md-5 d-flex mt-3">
              <p className="text-right fs-4 me-3 text-success">Date :</p>
              <p className="fs-5 text-right">{BookTime.day}</p>
            </div>
            <div className="col-md-5 d-flex mt-3">
              <p className="text-right fs-4 me-3 text-success">Time :</p>
              <p className="fs-5 text-right"> {BookTime.time} </p>
            </div>
          </div>
        </div>
        <p className={classOfError}>{error}</p>
        <div className="d-flex justify-content-center py-3">
          <button onClick={submitBook} className="btn btn-success me-5">
            {watingForSureBook ? "....جارى تأكيد الحجز": " تأكيد الحجز "}
          </button>
          <button onClick={BackStep} className={errorButton}>
            الرجوع للصفحة السابقة{" "}
          </button>
          <button onClick={HideSureBoook} className="btn btn-danger">
            الغاء الحجز
          </button>
        </div>
      </section>
      {/* تم الحجز بنجاااح  */}
      <div className={trueBook}>
        <h1 className="fs-1 w-100  text-center">تم الحجز بنجاح </h1>
        <button
          onClick={() => closeTrueBook()}
          type="button"
          className="btn btn-danger text-black ms-3 "
        >
          اغلاق
        </button>
      </div>
      {/* ----------------------- choose the doctor ---------------- */}
      <section className="container mt-5">
        <div className="row  justify-content-center">
          <div
            data-aos="fade-right"
            className="col-md-5 layerfixed rounded-4 position-relative"
          >
            <img
              src={firstSectionPhoto}
              alt=""
              className="w-75 h-100 rounded-4 shadow position-absolute layerGoUp z-2"
            />
          </div>
          <div
            data-aos="fade-left"
            className="col-md-5 position-relative rounded-4 shadow p-4"
          >
            <div className="d-flex flex-wrap w-100 justify-content-end">
              <h1 className="text-end fs-1 mb-4"> أختر الدكتور المناسب</h1>
              <i className="fa-solid fs-3 text-success opacity-75 fa-magnifying-glass mt-2 ms-2"></i>
            </div>
            <p className="text-end fs-4 text-muted mb-5">
              {" "}
              يوجد جميع التخصصات نتيح لكم أن تبحثوا بالأسم و التخصص واجبنا أن
              نسهل عليكم جميع الخدمات
            </p>
            <button
              onClick={showSectionSearch}
              type="button"
              className="position-absolute btn text-white bg-success mb-3 start-25 bottom-0"
            >
              {" "}
              ابحث الان
            </button>
          </div>
        </div>
      </section>
      {/* section search and response of search  */}
      <section className={showDivSearch}>
        <button
          onClick={CloseSectionSearch}
          className="btn btn-close position-absolute  fs-5 end-0 searchCloseSection"
        ></button>
        <form
          className="mt-5"
          onSubmit={(e) => {
            submitSearch(e);
            toggleDivPosition();
          }}
        >
          <div className="d-flex w-100 justify-content-center ">
            <button
              onClick={(e) => {
                submitSearch(e);
                toggleDivPosition();
              }}
              type="button"
              className="btn btn-info rounded-5"
            >
              <i className="fa-solid fs-3 text-white fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              className=" searchfordocBar InResponsiveForIphonex form-control text-end fs-6  rounded-5"
              onChange={(e) => {
                searchForDoctor(e);
              }}
              placeholder="..بحث باسم الدكتور"
              name="name"
              value={searchUser.name}
            />
            {/* <input
              type="text"
              className="searchfordocBar InResponsiveForIphonex form-control text-end  rounded-5"
              onChange={searchForDoctor}
              placeholder="..بحث بالتخصص"
              name="specialize"
            /> */}
            <div className="dropdown searchfordocBar z-30 ">
              <button
                className="form-control rounded-5 dropdown-toggle w-100 text-muted py-2  fs-6"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={getSpecializes}
              >
                <p
                  className="d-inline"
                  onClick={() => {
                    setNameSpecialize("");
                    setSearchUser({ specialize: "" });
                  }}
                >
                  <i className="fa-solid fa-xmark "></i>
                </p>
                {NameSpecialize == "" ? "التخصصات" : NameSpecialize}
              </button>
              <ul className="dropdown-menu w-100">
                {specialize.map((element, i) => (
                  <li
                    key={i}
                    onClick={(e) => {
                      searchForDoctor(e, element._id, element.name);
                    }}
                    className="text-center text-muted  btn w-100"
                  >
                    {element.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </form>
        {/* result of search */}
        <h1 className={errorForSearch}>
          No input please write name or specialize
        </h1>
        {showResult === null || showResult.length === 0 ? (
          ""
        ) : (
          <div className="d-flex justify-content-center">
            <div
              className={`d-flex justify-content-center mt-3 flex-wrap gap-4  overflow-scroll  pt-14 w-75 searchSection position-relative ${
                isSearchActive ? "active" : ""
              }`}
            >
              {showResult.map((element, i) => (
                // <div key={i} className={handleForSearch}>
                //   <h2 className="text-center fs-3 text-muted">
                //     د/{element.name}{" "}
                //   </h2>
                //   <p className="mt-2 md:mt-0 fs-4 text-muted">
                //     <span className="fs-3 text-black"></span>
                //     {element.specialize.name} :{" "}
                //     <i className="fa-solid text-success fs-5 fa-stethoscope"></i>
                //   </p>
                //   <p className="mt-2 md:mt-0 fs-4 text-muted">
                //     {" "}
                //     {element.hospitalID?.name} :{" "}
                //     <i className=" fa-solid text-success fs-5 fa-truck-medical"></i>{" "}
                //   </p>
                //   <div className="d-flex justify-content-center">
                //     {" "}
                //     <button
                //       onClick={() => ShowBookSection(element._id, element.name)}
                //       type="button"
                //       className="btn mt-3 w-100 bg-success text-white border-3"
                //     >
                //       احجز الان
                //     </button>
                //   </div>
                // </div>
                <div className={handleForSearch}>
                  <div
                    key={i}
                    className="position-relative w-11/12 roundedCorner border  shadow my-3"
                  >
                    <div className="position-absolute top-0 start-50 translate-middle StyleForDoctorCardIMg overflow-hidden">
                      <img
                        src={`https://mhiproject.onrender.com/${element.image}`}
                        alt="صورة ملف شخصى"
                        className="w-100 h-100"
                      />
                    </div>
                    <div className="d-flex align-items-center flex-column flex-wrap pt-14 pb-4 ">
                      <h3 className="fw-medium text-center fs-4">
                      د/  {element.name}
                      </h3>
                      <p className="text-center text-muted mt-1 ">
                        {element.specialize.name}
                      </p>
                      <div className="d-flex flex-row">
                        <p className="text-muted">{element.hospitalID.name} <i className="fa-solid fa-location-dot text-success"></i></p>  
                      </div>
                      <button
                        onClick={() =>
                          ShowBookSection(element._id, element.name)
                        }
                        type="button"
                        className="cursor-pointer btn bg-success w-11/12 mt-3 text-white"
                      >
                        احجز الان
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
      {/* section Get doctors */}
      <section
        data-aos="fade-right"
        data-aos-offset="300"
        data-aos-easing="ease-in-sine"
        className="mt-5 z-2 HightForSlidedown position-relative overflow-hidden"
      >
        <div className="container  mt-5 d-flex flex-wrap justify-content-center">
          <div className="w-75 shadow rounded-4 p-4">
            <h1 className="fs-4 text-center">
              يمكنك بسهوله عرض جميع الأطباء بالضغط على هذا الزر
            </h1>
            <div className="w-100 d-flex gap-5 justify-content-center mt-5">
              <button
                type="button"
                onClick={() => {
                  toggleDivPosition2();
                  toggleDivPosition3();
                }}
                className="btn text-white bg-success"
              >
                أعرض الأطباء
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleDivPosition2();
                  toggleDivPosition3();
                }}
                className="btn text-white bg-success"
              >
                أخفاء الأطباء
              </button>
            </div>
          </div>
          <img
            src={secondSectionPhoto}
            className={`position-absolute StyleSoraGetSection rounded-4 ${
              showDiv ? "active" : ""
            }`}
            alt="sora"
          />
          <div
            className={`w-75 shadow rounded-4 z-3 bottom-0 pt-20 d-flex flex-wrap justify-content-around gap-4 position-absolute overflow-scroll styleOfBoxGetUsers ${
              showDiv ? "active" : ""
            }`}
          >
            {isLoading == true ? (
              <h1 className="fs-1 mt-5 text-center fw-bold "> جارى التحميل</h1>
            ) : (
              ""
            )}
            <h1 className={errorGetDoc}>جارى التحميل</h1>
            {DocData.map((element, i) => (
              <div key={i} className="w-25 d-flex justify-content-center">
                <div
                  className="position-relative w-11/12 roundedCornerForGet shadow-sm border my-3 "
                >
                  <div className="position-absolute top-0 start-50 translate-middle StyleForDoctorCardIMg overflow-hidden">
                    <img
                      src={`https://mhiproject.onrender.com/${element.image}`}
                      alt=""
                      className="w-100 h-100"
                    />
                  </div>
                  <div className="d-flex align-items-center flex-column flex-wrap pt-14 pb-4 ">
                    <h3 className="fw-medium text-center fs-4">
                     د/ {element.name} 
                    </h3>
                    <p className="text-center text-muted mt-1 ">
                      {element.specialize.name}
                    </p>
                    <div className="d-flex flex-row">
                        <p className="text-muted"> {element.hospitalID?.name} <i className="fa-solid fa-location-dot text-success"></i></p>  
                      </div>
                    <button
                      onClick={() => ShowBookSection(element._id, element.name)}
                      type="button"
                      className="cursor-pointer btn bg-success w-11/12 mt-3 text-white"
                    >
                      احجز الان
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* section Booking */}
      <section>
        <div className="container mt-24">
          <div className="d-flex SectionBookingInIphone justify-content-evenly">
            <div
              data-aos="zoom-out-right"
              className=" BookingSectionSora shado rounded-4"
            >
              <img
                src={BookingSectionPhoto}
                alt="sa"
                className="rounded-4 h-100"
              />
            </div>
            <div
              data-aos="fade-left"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              className=" BookingSectionText shadow rounded-4 p-4 text-end"
            >
              <h1 className="text-end fs-1">يمكنك حجز موعد</h1>
              <p className="text-end mt-3 fs-4">
                {" "}
                من خلال الضغط على اسم المستشفى سيتم عرض جميع الاطباء و تخصصاتهم
                المتاحين بها .
              </p>
              <i className="fa-solid fa-arrow-down text-success fs-5 mt-3  ">
                <span className="fs-5 ms-2 text-black fw-medium">
                  المستشفيات المتاحة{" "}
                  <i className="fa-regular fa-hospital text-success"></i>
                </span>
              </i>

              <div className="d-flex flex-wrap gap-2 justify-content-evenly mt-4">
                {isLoading == true ? (
                  <h1 className="fs-1 text-center fw-bold "> جارى التحميل</h1>
                ) : (
                  ""
                )}
                {hospitalsInfo.map((element, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setClickedButtonId(element._id);
                      searchDocINHospi(element._id);
                    }}
                    className={`shadow FlexForButtonHospital cursor-pointer rounded-4 h-100 p-2 d-flex justify-content-between  gap-5 ${
                      clickedButtonId === element._id ? "bg-warning" : ""
                    }`}
                  >
                    <div>
                      <div
                        className={`designForButtonOfHospital rounded-3 ${
                          clickedButtonId === element._id ? "clicked" : ""
                        }`}
                      >
                        {clickedButtonId === element._id ? (
                          <i className="fa-solid fa-caret-down fs-2"></i>
                        ) : (
                          <i className="fa-solid fa-caret-left fs-2"></i>
                        )}
                      </div>
                    </div>
                    <div>
                      <h1 className="fs-5"> {element.name}</h1>
                      <div className="d-flex justify-content-end ">
                        <p className="text-muted mt-1">{element.address}</p>
                        <i
                          className={`fa-solid fa-location-dot text-warning ms-2 mt-2 ${
                            clickedButtonId === element._id ? "text-white" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                  </div>
                  // <h1
                  //   key={i}
                  //   onClick={() => {
                  //       getHospitalID(element._id);
                  //     searchDocINHospi(element._id);
                  //   }}
                  //   className="forH1InBooking mt-5 p-1 rounded-3 text-center border-2 buttonOnBooking  border-success"
                  // >
                  //   {element.name}
                  // </h1>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          
          className={classShowResultOfhospi}
        >
          <div className="w-100 d-flex justify-content-end">
            <i
              onClick={closeHospitalSection}
              className="fa-regular fa-circle-xmark text-end  p-2 fs-3 text-success styleOFCloseCircleInHospital"
            ></i>
          </div>
          <div className="d-flex  position-absolute start-0 end-0 gap-2 flex-wrap justify-content-evenly ">
            {ShowResultFromHospi.map((element, i) => (
              // <div
              //   key={i}
              //   className="w-25 showDocInHospitals rounded-4 border-4 mt-3"
              // >
              //   <div className="py-3 text-end">
              //     <h1 className="text-center fs-3 mb-2 text-[#056558]">
              //       د/ {element.name}
              //     </h1>
              //     <h3 className="fs-3 mb-2">
              //       {" "}
              //       {element.specialize.name} :{" "}
              //       <i className="fa-solid text-success fs-5 fa-stethoscope"></i>{" "}
              //     </h3>
              //     <div className="d-flex mt-3 justify-content-center">
              //       <button
              //         onClick={() => ShowBookSection(element._id, element.name)}
              //         type="button"
              //         className="btn bg-success  w-100 text-white border-3"
              //       >
              //         احجز الان
              //       </button>
              //     </div>
              //   </div>
              // </div>
              <div
                key={i}
                className="position-relative w-1/5 roundedCorner shadow my-4 "
              >
                <div className="position-absolute top-0 start-50 translate-middle StyleForDoctorCardIMg overflow-hidden">
                  <img
                    src={`https://mhiproject.onrender.com/${element.image}`}
                    alt="صورة ملف شخصى"
                    className="w-100 h-100"
                  />
                </div>
                <div className="d-flex align-items-center flex-column flex-wrap pt-14 pb-4 ">
                  <h3 className="fw-medium text-center fs-4">د/ {element.name}</h3>
                  <p className="text-center text-muted mt-1 ">
                    {element.specialize.name}
                  </p>
                  <button
                    onClick={() => ShowBookSection(element._id, element.name)}
                    type="button"
                    className="cursor-pointer btn bg-success w-11/12 mt-3 text-white"
                  >
                    احجز الان
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
