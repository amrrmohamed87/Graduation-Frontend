import React, { useEffect, useState } from "react";
import "../css/Search.css";
import Footer from "../components/Footer";
import SearchPhoto from "../assets/images/search.jpg";
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
    // const [error2, setError2] = useState('');
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
        let { data } = await axios.get('https://mhiproject.onrender.com/patient/getDoctors')
        setDocData(data.userD)
        if (data.userD == null) {
            setErrorGetDoc("text-center fs-1")
        }
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
        let { data } = await axios.post("https://mhiproject.onrender.com/patient/search", searchUser)
        setShowResult(data.search)
        if (data.search == null) {
            setErrorForSearch("text-center fs-1 mt-5")
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
            if (error.data && error.data.status === 404) {
                setError('يرجى اختيار موعد حجز أخر');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            } else {
                setError('يرجى المحاولة لاحقا');
                setErrorButton("btn btn-success me-5")
                setClassOfError("text-center fs-5 text-danger")
            }

            if (error.data && error.data.status === 400) {
                setError('يرجى ادخال بيانات صحيحة ');

            } else {
                setError('يرجى ادخال بيانات صحيحة ');
            }
        }
        }
        function BackStep() {
            setSureBookSection("d-none")
            setClassName("position-fixed z-3 secBook rounded-5 shadow-lg bg-white")
            setErrorButton("d-none")
            setClassOfError("d-none")
        }

        return (
            <>
                <header className="relative h-screen w-full ">
                    <div className=" w-full h-screen">
                        <img src={SearchPhoto} className="object-cover object-center h-screen w-full" />
                    </div>
                    <div className="absolute inset-0 bg-black opacity-80"></div>
                    <div className="absolute inset-1 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
                        <h2 className="text-white text-[80px]"> البحث </h2>
                        <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50"> توفير معرفة أعمق تساعد الأشخاص في جميع المعلومات التي يحتاجونها </p>
                    </div>
                </header>
                {/* section alsearch */}
                <section className='py-8 UnderLineBetweenSection position-relative'>
                    <div className='container'>
                        <div className='flex flex-row flex-wrap justify-content-evenly justify-content-center align-items-center text-center'>
                            <div className=' w-100 justify-content-center d-flex'>
                                <div className="w-50 ">
                                    <h2 className="text-black text-[80px] mb-3"> الأطباء </h2>
                                    <form className="input-group mb-3">
                                        <button className="btn btn-outline-secondary" type="button" onClick={submitSearch}>ابحث</button>
                                        <input type="text" className="form-control text-right " onChange={searchForDoctor} placeholder=".....بحث باسم الدكتور" name='name' />
                                        <input type="text" className="form-control text-right " onChange={searchForDoctor} placeholder=".....بحث بالتخصص" name='specialize' />
                                    </form>
                                </div>
                            </div>
                            <h1 className={errorForSearch}>No input please write name or specialize</h1>
                            {/* this div for result of the search  */}
                            {showResult == null ? <div className="alert alert-danger text-center text-lg-center">not found</div> : showResult.map((element, i) => <div key={i} className=' w-25 mt-4 text-right p-4 border-3 border-success rounded-4'>
                                <h2 className="text-center fs-1 text-muted">د/{element.name}  </h2>
                                <p className="mt-2 md:mt-0 fs-4 text-muted"><span className="fs-3 text-black"></span>{element.specialize} : <i class="fa-solid text-success fs-5 fa-stethoscope"></i></p>
                                <p className="mt-2 md:mt-0 fs-4 text-muted"> {element.hospitalID?.name} : <i class=" fa-solid text-success fs-5 fa-truck-medical"></i> </p>
                                <div className="d-flex justify-content-center"> <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn w-100 bg-success text-white border-3">احجز الان</button></div>
                            </div>)}

                        </div>
                    </div>
                </section>
                {/* section get doctors */}
                <section className='py-8'>
                    <div className="container">
                        <div className="row py-3 gap-3 justify-content-center">
                            <h1 className={errorGetDoc}>جارى التحميل</h1>
                            {DocData.map((element, i) => <div key={i} className="col-md-3 rounded-4 border-4 mt-3">
                                <div className='py-3 text-end'>
                                    <h1 className='text-center fs-2 mb-2 text-[#056558]'>د/ {element.name}</h1>
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


                            {/* <label htmlFor="doctorID" className="me-3 d-block col-form-label fs-2 text-end">
                            : اسم المستشفى
                        </label>
                        <h1 className="text-xxl-center fs-3 ">   </h1> */}
                            {/* <p className="text-center text-danger fs-5">{error2}</p> */}
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
                <Footer />
            </>
        )
    }
