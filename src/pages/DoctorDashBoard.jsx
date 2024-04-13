import React, { useEffect, useState } from 'react'
import Footer from './../components/Footer';
import Dashboard from "../components/Dashboard";
import "../css/DoctorDashboard.css"
import axios from 'axios'

export function DoctorDashBoard() {
    // get doctor id
    const doctorId = localStorage.getItem("DoctorId")
    const name = localStorage.getItem("name");
    const specialize = localStorage.getItem("specialize");
    // ------------------
    // get booking 
    const [getBookForDoct, setgetBookForDoct] = useState([])
    const [error, setError] = useState("")
    const [errorClass, setErrorClass] = useState("d-none")
    const [ClassForTable, setClassForTable] = useState("table shadow")

    async function getBooking() {
        try {
            let { data } = await axios.get(`https://mhiproject.onrender.com/doctor/showBooking/${doctorId}`)
            setgetBookForDoct(data.getbook)
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("لا يوجد حجوزات")
                setErrorClass("fs-1 text-center mt-5 mb-5")
                setClassForTable("d-none")
            }
        }
    }

    useEffect(() => {
        getBooking()
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
    console.log(filteredRows);

    // --------------------------------
    return (
        <>
            <Dashboard />
            {/* section show booking */}
            <section className='py-4'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-10 text-center bg-muted rounded-4 p-4'>
                            <h1 className={errorClass}>{error}</h1>
                            <div className='d-flex justify-content-start mb-2'>
                                <button className='btn btn-success' onClick={toggleFilter}> Filter {showFilter ? <i className="fa-solid fa-arrow-up "></i> : <i className="fa-solid fa-arrow-down"></i>}
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
                                            <th scope="col">سجله الطبى</th>
                                            <th scope="col">رقم التأمين</th>
                                            <th scope="col">اسم المريض</th>
                                        </tr>
                                    </thead>
                                    <tbody className={showResult}>
                                        {filteredRows.map((element, i) => (
                                            <tr key={i}>
                                                <td>
                                                    <button className='btn btn-danger me-2 widthForButton'>الغاء</button>
                                                    <button className='btn btn-success widthForButton'>حضور</button>
                                                </td>
                                                <td>
                                                    <p>{element.day.slice(0, 10)}</p>
                                                    <p>{element.time}</p>
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
                                                    <button className='btn btn-danger me-2 widthForButton'>الغاء</button>
                                                    <button className='btn btn-success widthForButton'>حضور</button>
                                                </td>
                                                <td>
                                                    <p>{element.day.slice(0, 10)}</p>
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

                        <div className='col-md-2 text-end'>
                            <h1 className='fs-4 py-3'>د/ {name}</h1>
                            <p className='text-muted'>{specialize}</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}



