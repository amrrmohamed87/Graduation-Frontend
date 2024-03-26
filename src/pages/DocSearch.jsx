import React, { useEffect, useState } from "react";
import "../css/Search.css";
import Footer from "../components/Footer";
import SearchPhoto from "../assets/images/search.jpg";
import firstSectionPhoto from "../assets/images/Concept Médical Médecin Et Patient Dans La Salle Intérieure De L'hôpital _ Vecteur Premium.jfif"
import secondSectionPhoto from "../assets/images/Download Cardiologists Doctor Pointing at Heart Diagram for free.jfif"
import BookingSectionPhoto from "../assets/images/book-doctor-appointment-card-template_151150-11155.avif"
import axios from "axios";
import { jwtDecode } from "jwt-decode";
// import { data } from "autoprefixer";
export function DocSearch() {
    const Token = localStorage.getItem('token');
    const decodedToken = jwtDecode(Token);
    // name of user 
    const UserNameOfLogin = decodedToken.email
    const UserIdOfLogin = decodedToken.userId
    // -------------------------------------------------
    let [searchUser, setSearchUser] = useState({
        name: "",
        specialize: "",
    })
    const [sureBookSection, setSureBookSection] = useState("d-none");
    const [ClassNamee, setClassName] = useState("d-none position-fixed z-1 secBook rounded-5 shadow-lg bg-white");
    // -----------------------------new Code ------------------------
    const [showDivSearch, setShowDivSearch] = useState('d-none')
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [showDiv, setShowDiv] = useState(false);
    const [showDiv2, setShowDiv2] = useState(false);
    // -----------------------------new code ------------------------
    let [DocData, setDocData] = useState([])
    let [showResult, setShowResult] = useState([])
    let [docDetail, setDocDetail] = useState({
        name: "",
        id: ''
    })
    let [errorGetDoc, setErrorGetDoc] = useState("d-none")
    let [errorForSearch, setErrorForSearch] = useState("d-none")
    let [errorButton, setErrorButton] = useState("d-none")
    let [trueBook, setTrueBook] = useState("d-none")
    const [error, setError] = useState('');
    const [classOfError, setClassOfError] = useState("text-center fs-5 text-danger")
    let [BookTime, setBookTime] = useState({
        day: "",
        time: "",
        patientID: UserIdOfLogin,
        doctorID: docDetail.id,
    })
    useEffect(() => {
        getDoctors()
    }, [])
    function closeTrueBook() {
        setTrueBook("d-none")
    }
    function closeBookSection() {
        // let newBook = { ...BookTime, day: "", time: "" };
        // setBookTime(newBook)
        // console.log(newBook);
        setClassName("d-none");
    }
    async function getDoctors() {
        try {
            let { data } = await axios.get('https://mhiproject.onrender.com/patient/getDoctors')
            setDocData(data.userD)
        } catch (errorGetDoc) {
            if (errorGetDoc.data.status === 404) {
                setErrorGetDoc("text-center fs-1")
            } else {
                setErrorGetDoc("text-center fs-1")
            }
        }

        // if (sdata.userD == null) {
        //     setErrorGetDoc("text-center fs-1")
        // }
    }
    function searchForDoctor(e) {
        let MyUser = { ...searchUser }
        MyUser[e.target.name] = e.target.value
        setSearchUser(MyUser)
    }
    function HideSureBoook() {
        setSureBookSection("d-none")
    }
    async function submitSearch(e) {
        e.preventDefault()
        try {
            let { data } = await axios.post("https://mhiproject.onrender.com/patient/search", searchUser)
            setShowResult(data.search)
        } catch (errorForSearch) {
            if (errorForSearch.data.search === 404) {
                setErrorForSearch("text-center fs-1 mt-5")
            } else {
                setErrorForSearch("text-center fs-1 mt-5")
            }
        }


    }
    function ShowBookSection(IDdoc, DocName) {
        setClassName(" position-fixed z-3 secBook rounded-5 shadow-lg bg-white")
        setDocDetail({
            name: DocName,
            id: IDdoc
        })
    }

    function setBookForPatient(e) {
        let myBook = { ...BookTime }
        myBook[e.target.name] = e.target.value
        setBookTime(myBook)
    }
    function FirstSubmitBook(IdDoc) {
        setBookTime({
            ...BookTime,
            doctorID: IdDoc
        }
        )
        setClassName("d-none")
        setSureBookSection("position-fixed w-50 sureBook bg-white rounded-5 shadow-lg")
    }
    async function submitBook(e) {
        e.preventDefault()

        try {
            let { data } = await axios.post("https://mhiproject.onrender.com/patient/book", BookTime)
            // setClassName("d-none")
            setSureBookSection("d-none")
            setTrueBook("w-50 position-fixed secBook2 rounded-5 shadow-lg bg-white d-flex flex-wrap")
        } catch (error) {
            if (error.data && error.data.status === 406) {
                setError('يرجى اختيار موعد حجز أخر');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            } else {
                setError('يرجى اختيار موعد حجز أخر');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            }
            if (error.data && error.data.status === 400) {
                setError('يرجى ادخال بيانات صحيحة ');

            } else {
                setError('يرجى ادخال بيانات صحيحة ');
            }
            if (error.data && error.data.status === 404) {
                setError('يرجى اختيار موعد حجز أخر');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            } else {
                setError('يرجى المحاولة لاحقا');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            }


        }
    }
    function BackStep() {
        setSureBookSection("d-none")
        setClassName("position-fixed z-3 secBook rounded-5 shadow-lg bg-white")
        setErrorButton("d-none")
        setClassOfError("d-none")
    }
    // ---------------------new code-----------------
    function showSectionSearch() {
        setShowDivSearch('container position-relative mb-5 mt-5')
    }
    function CloseSectionSearch() {
        setShowDivSearch('d-none')
    }
    const toggleDivPosition = () => {
        if (!isSearchActive) {
            setShowDivSearch('searchSection active');
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
    const [hospitalsInfo, setHospitalsInfo] = useState([])
    const [classShowResultOfhospi, setclassShowResultOfhospi] = useState("d-none")
    // const [hospitalSearchValue, sethospitalSearchValue] = useState({
    //     hospitalID: '',
    // })
    const [ShowResultFromHospi, setShowResultFromHospi] = useState([])
    useEffect(() => {
        getHospitals()
    }, [])
    async function getHospitals() {
        let { data } = await axios.get("https://mhiproject.onrender.com/patient/getHospitals")
        setHospitalsInfo(data.findHospitals)
    }
    // function getHospitalID(hospiID) {
    //     sethospitalSearchValue({
    //         ...hospitalSearchValue,
    //         hospitalID: hospiID
    //     })
    // }
    async function searchDocINHospi(hospiID) {
        try {
            let { data } = await axios.post("https://mhiproject.onrender.com/patient/searchHospital", { hospitalID: hospiID });
            setShowResultFromHospi(data.searchName);
            setclassShowResultOfhospi("container shadow rounded-4 HightForSlidedown position-relative styleScrollOfHospitalSection overflow-scroll mt-5")
            console.log(data.searchName);
        } catch (error) {
            console.error("Error searching for hospital:", error);
        }
    }
    function closeHospitalSection() {
        setclassShowResultOfhospi("d-none")
    }

    // ----------------------------------
    return (
        <>
            <header className="relative h-screen w-full ">
                <div className=" w-full h-screen">
                    <img src={SearchPhoto} className="object-cover object-center h-screen w-full" />
                </div>
                <div className="absolute inset-1 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
                </div>
            </header>
            {/* da section al7gz */}
            <section>
                <div className={ClassNamee}>
                    <p className="text-center UnderLineAfterP fs-1 mt-4">أحجز الأن</p>
                    <form className="py-3">
                        <div className="container py-5">
                            <div className="row justify-content-evenly">
                                <div className="col-md-5 mt-5">
                                    <div className="d-flex gap-3 py-3 flex-row justify-content-center">
                                        <h1 className="fs-3"> {UserNameOfLogin}</h1>
                                        <label htmlFor="patientID" className="me-3 text-success fs-2 text-end">
                                            : اسم المريض
                                        </label>
                                    </div>
                                    <div className="d-flex gap-3 py-3 flex-row justify-content-center">
                                        <h1 className="fs-3">{docDetail.name}</h1>
                                        <label htmlFor="doctorID" className="me-3 text-success fs-2 text-end">
                                            : اسم الدكتور
                                        </label>
                                    </div>


                                </div>
                                <div className="col-md-5">
                                    <p className="text-center fs-3 py-2">أختر التاريخ و الوقت</p>
                                    <div className="d-flex justify-content-center">
                                        <input onChange={setBookForPatient} name="day" type="date" className="form-control w-50 border-success border-3"></input>
                                    </div>

                                    <div className="container d-flex justify-content-center">
                                        <div className="d-flex toChangeStyleTime overflow-scroll position-relative justify-content-center border-3 border-success py-3 rounded-3">
                                            <div className="position-absolute ">
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className=" form-control w-100" name="time" value={"8:00"} />
                                                </div>
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"8:15"} />
                                                </div>
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"8:30"} />
                                                </div>
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"8:45"} />
                                                </div>
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"9:00"} />
                                                </div>
                                                <div>
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"9:15"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"9:30"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"9:45"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"10:00"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"10:15"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"10:30"} />
                                                </div>
                                                <div className=" ">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100 mt-3" name="time" value={"10:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"11:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"11:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"11:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"11:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"12:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"12:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"12:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"12:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"13:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"13:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"13:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"13:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"14:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"14:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"14:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"14:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"15:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"15:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"15:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"15:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"16:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"16:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"16:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"16:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"17:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"17:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"17:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"17:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"18:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"18:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"18:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"18:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"19:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"19:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"19:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"19:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"20:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"20:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"20:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"20:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"21:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"21:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"21:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"21:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"22:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"22:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"22:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"22:45"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"23:00"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"23:15"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"23:30"} />
                                                </div>
                                                <div className=" mt-3">
                                                    <input onClick={setBookForPatient} type="button" className="form-control w-100" name="time" value={"23:45"} />
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="d-flex mt-4 justify-content-center gap-5">
                            <button onClick={() => FirstSubmitBook(docDetail.id)} type="button" className="btn btn-success text-black  ">احجز الان</button>
                            <button onClick={() => closeBookSection()} type="button" className="btn btn-danger text-black ">اغلاق</button>
                        </div>
                    </form>
                </div>
            </section>
            {/* تاكيييد الحجز  */}
            <section className={sureBookSection}>
                <p className="text-center fs-1 mt-4 position-relative wordSureBook">تأكيد الحجز</p>
                <div className="container py-5">
                    <div className="row gap-1 justify-content-evenly">
                        <div className="col-md-5 d-flex">
                            <p className="text-right fs-4 me-3 text-success">Patient :</p>
                            <p className="fs-5 text-right"> {UserNameOfLogin} </p>
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
                            <p className="fs-5 text-right"> {BookTime.time}  </p>
                        </div>
                    </div>
                </div>
                <p className={classOfError}>{error}</p>
                <div className="d-flex justify-content-center py-3">
                    <button onClick={submitBook} className="btn btn-success me-5">تأكيد الحجز</button>
                    <button onClick={BackStep} className={errorButton}>الرجوع للصفحة السابقة </button>
                    <button onClick={HideSureBoook} className="btn btn-danger">الغاء الحجز</button>
                </div>
            </section>
            {/* تم الحجز بنجاااح  */}
            <div className={trueBook}>
                <h1 className="fs-1 w-100  text-center">تم الحجز بنجاح </h1>
                <button onClick={() => closeTrueBook()} type="button" className="btn btn-danger text-black ms-3 ">اغلاق</button>
            </div>
            {/* ------------------------------------------------- */}
            <section className="container mt-5">
                <div className="row  justify-content-center">
                    <div className="col-md-5 layerfixed rounded-4 position-relative">
                        <img src={firstSectionPhoto} alt="" className="w-75 h-100 rounded-4 shadow position-absolute layerGoUp z-2" />
                    </div>
                    <div className="col-md-5 position-relative rounded-4 shadow p-4">
                        <div className="d-flex flex-wrap w-100 justify-content-end">
                            <h1 className="text-end fs-1 mb-4"> أختر الدكتور المناسب</h1>
                            <i className="fa-solid fs-3 text-success opacity-75 fa-magnifying-glass mt-2 ms-2"></i>
                        </div>
                        <p className="text-end fs-4 text-muted mb-5"> يوجد جميع التخصصات نتيح لكم أن تبحثوا بالأسم و التخصص واجبنا أن نسهل عليكم جميع الخدمات</p>
                        <button onClick={showSectionSearch} type="button" className="position-absolute btn text-white bg-success mb-3 start-25 bottom-0"> ابحث الان
                        </button>
                    </div>

                </div>
            </section>
            {/* section search and response of search  */}
            <section className={showDivSearch}>

                <button onClick={CloseSectionSearch} className="btn btn-close position-absolute fs-5 end-0"></button>
                <form className="mt-5">
                    <div className='d-flex w-100 justify-content-center '>
                        <button onClick={(e) => {
                            submitSearch(e);
                            toggleDivPosition()
                        }} type='button' className='btn btn-info rounded-5'>
                            <i className="fa-solid fs-3 text-info fa-magnifying-glass"></i>
                        </button>
                        <input type="text" className='w-25 form-control text-end  rounded-5' onChange={searchForDoctor} placeholder=".....بحث باسم الدكتور" name='name' />
                        <input type="text" className='w-25 form-control text-end  rounded-5' onChange={searchForDoctor} placeholder=".....بحث بالتخصص" name='specialize' />
                    </div>
                </form>
                {/* result of search */}
                <h1 className={errorForSearch}>No input please write name or specialize</h1>
                {showResult == null ? <div className="alert alert-danger text-center text-lg-center">not found</div> : <div className={`d-flex justify-content-center mt-3 flex-wrap gap-3 overflow-scroll w-100 searchSection position-relative ${isSearchActive ? 'active' : ''}`}
                > {showResult.map((element, i) => <div key={i} className=' w-25 mt-4 text-right p-4 border-3 border-success rounded-4'>
                    <h2 className="text-center fs-3 text-muted">د/{element.name}  </h2>
                    <p className="mt-2 md:mt-0 fs-4 text-muted"><span className="fs-3 text-black"></span>{element.specialize} : <i class="fa-solid text-success fs-5 fa-stethoscope"></i></p>
                    <p className="mt-2 md:mt-0 fs-4 text-muted"> {element.hospitalID?.name} : <i className=" fa-solid text-success fs-5 fa-truck-medical"></i> </p>
                    <div className="d-flex justify-content-center"> <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn mt-3 w-100 bg-success text-white border-3">احجز الان</button></div>
                </div>)}
                </div>
                }
            </section>
            {/* section Get doctors */}
            <section className="mt-5 z-2 HightForSlidedown position-relative overflow-hidden">
                <div className="container  mt-5 d-flex flex-wrap justify-content-center">
                    <div className="w-75 shadow rounded-4 p-4">
                        <h1 className="fs-4 text-center">يمكنك بسهوله عرض جميع الأطباء بالضغط على هذا الزر</h1>
                        <div className="w-100 d-flex gap-5 justify-content-center mt-5">
                            <button type="button" onClick={() => {
                                toggleDivPosition2()
                                toggleDivPosition3()
                            }} className="btn text-white bg-success">أعرض الأطباء</button>
                            <button type="button" onClick={() => {
                                toggleDivPosition2()
                                toggleDivPosition3()

                            }} className="btn text-white bg-success">أخفاء الأطباء</button>
                        </div>
                    </div>
                    <img src={secondSectionPhoto} className={`position-absolute StyleSoraGetSection rounded-4 ${showDiv ? 'active' : ''}`} alt="sora" />
                    <div className={`w-75 shadow rounded-4 z-3 bottom-0  d-flex flex-wrap justify-content-around gap-4 position-absolute overflow-scroll styleOfBoxGetUsers ${showDiv ? 'active' : ''}`}>
                        <h1 className={errorGetDoc}>جارى التحميل</h1>
                        {DocData.map((element, i) => <div key={i} className="widthForDivInGetUser rounded-4 border-4 mt-3">
                            <div className='py-3 text-end'>
                                <h1 className='text-center fs-3 mb-2 text-[#056558]'>د/ {element.name}</h1>
                                <h3 className='fs-3 mb-2'>{element.specialize} : <i className="fa-solid text-success fs-5 fa-stethoscope"></i>  </h3>
                                <div className="d-flex gap-2 flex-row justify-content-end">
                                    <h6 className='fs-5'>  {element.hospitalID?.name} : </h6>
                                    <i className=" fa-solid text-success fs-5 fa-truck-medical"></i>
                                </div>
                                <div className="d-flex mt-3 justify-content-center">
                                    <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn bg-success  w-100 text-white border-3">احجز الان</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            {/* section Booking */}
            <section>
                <div className="container mt-5">
                    <div className="d-flex justify-content-evenly">
                        <div className="w-25 shadow rounded-4">
                            <img src={BookingSectionPhoto} alt="sa" className="rounded-4" />
                        </div>
                        <div className="w-50 shadow rounded-4 p-4 text-end">
                            <h1 className="text-end fs-1">يمكنك حجز موعد</h1>
                            <p className="text-end mt-3 fs-4"> من خلال الضغط على اسم المستشفى سيتم عرض جميع الاطباء و تخصصاتهم المتاحين بها .</p>
                            <i className="fa-solid fa-arrow-down text-success fs-5 mt-3  "><span className="fs-5 ms-2 text-black fw-medium">المستشفيات المتاحة <i className="fa-regular fa-hospital text-success"></i></span></i>

                            <div className="d-flex gap-3 justify-content-evenly">
                                {hospitalsInfo.map((element, i) => <h1 key={i} onClick={() => {
                                    // getHospitalID(element._id);
                                    searchDocINHospi(element._id);
                                }} className="w-25 mt-5 p-1 rounded-3 text-center border-2 buttonOnBooking  border-success">{element.name}</h1>)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classShowResultOfhospi}>
                    <div className="w-100 d-flex justify-content-end">
                        <i onClick={closeHospitalSection} className="fa-regular fa-circle-xmark text-end  p-2 fs-3 text-success styleOFCloseCircleInHospital"></i>
                    </div>
                    <div className="d-flex  position-absolute start-0 end-0 gap-2 flex-wrap justify-content-evenly">
                        {ShowResultFromHospi.map((element, i) => <div key={i} className="w-25 rounded-4 border-4 mt-3">
                            <div className='py-3 text-end'>
                                <h1 className='text-center fs-3 mb-2 text-[#056558]'>د/ {element.name}</h1>
                                <h3 className='fs-3 mb-2'> {element.specialize} : <i className="fa-solid text-success fs-5 fa-stethoscope"></i>  </h3>
                                <div className="d-flex mt-3 justify-content-center">
                                    <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn bg-success  w-100 text-white border-3">احجز الان</button>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}
