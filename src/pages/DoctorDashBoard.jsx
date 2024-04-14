import React, { useEffect, useState } from 'react'
import Dashboard from "../components/Dashboard";
import "../css/DoctorDashboard.css"
import axios from 'axios'

export function DoctorDashBoard() {
    // get doctor id
    const doctorId = localStorage.getItem("DoctorId")
    // console.log(doctorId);
    const name = localStorage.getItem("name");
    const specialize = localStorage.getItem("specialize");
    // ------------------
    // getcount bta3t aldoctor fy kol 7aga
    const [countOfEverythingTodoc, setcountOfEverythingTodoc] = useState({})
    async function showAllCountAboutDic() {
        try {
            let { data } = await axios.get(`https://mhiproject.onrender.com/doctor/countBooks/${doctorId}`)
            setcountOfEverythingTodoc(data)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("لا يوجد حجوزات")
                setErrorClass("fs-1 text-center mt-5 mb-5")
                setClassForTable("d-none")
            }
        }
    }
    async function StatusOfPatient(bookingIds) {
        let newStatus = {
            bookingID: bookingIds,
            status: "Done"
        };

        try {
            let { data } = await axios.patch("https://mhiproject.onrender.com/doctor/changeBookingStatus", newStatus);
            console.log(data);
            showAllCountAboutDic();
            getBooking();
        } catch (error) {
            console.error(error);
        }
    }
    async function setStatusOfPatientIfCancel(status) {
        let newStatus = {
            bookingID: status,
            status: "Cancelled"
        };

        try {
            let { data } = await axios.patch("https://mhiproject.onrender.com/doctor/changeBookingStatus", newStatus);
            console.log(data);
            showAllCountAboutDic();
            getBooking();
        } catch (error) {
            console.error(error);
        }
    }
    // --------------------------
    // get booking 
    const [isLoading, setIsLoading] = useState(true)
    const [getBookForDoct, setgetBookForDoct] = useState([])
    const [error, setError] = useState("")
    const [errorClass, setErrorClass] = useState("d-none")
    const [ClassForTable, setClassForTable] = useState("table shadow")
    const [classOfFilterButton, setclassOfFilterButton] = useState('btn btn-success')
    async function getBooking() {
        try {
            let { data } = await axios.get(`https://mhiproject.onrender.com/doctor/showBooking/${doctorId}`)
            setgetBookForDoct(data.getbook)
            setIsLoading(false)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("لا يوجد حجوزات")
                setErrorClass("fs-1 text-center mt-5 mb-5")
                setClassForTable("d-none")
                setclassOfFilterButton("d-none")
            }
        }
    }

    useEffect(() => {
        getBooking();
        showAllCountAboutDic();
    }, [])

    // filter and page count
    // two arrows
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(5);
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = getBookForDoct.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        } else if (direction === 'next' && currentPage < Math.ceil(getBookForDoct.length / rowsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };
    // ------------------------------------
    const [showFilter, setShowFilter] = useState(false);
    const [idFilter, setIdFilter] = useState("");
    const [nameFilter, setNameFilter] = useState("");
    const [showResult, setShowResult] = useState("d-none");
    const [currentResult, setcurrentResult] = useState("");
    const toggleFilter = () => {
        setShowFilter(!showFilter);
        setShowResult("d-none")
        setcurrentResult("")
    };

    const handleIdFilter = (value) => {
        setIdFilter(value);
        setShowResult("")
        setcurrentResult("d-none")
    };

    const handleNameFilter = (value) => {
        setNameFilter(value);
        setShowResult("")
        setcurrentResult("d-none")
    };

    const filteredRows = getBookForDoct.filter((element) => {
        return element.patientID._id.includes(idFilter) && element.patientID.name.includes(nameFilter);
    });

    // --------------------------------
    return (
        <>
            <Dashboard />
            {/* section show booking */}
            <section className='py-4'>
                <div className='container-fluid'>
                    <div className='row mt-4'>
                        <div className='col-md-10 p-5 mb-5 '>
                            <div className='d-flex gap-3 justify-content-evenly mb-4'>
                                <div className='widthForCard  shadow rounded-3 p-3'>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <h1 className='fs-4'>العمليات</h1>
                                        <i className="fa-solid fa-stethoscope ms-4 me-1 text-muted"></i>
                                    </div>
                                    <div className='justify-content-center d-flex'>
                                        <h1 className='fs-5 text-muted mt-3'>50</h1>
                                    </div>
                                </div>
                                <div className='widthForCard  shadow rounded-3 p-3'>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <h1 className='fs-4'>المواعيد الملغاه</h1>
                                        <i className="text-danger fs-5 fa-solid fa-ban ms-3 me-1"></i>
                                    </div>
                                    <div className='justify-content-center d-flex'>
                                        <h1 className='fs-5 text-muted mt-3'>{countOfEverythingTodoc.cancelledCounter}</h1>
                                    </div>
                                </div>
                                <div className='widthForCard  shadow rounded-3 p-3'>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <h1 className='fs-4'> المواعيد المقبولة</h1>
                                        <i className="text-success fs-5 fa-regular fa-circle-check ms-2 "></i>
                                    </div>
                                    <div className='justify-content-center d-flex'>
                                        <h1 className='fs-5 text-muted mt-3'>{countOfEverythingTodoc.doneCounter}</h1>
                                    </div>
                                </div>
                                <div className='widthForCard  shadow rounded-3 p-3'>
                                    <div className='d-flex align-items-center justify-content-end'>
                                        <h1 className='fs-4'> المواعيد الجديدة</h1>
                                        <i className="text-primary fs-5 fa-regular fa-square-plus ms-2 "></i>
                                    </div>
                                    <div className='justify-content-center d-flex'>
                                        <h1 className='fs-5 text-muted mt-3'>{countOfEverythingTodoc.waitingCounter}</h1>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <div className='col-md-2 text-end'>
                            <h1 className='fs-3 py-1 '>د/ {name}</h1>
                            <p className='text-muted fs-5'>{specialize}</p>
                        </div>
                        <div className='mt-3 col-md-10 text-center bg-muted rounded-4 p-5'>
                            {isLoading == true ? <h1 className='fs-1 text-center fw-bold '> جارى التحميل</h1> : ""}
                            <h1 className={errorClass}>{error}</h1>
                            <div className='d-flex justify-content-start mb-2'>
                                <button className={classOfFilterButton} onClick={toggleFilter}> Filter {showFilter ? <i className="fa-solid fa-arrow-up "></i> : <i className="fa-solid fa-arrow-down"></i>}
                                </button>
                            </div>
                            {(
                                <div className={`d-flex justify-content-evenly filter-content ${showFilter ? 'active' : ''}`}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control text-end" placeholder='ادخل رقم التأمين' id="idFilter" onChange={(e) => handleIdFilter(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" placeholder='ادخل الاسم' className="form-control text-end" id="nameFilter" onChange={(e) => handleNameFilter(e.target.value)} />
                                    </div>
                                </div>
                            )}

                            <div className="table-responsive w-100">
                                <table className={ClassForTable}>
                                    <thead>
                                        <tr className='table-success'>
                                            <th scope="col">تعليقات</th>
                                            <th scope="col">التاريخ</th>
                                            <th scope="col">الوقت</th>
                                            <th scope="col">سجله الطبى</th>
                                            <th scope="col">رقم التأمين</th>
                                            <th scope="col">اسم المريض</th>
                                        </tr>
                                    </thead>
                                    <tbody className={showResult}>
                                        {filteredRows.map((element, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <button onClick={() => {
                                                        setStatusOfPatientIfCancel(element._id);

                                                    }} className='btn btn-danger me-2 widthForButton'>الغاء</button>
                                                    <button onClick={() => {
                                                        StatusOfPatient(element._id)
                                                    }} className='btn btn-success widthForButton'>حضور</button>
                                                </td>
                                                <td className='d-flex flex-row'>
                                                    <p className='w-75'>{element.day.slice(0, 10)}</p>
                                                    <p className='w-25'>{element.time}</p>
                                                </td>
                                                <td>i</td>
                                                <td>{element.patientID._id}</td>
                                                <td>{element.patientID.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tbody className={currentResult}>
                                        {currentRows.map((element, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <button onClick={() => {
                                                        setStatusOfPatientIfCancel(element._id);

                                                    }} className='btn btn-danger me-2 widthForButton'>الغاء</button>
                                                    <button onClick={() => {
                                                        StatusOfPatient(element._id)
                                                    }} className='btn btn-success widthForButton'>حضور</button>
                                                </td>
                                                <td>
                                                    <p>{element.day.slice(0, 10)}</p>
                                                </td>
                                                <td>
                                                    <p>{element.time}</p>
                                                </td>
                                                <td>i</td>
                                                <td>{element.patientID._id}</td>
                                                <td>{element.patientID.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            {/* two arrows to go between pages */}
                            <div className="d-flex justify-content-center">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate('prev')}>&laquo;</button>
                                        </li>
                                        <li className="page-item disabled">
                                            <span className="page-link">{currentPage}</span>
                                        </li>
                                        <li className={`page-item ${currentPage === Math.ceil(getBookForDoct.length / rowsPerPage) ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => paginate('next')}>&raquo;</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

