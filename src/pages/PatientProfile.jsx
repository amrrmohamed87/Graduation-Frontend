import NewNavbar from "./../components/NewNavbar";
import "../css/Patient.css";
import IconForUserProfile from "../assets/icons/764d59d32f61f0f91dec8c442ab052c5.jpg";
import IconForDoc from "../assets/icons/2e80a0b84f2afc0b21df07b67a892371.jpg";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function PatientProfile() {
  //Passing the patient code - amr
  const code = localStorage.getItem("patientCode");
  //---------------------------------------------
  // tfasel aluser aly d5l
  const Token = localStorage.getItem("token");
  const decodedToken = jwtDecode(Token);
  // console.log(decodedToken);
  const name = localStorage.getItem("name");
  const UserNameOfLogin = decodedToken.email;
  const UserIdOfLogin = decodedToken.userId;
  // console.log(UserIdOfLogin);
  // --------------end----------------
  const [activeTab, setActiveTab] = useState(null);

  const [isLoadingForWatingTime, setIsLoadingForWatingTime] = useState(true);
  const [isLoadingForGetAcceptBooks, setIsLoadingForGetAcceptBooks] =
    useState(true);
  const [isLoadingForGetRecords, setIsLoadingForGetRecords] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  useEffect(() => {
    if (activeTab === null) {
      setIsLoadingForWatingTime(false);
      setIsLoadingForGetAcceptBooks(false);
      setIsLoadingForGetRecords(false);
      setIsDivVisible(false)
    } else if (activeTab === 1) {
      setIsLoadingForWatingTime(true);
      setIsDivVisible(false)
    } else if (activeTab === 2) {
      setIsLoadingForGetAcceptBooks(true);
      setIsDivVisible(false)
    } else if (activeTab === 3) {
      setIsLoadingForGetRecords(true);
    }
  }, [activeTab]);
  const handleClick = (tabNumber) => {
    if (activeTab === tabNumber) {
      setActiveTab(null);
    } else {
      setActiveTab(tabNumber);
    }
  };

  // useEffect(() => {
  //   if (activeTab === null) {
  //     setIsLoading(false);
  //   } else if (
  //     WattingBooks.length <= 0 ||
  //     acceptBooks.length <= 0 ||
  //     setRecords.length <= 0
  //   ) {
  //     setIsLoading(true);
  //   }
  // }, [activeTab, isLoading]);
  // fetch kol aldoctors

  const [ShowDoc, setShowDoc] = useState([]);
  useEffect(() => {
    GetDoc();
    getInfoOfUser();
  }, []);
  async function GetDoc() {
    try {
      let { data } = await axios.get(
        "https://mhiproject.onrender.com/patient/getDoctors"
      );
      setShowDoc(data.userD);
      setIsLoading2(false);
      // console.log(data);
    } catch (error) {}
  }
  // ------------------------------

  // to get watting books
  const [WattingBooks, setWattingBooks] = useState([]);
  // console.log(WattingBooks);
  async function getWattingBooks() {
    try {
      let { data } = await axios(
        `https://mhiproject.onrender.com/patient/getWaitingBooks/${UserIdOfLogin}`
      );
      // console.log(data);
      setWattingBooks(data);
      setIsLoadingForWatingTime(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsLoadingForWatingTime(false);
      }
    }
  }
  useEffect(() => {
    getWattingBooks();
  }, []);
  // -------------end---------
  // to get accept books
  const [acceptBooks, setAcceptBooks] = useState([]);
  // console.log(acceptBooks);
  async function getAcceptBooks() {
    try {
      let { data } = await axios(
        `https://mhiproject.onrender.com/patient/getDone/${UserIdOfLogin}`
      );
      // console.log(data);
      setAcceptBooks(data);
      setIsLoadingForGetAcceptBooks(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsLoadingForGetAcceptBooks(false);
      }
    }
  }
  useEffect(() => {
    getAcceptBooks();
  }, []);
  // -------------end---------
  // to get records
  const [activeIndex, setActiveIndex] = useState(null);
  const [setRecords, setSetRecords] = useState([]);
  // console.log(setRecords);
  const [getDiagnose, setDiagnose] = useState([]);
  // console.log(getDiagnose[activeIndex]);
  const [activeClass, setActiveClass] = useState(false);
  // console.log(tempDiagnose.medicine);

  async function getRecords() {
    try {
      let { data } = await axios(
        `https://mhiproject.onrender.com/patient/getRecords/${UserIdOfLogin}`
      );
      // console.log(data);
      setSetRecords(data);
      // console.log(data.diagnose);
      const allDiagnoses = data.map((record) => record.diagnose);
      // console.log(allDiagnoses);
      setDiagnose(allDiagnoses);
      setIsLoadingForGetRecords(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsLoadingForGetRecords(false);
      }
    }
  }
  useEffect(() => {
    getRecords();
  }, []);
  function putIToGetDiagnose(IOfDiagnose) {
    setActiveClass(true);
    setActiveIndex(IOfDiagnose);
  }

  function closeDiagnoseSection() {
    setActiveClass(false);
    setActiveIndex(null);
  }

  // filter for records
  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };
  const [DoctorSpecialize, setDoctorSpecialize] = useState("");
  const docSecializeFilter = (value) => {
    setDoctorSpecialize(value);
  };
  const [isDivVisible, setIsDivVisible] = useState(false);
  // const filteredDoctors = setRecords.filter((doctor) => {
  //   return doctor.specialize.name.includes(DoctorSpecialize);
  // });
  const filteredDoctors = setRecords.filter((record) => {
    return record.doctor && record.doctor.specialize && record.doctor.specialize.name && record.doctor.specialize.name.includes(DoctorSpecialize);
  });
  // console.log(filteredDoctors);
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 4;

  const totalPage = Math.ceil(filteredDoctors.length / recordPerPage);

  const indexOfLastRecord = currentPage * recordPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordPerPage;
  const currentRecord = filteredDoctors.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  // console.log(currentRecord);
  const pagination = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber);
    }
  };
  // -------------end---------
  const [doneMessage, setDoneMessage] = useState("d-none");
  const [detailsOfPatient, setDetailsOfPatient] = useState({
    mobileNumber: "",
    bloodType: "",
    patientID: UserIdOfLogin,
    weight: "",
    height: "",
    address: "",
    age: "",
  });
  // console.log(detailsOfPatient);
  function putPatientDetail(e) {
    let MyDetail = { ...detailsOfPatient };
    MyDetail[e.target.name] = e.target.value;
    setDetailsOfPatient(MyDetail);
  }
  async function SendDetailOfUSer(e) {
    e.preventDefault();
    try {
      let { data } = await axios.patch(
        "https://mhiproject.onrender.com/patient/updateProfile",
        detailsOfPatient
      );
      getInfoOfUser();
      setDetailsOfPatient({
        mobileNumber: "",
        bloodType: "",
        patientID: UserIdOfLogin,
        weight: "",
        height: "",
        address: "",
        age: "",
      });
      setDoneMessage("text-center text-muted fs-4 mt-4");
      // console.log(data);
    } catch (error) {}
  }
  const [classOfPateintDeta, setClassOfPateintDeta] = useState("d-none");
  const [activeSection, setActiveSection] = useState(false);

  const toggleSection = () => {
    setActiveSection(!activeSection);
  };
  function closePatientSection() {
    setClassOfPateintDeta("d-none");
    toggleSection();
    setDetailsOfPatient({
      mobileNumber: "",
      bloodType: "",
      patientID: UserIdOfLogin,
      weight: "",
      height: "",
      address: "",
      age: "",
    });
    setDoneMessage("d-none");
  }
  function openPatientDetail() {
    setClassOfPateintDeta("border-b border-gray-900/10 pb-12 container mt-3");
  }
  const [getDetails, setGetDetails] = useState({});
  const [getDetails2, setGetDetails2] = useState();
  // console.log(getDetails);
  async function getInfoOfUser() {
    try {
      let { data } = await axios.get(
        `https://mhiproject.onrender.com/patient/getProfile/${UserIdOfLogin}`
      );
      // console.log(data);
      setGetDetails(data.getProfile);
      setGetDetails2(data.age);
      // console.log("yarab");
    } catch (error) {}
  }
  // getInfoOfUser()
  return (
    <>
      <NewNavbar />
      <div className="bgForPatient "></div>
      <section className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            {/* m3lomat 3n al patient asmo w sno w kda  */}
            <div className="d-flex justify-content-center w-100 mt-5 ">
              <div className="forPatient d-flex flex-row flex-wrap rounded-3 shadow">
                <div className="row gap-1 StyleForSecondPartOfUSerInfo justify-content-end">
                  <div className="col-md-3">
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => {
                          openPatientDetail();
                          toggleSection();
                        }}
                        className="btn btn-primary mt-3"
                      >
                        {" "}
                        تعديل الملف الشخصي{" "}
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mt-4 h-50 w-100 d-flex justify-content-center flex-wrap ">
                      <h2 className="text-right text-muted w-100">
                        البريد الالكترونى
                      </h2>
                      <p className="w-100 text-right mb-3">{UserNameOfLogin}</p>
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <div className="mt-4 w-100 d-flex justify-content-center flex-wrap">
                      <h2 className="text-center text-muted w-100 mb-1">
                        رقم الهاتف
                      </h2>
                      <p className="w-100 text-center mb-1">
                        {getDetails.mobileNumber}
                      </p>
                    </div>
                    <div className=" d-flex justify-content-center flex-wrap">
                      <h2 className="text-center text-muted w-100 mb-1">
                        كود المريض
                      </h2>
                      <p className=" text-center">{code}</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between p-3 StyleOfCardPatient bg-success rounded-3 flex-wrap">
                  <div className="w-25 Rsmabt3tIcon">
                    <img
                      src={IconForUserProfile}
                      alt=""
                      className="w-100 h-100 rounded-3"
                    />
                  </div>
                  <div className="w-75 mt-1 pe-2">
                    <h1 className="text-right  text-white fs-5">{name}</h1>
                    <p className="text-white-50 text-right">
                      سنة {getDetails2}
                    </p>
                  </div>

                  <div className="row mt-3 p-1 gap-2 justify-content-center w-100">
                    <div className="col-md-3">
                      <h1 className="text-white-50 text-center">الطول</h1>
                      <p className="text-white text-center">
                        {getDetails.height}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <h1 className="text-white-50 text-center">الوزن</h1>
                      <p className="text-white text-center">
                        {getDetails.weight}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <h1 className="text-white-50 text-center">فصيلة الدم</h1>
                      <p className="text-white text-center">
                        {getDetails.bloodType}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------ end ----------------- */}
            {/* lma ydos 3la t3del almlf al45sy hyft7 dy  */}
            <section>
              <div
                className={`position-fixed w-3/5 z-30 top-50 StyleForDisplay translate-middle shadow rounded-3 bg-gray-100 ${
                  activeSection === true ? "active" : ""
                } `}
              >
                <div
                  onClick={closePatientSection}
                  className="position-absolute top-0 end-0 cursor-pointer"
                >
                  <i className="fa-regular fa-circle-xmark text-danger me-2 mt-2 fs-3 "></i>
                </div>
                <div className={classOfPateintDeta}>
                  <h2 className="text-base font-semibold leading-7 text-gray-900 text-end me-5">
                    تفاصيل المستخدم
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 text-end me-5">
                    يمكنك وضع تفاصيل الصفحة الشخصية من هنا{" "}
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="height"
                        className="block text-sm font-medium leading-6 text-gray-900 text-end me-2"
                      >
                        الطول
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="height"
                          id="height"
                          value={detailsOfPatient.height}
                          autoComplete="given-name"
                          className="block w-full text-right pr-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={putPatientDetail}
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="weight"
                        className="block text-sm font-medium leading-6 text-gray-900 text-end me-2"
                      >
                        الوزن
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="weight"
                          id="weight"
                          value={detailsOfPatient.weight}
                          autoComplete="family-name"
                          className="block w-full text-right pr-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={putPatientDetail}
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="bloodType"
                        className="block text-sm font-medium leading-6 text-gray-900 text-center"
                      >
                        فصيلة الدم
                      </label>
                      <div className="mt-2">
                        <select
                          id="bloodType"
                          name="bloodType"
                          autoComplete="country-name"
                          value={detailsOfPatient.bloodType}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          onChange={putPatientDetail}
                        >
                          <option>O+</option>
                          <option>O-</option>
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="age"
                        className="block text-sm font-medium leading-6 text-gray-900 text-end me-2"
                      >
                        العمر
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="age"
                          id="age"
                          value={detailsOfPatient.age}
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={putPatientDetail}
                        />
                      </div>
                    </div>
                    <div className="col-span-full">
                      <label
                        htmlFor="mobileNumber"
                        className="block text-sm font-medium leading-6 text-gray-900 text-end"
                      >
                        رقم الهاتف
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          name="mobileNumber"
                          id="mobileNumber"
                          value={detailsOfPatient.mobileNumber}
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          onChange={putPatientDetail}
                        />
                      </div>
                    </div>
                  </div>
                  <h1 className={doneMessage}>تم الحفظ</h1>
                  <div className="d-flex justify-content-end gap-4 mt-4">
                    <button
                      onClick={closePatientSection}
                      className="btn btn-light w-2/12"
                    >
                      {" "}
                      الغاء
                    </button>
                    <button
                      onClick={SendDetailOfUSer}
                      className="btn btn-primary w-2/12"
                    >
                      {" "}
                      حفظ
                    </button>
                  </div>
                </div>
              </div>
            </section>
            {/* ----------------------------------------- */}
            <div className="w-100 d-flex justify-content-center">
              <div className="mt-4 shadow forPatient rounded-3 classForHeight position-relative overflow-scroll ">
                <div className="d-flex justify-content-center w-100">
                  <div className="d-flex justify-content-center gap-4 mt-3 shadow rounded-3 py-2 px-3">
                    <p
                      className={`fs-4 cursor-pointer ${
                        activeTab === 1
                          ? "bg-success py-1 px-4 rounded-3 text-white"
                          : "text-muted"
                      }`}
                      onClick={() => {
                        handleClick(1);
                        getWattingBooks();
                      }}
                    >
                      المواعيد المنتظرة
                    </p>
                    <p
                      className={`fs-4 cursor-pointer ${
                        activeTab === 2
                          ? "bg-success py-1 px-4 rounded-3 text-white"
                          : "text-muted"
                      }`}
                      onClick={() => {
                        handleClick(2);
                        getAcceptBooks();
                      }}
                    >
                      المواعيد السابقة
                    </p>
                    <p
                      className={`fs-4 cursor-pointer ${
                        activeTab === 3
                          ? "bg-success py-1 px-4 rounded-3 text-white"
                          : "text-muted"
                      }`}
                      onClick={() => {
                        handleClick(3);
                        getRecords();
                      }}
                    >
                      السجلات الطبية
                    </p>
                  </div>
                </div>
                <div className="position-absolute z-2 mt-4 shadow w-25 rounded text-white bg-success start-50 top-50 translate-middle ">
                  {isLoadingForWatingTime === true ? (
                    <p className="fw-bold text-center p-3  fs-2">
                      {" "}
                      جارى التحميل{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="position-absolute z-2 mt-4 shadow w-25 rounded text-white bg-success start-50 top-50 translate-middle ">
                  {isLoadingForGetAcceptBooks === true ? (
                    <p className="fw-bold text-center p-3 fs-2">
                      {" "}
                      جارى التحميل{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="position-absolute z-2 mt-4 shadow w-25 rounded text-white bg-success start-50 top-50 translate-middle ">
                  {isLoadingForGetRecords === true ? (
                    <p className="fw-bold text-center p-3 fs-2">
                      {" "}
                      جارى التحميل{" "}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                {/* 3rd mwa3ed montzra */}
                <div className="togetTableInMiddle position-absolute z-3 ">
                  {activeTab === 1 ? (
                    <table className="table mt-2 w-11/12">
                      <thead>
                        <tr className="table-success text-right">
                          <th scope="col">كود الطبيب</th>
                          <th scope="col">الساعة</th>
                          <th scope="col">يوم</th>
                          <th scope="col">التخصص</th>
                          <th scope="col">اسم الطبيب</th>
                        </tr>
                      </thead>
                      <tbody className="border rounded-3 text-right">
                        {WattingBooks.length <= 0 || WattingBooks === null ? (
                         <tr>
                           <td className=" text-muted start-80 mt-4 ms-2 p-5 shadow rounded position-absolute z-1 fs-3 fw-bold text-center w-2/6">
                            لا يوجد مواعيد منتظرة
                          </td>
                         </tr>
                        ) : (
                          WattingBooks.map((element, i) => (
                            <tr key={i}>
                            <td> {element.doctorID?.code || "N/A"} </td>
                            <td>{element.time || "N/A"} </td>
                            <td> {element.day ? element.day.slice(0, 10) : "N/A"} </td>
                            <td>{element.doctorID?.specialize?.name || "N/A"} </td>
                            <td> {element.doctorID?.name || "N/A"} </td>
                          </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  {/* -------------------end-------- */}

                  {/* 3rd mwa3ed mkbola  */}

                  {activeTab === 2 ? (
                    <table className="table mt-2 w-11/12">
                      <thead>
                        <tr className="table-success text-right">
                          <th scope="col">كود الطبيب</th>
                          <th scope="col">الساعة</th>
                          <th scope="col">يوم</th>
                          <th scope="col">التخصص</th>
                          <th scope="col">اسم الطبيب</th>
                        </tr>
                      </thead>
                      <tbody className="border rounded-3 text-right">
                        {acceptBooks.length <= 0 || acceptBooks === null ? (
                          <tr>
                            <td className=" text-muted start-80 mt-4 ms-2 p-5 shadow rounded position-absolute z-1 fs-3 fw-bold text-center w-2/6">
                            لا يوجد مواعيد سابقة
                          </td>
                          </tr>
                        ) : (
                          acceptBooks.map((element, i) => (
                            <tr key={i}>
                              <td> {element.doctorID?.code || "N/A"} </td>
                              <td>{element.time || "N/A"} </td>
                              <td> {element.day ? element.day.slice(0, 10) : "N/A"} </td>
                              <td>{element.doctorID?.specialize?.name || "N/A"} </td>
                              <td> {element.doctorID?.name || "N/A"} </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}

                  {/* ------------------------------ */}

                  {/* medical records */}
                  {/* {activeTab === 3 ? (
                    <table className="table mt-4 w-11/12">
                      <thead>
                        <tr className="table-success text-right">
                          <th scope="col">يوم</th>
                          <th scope="col">الدواء و الجرعات</th>
                          <th scope="col">التخصص</th>
                          <th scope="col">اسم الطبيب</th>
                        </tr>
                      </thead>
                      <tbody className="border rounded-3 text-right">
                        {setRecords.length <= 0 || setRecords === null ? (
                          <h2 className="text-muted start-96 mt-5 ms-5 position-absolute z-1 fs-3 fw-bold">
                            لا يوجد سجلات طبية
                          </h2>
                        ) : (
                          setRecords.map((element, i) => (
                            <tr key={i}>
                              <td> {element.date.slice(0, 10)} </td>
                              <td>
                                <div
                                  onClick={() => {
                                    putIToGetDiagnose(i);
                                  }}
                                  className="d-flex justify-content-end"
                                >
                                  <i className="fa-solid fa-info text-muted cursor-pointer"></i>
                                </div>{" "}
                              </td>
                              <td>{element.doctor.specialize.name} </td>
                              <td> {element.doctor.name} </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )} */}
                  {activeTab === 3 ? (
                    <section className="mt-2">
                      <div className="container rounded-3 shadow py-3">
                        <button
                          className="btn btn-success"
                          onClick={toggleDivVisibility}
                        >
                          Filter
                        </button>
                        <div
                          className={` position-relative start-0  ${
                            isDivVisible ? "active" : "hide"
                          }`}
                          style={{
                            transition: "height 0.5s",
                            height: isDivVisible ? 35 : 0,
                          }}
                        >
                          <div
                            className={`d-flex justify-content-evenly ${
                              isDivVisible ? "active" : "d-none"
                            } `}
                          >
                            <input
                              type="text"
                              className=" opacity-75 w-25 text-end form-control"
                              placeholder=" بالتخصص"
                              onChange={(e) =>
                                docSecializeFilter(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <table className="table mt-4 w-11/12">
                          <thead>
                            <tr className="table-success text-right">
                              <th scope="col">يوم</th>
                              <th scope="col">الدواء و الجرعات</th>
                              <th scope="col">التخصص</th>
                              <th scope="col">اسم الطبيب</th>
                            </tr>
                          </thead>
                          <tbody className="border rounded-3 text-right">
                            {currentRecord.length <= 0 ? (
                              <tr>
                                <td
                                  colSpan="4"
                                  className="text-muted text-center fs-3 fw-bold"
                                >
                                  لا يوجد سجلات طبية
                                </td>
                              </tr>
                            ) : (
                              currentRecord.map((element, i) => (
                                <tr key={i}>
                                  <td>{element.date.slice(0, 10)}</td>
                                  <td>
                                    <div
                                      onClick={() => {
                                        putIToGetDiagnose(i);
                                      }}
                                      className="d-flex justify-content-end"
                                    >
                                      <i className="fa-solid fa-info text-muted cursor-pointer"></i>
                                    </div>
                                  </td>
                                  <td>{element.doctor?.specialize?.name}</td>
                                  <td>{element.doctor?.name}</td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                        <div className="d-flex gap-2 justify-content-center w-11/12 mt-4">
                          <button
                            onClick={() => pagination(currentPage - 1)}
                            className="btn btn-primary"
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <span className="mt-2">
                            Page {currentPage} of {totalPage}
                          </span>
                          <button
                            onClick={() => pagination(currentPage + 1)}
                            className="btn btn-primary"
                            disabled={currentPage === totalPage}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </section>
                  ) : (
                    ""
                  )}
                  {/* -------------------------------------- */}

                  {/* ----------------------------- */}
                </div>

                {/* lw mfe4 7aga tt3rd y3rd dy  */}
                {activeTab === null ? (
                  <div className="w-100  mt-16 d-flex justify-content-center">
                    <div className="w-8/12  shadow p-3 text-right rounded-3">
                      <p className="fs-2">
                        الوهم نصف الداء، والاطمئنان نصف الدواء، والصبر أول خطوات
                        الشفاء. في آلام الجسد شفاء للنفس. لا يمكن لأحد أن يطلب
                        الشفاء، ويتذمر من الألم الذي يصاحب الالتئام. ربما الشفاء
                        أحياناً يكون جزءاً من الألم.
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="col-md-2 shadow mt-5 rounded-3 styleForScroll py-4">
            <h3 className="text-right fs-3 mb-3">الاطباء</h3>
            {ShowDoc.map((element, i) => (
              <Link
                to={"/docsearch"}
                key={i}
                className="d-flex justify-content-between mb-3"
              >
                <div className="w-14 h-14 rounded-3 overflow-hidden">
                  <img
                    src={`https://mhiproject.onrender.com/${element.image}`}
                    alt="صورة الطبيب"
                    className="w-100 h-100"
                  />
                </div>
                <div className="p-2 w-75 text-right">
                  <h2>
                    <span>د/</span>
                    {element.name}
                  </h2>
                  <p className="text-right text-muted">
                    {element.specialize.name}
                  </p>
                </div>
              </Link>
            ))}
            {isLoading2 == true ? (
              <p className="fw-bold text-center mt-36 fs-2"> جارى التحميل </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      {/* to show diagnoses  */}
      <div
        className={`styleForPatienDiagnoses shadow-md ${
          activeClass ? "activeCLass" : ""
        } `}
      >
        <i
          className="fa-solid fa-circle-xmark position-absolute top-1 end-3 fs-4 text-danger cursor-pointer"
          onClick={closeDiagnoseSection}
        ></i>
        <div className="container">
          <div className="row  gap-5 justify-content-center align-items-center">
            <div className="col-md-5 border mt-5 rounded py-2">
              <h2 className="text-center mt-4 fs-3"> الجرعات </h2>

              {activeIndex !== null &&
              getDiagnose[activeIndex] &&
              getDiagnose[activeIndex].length > 0 ? (
                getDiagnose[activeIndex].map((element, i) => (
                  <p key={i} className="text-end mt-4 text-muted">
                    {element.description}
                  </p>
                ))
              ) : (
                <p className="text-center fw-bold fs-4 mt-5"> لا يوجد جرعات </p>
              )}
            </div>
            <div className="col-md-5 border mt-5 rounded py-2">
              <h2 className="text-center mt-4 fs-3">أسماء الأدوية</h2>
              {activeIndex !== null &&
              getDiagnose[activeIndex] &&
              getDiagnose[activeIndex].length > 0 ? (
                getDiagnose[activeIndex].map((element, i) => (
                  <p key={i} className="text-end mt-4 text-muted">
                    {element.medicine}
                  </p>
                ))
              ) : (
                <p className="text-center fw-bold fs-4 mt-5"> لا يوجد أدوية </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile;
