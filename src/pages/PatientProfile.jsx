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
  const name = localStorage.getItem("patientName");
  const UserNameOfLogin = decodedToken.email;
  const UserIdOfLogin = decodedToken.userId;
  // console.log(UserIdOfLogin);
  // --------------end----------------
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [activeTab, setActiveTab] = useState(null);
  const handleClick = (tabNumber) => {
    if (activeTab === tabNumber) {
      setActiveTab(null);
    } else {
      setActiveTab(tabNumber);
    }
  };
  useEffect(() => {
    if (activeTab === null) {
      setIsLoading(false);
    } else if (
      WattingBooks.length <= 0 ||
      acceptBooks.length <= 0 ||
      setRecords.length <= 0
    ) {
      setIsLoading(true);
    }
  }, [activeTab, isLoading]);
  // fetch kol aldoctors

  const [ShowDoc, setShowDoc] = useState([]);
  useEffect(() => {
    GetDoc();
    getInfoOfUser()
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
      setIsLoading(false);
    } catch (error) {}
  }

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
      setIsLoading(false);
    } catch (error) {}
  }

  // -------------end---------
  // to get records
  const [setRecords, setSetRecords] = useState([]);
  // console.log(setRecords);
  async function getRecords() {
    try {
      let { data } = await axios(
        `https://mhiproject.onrender.com/patient/getRecords/${UserIdOfLogin}`
      );
      // console.log(data);
      setSetRecords(data);
      setIsLoading(false);
    } catch (error) {}
  }

  // -------------end---------
 const [doneMessage,setDoneMessage] = useState("d-none")
  const [detailsOfPatient , setDetailsOfPatient] = useState({
    mobileNumber: "",
    bloodType: "",
    patientID: UserIdOfLogin,
    weight: "",
    height: "",
    address: "",
  })
  // console.log(detailsOfPatient);
  function putPatientDetail(e) {
    let MyDetail = {...detailsOfPatient}
    MyDetail[e.target.name] = e.target.value
    setDetailsOfPatient(MyDetail)
  }
  async function SendDetailOfUSer(e) {
    e.preventDefault();
    try{
      let {data} = await axios.patch("https://mhiproject.onrender.com/patient/updateProfile" , detailsOfPatient)
      getInfoOfUser()
      setDetailsOfPatient({
        mobileNumber: "",
      bloodType: "",
      patientID: UserIdOfLogin,
      weight: "",
      height: "",
      address: "",
      })
      setDoneMessage("text-center text-muted fs-4 mt-4")
      // console.log(data);
    } catch(error){

    }
  }
  const [classOfPateintDeta ,setClassOfPateintDeta] = useState("d-none")
  const [activeSection, setActiveSection] = useState(false);

  const toggleSection = () => {
    setActiveSection(!activeSection);
  }; 
  function closePatientSection() {
    setClassOfPateintDeta("d-none")
    toggleSection()
    setDetailsOfPatient({
      mobileNumber: "",
    bloodType: "",
    patientID: UserIdOfLogin,
    weight: "",
    height: "",
    address: "",
    })
    setDoneMessage("d-none")
  }
  function openPatientDetail() {
    setClassOfPateintDeta("border-b border-gray-900/10 pb-12 container mt-3")
  }
  const [getDetails ,setGetDetails] = useState({});
  async function getInfoOfUser() {
    try{
      let {data} = await axios.get(`https://mhiproject.onrender.com/patient/getProfile/${UserIdOfLogin}`)
      // console.log(data);
      setGetDetails(data)
      // console.log("yarab");
    } catch(error){

    }
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
                   <div className="d-flex justify-content-center" >
                   <button onClick={()=>{
                    openPatientDetail();
                    toggleSection()
                   }} className="btn btn-primary mt-3"> تعديل الملف الشخصي </button>
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
                      <p className="w-100 text-center mb-1">{getDetails.mobileNumber}</p>
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
                    <p className="text-white-50 text-right">25 سنة</p>
                  </div>

                  <div className="row mt-3 p-1 gap-2 justify-content-center w-100">
                    <div className="col-md-3">
                      <h1 className="text-white-50 text-center">الطول</h1>
                      <p className="text-white text-center">{getDetails.height}</p>
                    </div>
                    <div className="col-md-3">
                      <h1 className="text-white-50 text-center">الوزن</h1>
                      <p className="text-white text-center">{getDetails.weight}</p>
                    </div>
                    <div className="col-md-4">
                      <h1 className="text-white-50 text-center">فصيلة الدم</h1>
                      <p className="text-white text-center">{getDetails.bloodType}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ------------------------------------ end ----------------- */}
            {/* lma ydos 3la t3del almlf al45sy hyft7 dy  */}
            <section >
              <div className={`position-fixed w-3/5  top-50 StyleForDisplay translate-middle shadow rounded-3 bg-white ${activeSection === true ? "active":""} `}>
                {/* <div onClick={closePatientSection} className="position-absolute top-0 end-0 cursor-pointer">
                <i className="fa-regular fa-circle-xmark text-danger me-2 mt-2 fs-3 "></i>
                </div> */}
                <div className={classOfPateintDeta}>
          <h2 className="text-base font-semibold leading-7 text-gray-900 text-end me-5">تفاصيل المستخدم</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-end me-5">يمكنك وضع تفاصيل الصفححة الشخصية من هنا </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900 text-end me-2">
                الطول 
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="height"
                  id="height"
                  value={detailsOfPatient.height}
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={putPatientDetail}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900 text-end me-2">
                الوزن
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  value={detailsOfPatient.weight}
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={putPatientDetail}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="bloodType" className="block text-sm font-medium leading-6 text-gray-900 text-end w-75">
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

            <div className="col-span-full">
              <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900 text-end">
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
            <button onClick={closePatientSection} className="btn btn-light w-2/12"> الغاء</button>
            <button onClick={SendDetailOfUSer} className="btn btn-primary w-2/12"> حفظ</button>
          </div>
        </div>

              </div>
            </section>
            {/* ----------------------------------------- */}
            <div className="w-100 d-flex justify-content-center">
              <div className="mt-4 shadow forPatient rounded-3 classForHeight">
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
                {isLoading === true ? (
                  <p className="fw-bold text-center mt-5 fs-2">
                    {" "}
                    جارى التحميل{" "}
                  </p>
                ) : (
                  ""
                )}
                {/* 3rd mwa3ed montzra */}
                <div className="w-100 d-flex justify-content-center">
                  {activeTab === 1 ? (
                    <table className="table mt-4 w-11/12">
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
                        {WattingBooks.map((element, i) => (
                          <tr key={i}>
                            <td> {element.doctorID.code} </td>
                            <td>{element.time} </td>
                            <td> {element.day.slice(0, 10)} </td>
                            <td>{element.doctorID.specialize.name} </td>
                            <td> {element.doctorID.name} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  {/* -------------------end-------- */}

                  {/* 3rd mwa3ed mkbola  */}

                  {activeTab === 2 ? (
                    <table className="table mt-4 w-11/12">
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
                        {acceptBooks.map((element, i) => (
                          <tr key={i}>
                            <td> {element.doctorID.code} </td>
                            <td>{element.time} </td>
                            <td> {element.day.slice(0, 10)} </td>
                            <td>{element.doctorID.specialize.name} </td>
                            <td> {element.doctorID.name} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}

                  {/* ------------------------------ */}

                  {/* medical records */}
                  {activeTab === 3 ? (
                    <table className="table mt-4 w-11/12">
                      <thead>
                        <tr className="table-success text-right">
                          <th scope="col"> كود الطبيب</th>
                          <th scope="col">يوم</th>
                          <th scope="col"> الجرعات</th>
                          <th scope="col">الدواء</th>
                          <th scope="col">التخصص</th>
                          <th scope="col">اسم الطبيب</th>
                        </tr>
                      </thead>
                      <tbody className="border rounded-3 text-right">
                        {setRecords.map((element, i) => (
                          <tr key={i}>
                            <td>{element.doctor.code}</td>
                            <td> {element.date.slice(0, 10)} </td>
                            <td>{element.diagnose} </td>
                            <td>{element.medicine} </td>
                            <td>{element.doctor.specialize.name} </td>
                            <td> {element.doctor.name} </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  {/* -------------------------------------- */}

                  {/* lw mfe4 7aga tt3rd y3rd dy  */}
                  {activeTab === null ? (
                    <div className="w-100  mt-16 d-flex justify-content-center">
                      <div className="w-8/12 shadow p-3 text-right rounded-3">
                        <p className="fs-2">
                          الوهم نصف الداء، والاطمئنان نصف الدواء، والصبر أول
                          خطوات الشفاء. في آلام الجسد شفاء للنفس. لا يمكن لأحد
                          أن يطلب الشفاء، ويتذمر من الألم الذي يصاحب الالتئام.
                          ربما الشفاء أحياناً يكون جزءاً من الألم.
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* ----------------------------- */}
                </div>
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
                  <img src={`https://mhiproject.onrender.com/${element.image}`} alt="صورة الطبيب" className="w-100 h-100" />
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
    </>
  );
}

export default PatientProfile;