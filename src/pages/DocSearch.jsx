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
    const [ClassNamee, setClassName] = useState("d-none w-50 position-fixed z-1 secBook rounded-5 shadow-lg bg-white");
    let [DocData, setDocData] = useState([])
    let [showResult, setShowResult] = useState([])
    let [docDetail, setDocDetail] = useState({
        name: "",
        id: ''
    })
console.log(docDetail.id);
    let [errorForSearch, setErrorForSearch] = useState("d-none")
    let [trueBook, setTrueBook] = useState("d-none")
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
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
        setClassName("d-none");
    }
    async function getDoctors() {
        let { data } = await axios.get('https://mhiproject.onrender.com/patient/getDoctors')
        setDocData(data.userD)
    }
    function searchForDoctor(e) {
        let MyUser = { ...searchUser }
        MyUser[e.target.name] = e.target.value
        setSearchUser(MyUser)
    }
    async function submitSearch(e) {
        e.preventDefault()
        let { data } = await axios.post("https://mhiproject.onrender.com/patient/search", searchUser)
        setShowResult(data.search)
        console.log(data.search == null);
        if (data.search == null) {
            setErrorForSearch("text-center fs-1 mt-5")
        }

    }
    function ShowBookSection(IDdoc, DocName) {
        setClassName("w-50 position-fixed z-3 secBook rounded-5 shadow-lg bg-white")
        setDocDetail({
            name:DocName,
            id:IDdoc
        })
    }

    function setBookForPatient(e) {
        let myBook = { ...BookTime }
        myBook[e.target.name] = e.target.value
        setBookTime(myBook)
        console.log(myBook);
    }
    async function submitBook(e,IdDoc) {
        e.preventDefault()
        setDocDetail({
            id: IdDoc,
        }
        )
        console.log(docDetail.id);
        try {
            let { data } = await axios.post("https://mhiproject.onrender.com/patient/book", BookTime)
            setClassName("d-none")
            setTrueBook("w-50 position-fixed secBook2 rounded-5 shadow-lg bg-white d-flex flex-wrap")
        } catch (error) {
            if (error.data && error.data.status === 406) {
                setError('يرجى اختيار موعد حجز اخر');
            } else {
                setError('يرجى اختيار موعد حجز اخر');
            }

            if (error.data && error.data.status === 400) {
                setError2('يرجى المحاولة مره اخرى');

            } else {
                setError2('يرجى المحاولة مره اخرى');
            }

        }
    }
    return (
        <>
            <header className="relative h-screen w-full ">
                <div className=" w-full h-screen">
                    <img src={SearchPhoto} className="object-cover object-center h-screen w-full" />
                </div>
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
                    <h2 className="text-white text-[80px]"> البحث </h2>
                    <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50"> توفير معرفة أعمق تساعد الأشخاص في جميع المعلومات التي يحتاجونها </p>
                </div>
            </header>
            <section className='py-8 flex justify-content-center align-items-center bg-white '>
                <div className='container-xxl'>
                    <div className='flex flex-column justify-content-evenly justify-content-center align-items-center text-center'>
                        <div className=' '>
                            <h2 className="text-black text-[80px] mb-3"> الاطباء </h2>
                            <form className="input-group mb-3">
                                <button className="btn btn-outline-secondary" type="button" onClick={submitSearch}>ابحث</button>
                                <input type="text" className="form-control text-right " onChange={searchForDoctor} placeholder=".....بحث باسم الدكتور" name='name' />
                                <input type="text" className="form-control text-right " onChange={searchForDoctor} placeholder=".....بحث بالتخصص" name='specialize' />
                            </form>
                        </div>
                        <h1 className={errorForSearch}>No input please write name or specialize</h1>
                        {/* this div for result of the search  */}
                        {showResult == null ? <div className="alert alert-danger text-center text-lg-center">not found</div> : showResult.map((element, i) => <div key={i} className='w-50 mt-4 text-right p-4 border-3 border-black rounded-5'>

                            <h2 className="text-black textStyleForH2">  {element.name}  </h2>
                            <p className="mt-2 md:mt-0 textStyleForP"> {element.specialize}  </p>
                            <div className="d-flex justify-content-start"> <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn btn-success text-dark">احجز الان</button></div>
                        </div>)}

                    </div>
                </div>
            </section>
            <section className='py-8 bg-white'>
                <div className="container">
                    <div className="row py-3 gap-3">
                        {DocData == null ? <div> <h1 className="text-center text-lg-center"> loading data</h1> </div> : DocData.map((element, i) => <div key={i} className="col-md-3 rounded-5 border-4 mt-3">
                            <div className='py-3 text-end'>
                                <h1 className='fs-3 mb-2'>{element.name}</h1>
                                <h6 className='fs-6 mb-2'> {element._id} </h6>
                                <h3 className='fs-5 mb-2'>{element.specialize} </h3>
                                <div className="d-flex justify-content-start"> <button onClick={() => ShowBookSection(element._id, element.name)} type="button" className="btn btn-success text-dark">احجز الان</button></div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            {/* da section al7gz */}
            <section>
                <div className={ClassNamee}>
                    <h1 className="text-center fs-1 mt-3">للحجز يرجى ادخال الوقت كل ربع ساعة </h1>
                    <p className="text-right ">: مثال </p>
                    <p className="text-center">7:00 - 7:15 - 7:30 - 7:45 - 8:00 - 8:15 - 8:30 - 8:45 - 9:00 - 9:15 - 9:30 - 9:45 - 10:00 </p>
                    <form className="py-3">
                        <label htmlFor="day" className="me-3  text-end d-block col-form-label mt-2" >
                          :  احجز التاريخ
                        </label>
                        <input onChange={setBookForPatient} name="day" type="date" className="form-control d-block text-end w-50 ms-3"></input>
                        <label htmlFor="time" className="me-3 d-block col-form-label text-end">
                           : احجز الوقت
                        </label>
                        <input onChange={setBookForPatient} type="time" className="form-control w-25 ms-3" name="time" />
                        <p className="text-center fs-5 text-danger">{error}</p>
                        <label htmlFor="patientID" className="me-3 d-block col-form-label text-end">
                            : اسم المريض
                        </label>
                        <h1 className="text-xxl-center fs-3 "> {UserNameOfLogin} </h1>
                        <label htmlFor="doctorID" className="me-3 d-block col-form-label text-end">
                            : اسم الدكتور
                        </label>
                        <h1 className="text-xxl-center fs-3 "> {docDetail.name} </h1>
                        <p className="text-center text-danger fs-5">{error2}</p>
                        <button onClick={(e)=>submitBook(e,docDetail.id)} type="button" className="btn btn-success text-black mt-3 ms-3">احجز الان</button>
                        <button onClick={() => closeBookSection()} type="button" className="btn btn-danger text-black mt-3 ms-3">اغلاق</button>
                    </form>
                </div>
            </section>
            <div className={trueBook}>
                <h1 className="fs-1 w-100  text-center">تم الحجز بنجاح </h1>
                <button onClick={() => closeTrueBook()} type="button" className="btn btn-danger text-black ms-3 ">اغلاق</button>
            </div>
            <Footer />
        </>
    )
}
