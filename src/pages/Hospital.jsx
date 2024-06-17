import Dashboard from "../components/Dashboard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/DoctorDashboard.css";
function Hospital() {
  const [watingForPutTimeForDoc, setWatingForPutTimeForDoc] = useState(false);
  // returning the name, location, and id of the logged hospital - amr
  const name = localStorage.getItem("name");
  const hsopital = localStorage.getItem("hospital");

  // replacing the hospital Id, instead of fetching the Id from
  //the hospital now you receive it from the hospitalDetails and it works the same - amr
  const hospitalID = localStorage.getItem("hospitalAdminHospitalID");
  // --------------------------
  // ramez work get doctors in hospital logged in   and  pagination
  const [isLoadingForDocInHospital, setIsLoadingForDocInHospital] =
    useState(true);
  const [docInHospital, setDocInHospital] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  console.log(docInHospital);
  useEffect(() => {
    getDoctorsInHospital();
  }, []);
  async function getDoctorsInHospital() {
    let { data } = await axios.get(
      `https://mhiproject.onrender.com/clinicsDirector/getDoctors/${hospitalID}`
    );
    setDocInHospital(data.searchDoctorsInHospital);
    setIsLoadingForDocInHospital(false);
  }
  const [isDivVisible, setIsDivVisible] = useState(false);

  const toggleDivVisibility = () => {
    setIsDivVisible(!isDivVisible);
  };
  // filter with t5sos w alasm
  const [DoctorCOde, setDoctorCOde] = useState("");
  // console.log(DoctorCOde);
  const [doctorName, setDoctorNameFilter] = useState("");
  const [DoctorSpecialize, setDoctorSpecialize] = useState("");
  // console.log(doctorName);
  const filterDoctors = (value) => {
    setDoctorCOde(value);
  };
  const docNameFilter = (value) => {
    setDoctorNameFilter(value);
  };
  const docSecializeFilter = (value) => {
    setDoctorSpecialize(value);
  };
  const filteredDoctors = docInHospital.filter((doctor) => {
    return (
      doctor.code.includes(DoctorCOde) &&
      doctor.name.includes(doctorName) &&
      doctor.specialize.name.includes(DoctorSpecialize)
    );
  });

  // b2aaat alpagination

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );


  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  // console.log(filteredDoctors);
  // ------------------------

  //  put time work for doctors in hospitals
  const [ShowDivOfPutTime, setShowDivOfPutTime] = useState("d-none");
  const [docInformation, setDocInformation] = useState({
    doctorID: "",
    day: "",
    time: [],
  });
  const [confirmOperation, setConfirmOperation] = useState("d-none");
  const [RefOperation, setRefOperation] = useState("d-none");
  const [whenTheAdminChooseSameTime, setWhenTheAdminChooseSameTime] =
    useState("d-none");
  const [errorForTIme, seterrorForTIme] = useState(false);

  async function putDoctorInformation() {
    setWatingForPutTimeForDoc(true);
    if (docInformation.time.length <= 0) {
      seterrorForTIme(true);
      setWatingForPutTimeForDoc(false);
    } else {
      try {
        seterrorForTIme(false);
        let { data } = await axios.post(
          "https://mhiproject.onrender.com/clinicsDirector/doctorSchedule",
          docInformation
        );
        setDocInformation({ ...docInformation, day: "", time: [] });
        setConfirmOperation("d-flex justify-content-center");
        setRefOperation("d-none");
        setWhenTheAdminChooseSameTime("d-none");
        setActiveIndex(null);
        setWatingForPutTimeForDoc(false);
      } catch (error) {
        if (error.response && error.response.status === 422) {
          setRefOperation("d-flex justify-content-center");
          setConfirmOperation("d-none");
          setDocInformation({ ...docInformation, time: [] });
          setWatingForPutTimeForDoc(false);
        } else if (error.response && error.response.status === 424) {
          setWhenTheAdminChooseSameTime("d-flex justify-content-center");
          setRefOperation("d-none");
          setWatingForPutTimeForDoc(false);
        }
      }
    }
  }
  function addDoctorId(DocID) {
    setDocInformation({ ...docInformation, doctorID: DocID });
    setShowDivOfPutTime(
      "position-fixed StyleDivToPutDayAndTime rounded-4 shadow-lg bg-white p-4"
    );
  }

  function putDay(e) {
    setConfirmOperation("d-none");
    setWhenTheAdminChooseSameTime("d-none");
    setRefOperation("d-none");
    let theDay = e.target.value;
    setDocInformation({ ...docInformation, day: theDay, time: [] });
  }
  function putTime(e) {
    seterrorForTIme(false);
    setWatingForPutTimeForDoc(false);
    const selectedTime = e.target.value;
    const isTimeSelected = docInformation.time.includes(selectedTime);
    if (isTimeSelected) {
      // If the time is already selected, remove it from the array
      const updatedTime = docInformation.time.filter(
        (time) => time !== selectedTime
      );
      setDocInformation({ ...docInformation, time: updatedTime });
    } else {
      // If the time is not selected, add it to the array
      setDocInformation({
        ...docInformation,
        time: [...docInformation.time, selectedTime],
      });
    }
  }

  function closeDiv() {
    setShowDivOfPutTime("d-none");
    setConfirmOperation("d-none");
    setRefOperation("d-none");
    setWhenTheAdminChooseSameTime("d-none");
    setDocInformation({ ...docInformation, doctorID: "", day: "", time: [] });
    setActiveIndex(null);
    seterrorForTIme(false);
    setWatingForPutTimeForDoc(false);
    setWatingForPutTimeForDoc(false);
  }
  const timesValues = [
    { value: "8:00" },
    { value: "8:15" },
    { value: "8:30" },
    { value: "8:45" },
    { value: "9:00" },
    { value: "9:15" },
    { value: "9:30" },
    { value: "9:45" },
    { value: "10:00" },
    { value: "10:15" },
    { value: "10:30" },
    { value: "10:45" },
    { value: "11:00" },
    { value: "11:15" },
    { value: "11:30" },
    { value: "11:45" },
    { value: "12:00" },
    { value: "12:15" },
    { value: "12:30" },
    { value: "12:45" },
    { value: "13:00" },
    { value: "13:15" },
    { value: "13:30" },
    { value: "13:45" },
    { value: "14:00" },
    { value: "14:15" },
    { value: "14:30" },
    { value: "14:45" },
    { value: "15:00" },
    { value: "15:15" },
    { value: "15:30" },
    { value: "15:45" },
    { value: "16:00" },
    { value: "16:15" },
    { value: "16:30" },
    { value: "16:45" },
    { value: "17:00" },
    { value: "17:15" },
    { value: "17:30" },
    { value: "17:45" },
    { value: "18:00" },
    { value: "18:15" },
    { value: "18:30" },
    { value: "18:45" },
    { value: "19:00" },
    { value: "19:15" },
    { value: "19:30" },
    { value: "19:45" },
    { value: "20:00" },
    { value: "20:15" },
    { value: "20:30" },
    { value: "20:45" },
    { value: "21:00" },
    { value: "21:15" },
    { value: "21:30" },
    { value: "21:45" },
    { value: "22:00" },
    { value: "22:15" },
    { value: "22:30" },
    { value: "22:45" },
    { value: "23:00" },
    { value: "23:15" },
    { value: "23:30" },
    { value: "23:45" },
    { value: "00:00" },
    { value: "00:15" },
    { value: "00:30" },
    { value: "00:45" },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleActiveButton = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };
  // ---------------------------
  return (
    <>
      <Dashboard />
      <section className="mt-16 ">
        <div className="pl-6 me-4">
          <h1 className="text-emerald-950 text-[25px] md:text-[35px] text-end ">
            اسم المستخدم <span className="text-muted">:</span>{" "}
            <span className="text-muted">{name}</span>
          </h1>
          {/* <p className="text-emerald-950 text-[20px] md:text-[28px] text-end mt-2">
            للعنوان
          </p>
          <div className="d-flex justify-content-end mt-2">
            <a target="_blank" href={hsopital} className="btn btn-primary">اضغط هنا</a>
          </div> */}
        </div>
      </section>
      {/* section 3rd aldoctors aly fy almost4fa */}
      <section className="mt-5">
        <div className="container rounded-3 shadow py-3 ">
          {isLoadingForDocInHospital ? (
            <h2 className="text-center fs-3 fw-bold mt-5">جارى التحميل</h2>
          ) : (
            " "
          )}
          <button className="btn btn-success" onClick={toggleDivVisibility}>
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
                placeholder="بكود الطبيب"
                onChange={(e) => filterDoctors(e.target.value)}
              />
              <input
                type="text"
                className=" opacity-75 w-25 text-end form-control"
                placeholder=" بالتخصص"
                onChange={(e) => docSecializeFilter(e.target.value)}
              />
              <input
                type="text"
                className=" opacity-75 w-25  text-end form-control"
                placeholder="بالأسم"
                onChange={(e) => docNameFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-center mt-3 ">
            <table className="table widthforfirstSection  border-2 rounded-3 text-end">
              <thead>
                <tr className="table-success">
                  <th scope="col" className="text-center">
                    تخصيص معاد
                  </th>
                  <th scope="col">كود الطبيب</th>
                  <th scope="col">التخصص</th>
                  <th scope="col">الأسم</th>
                </tr>
              </thead>
              <tbody>
                {currentDoctors.map((element, i) => (
                  <tr key={i}>
                    <td className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-primary opacity-75"
                        onClick={() => {
                          addDoctorId(element._id);
                        }}
                      >
                        <p className="opacity-100">اضغط للأضافة</p>
                      </button>
                    </td>
                    <td>{element.code}</td>
                    <td>{element.specialize.name}</td>
                    <td>{element.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-100 d-flex justify-content-center">
            <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
            </div>
            {/* <h1 className="w-100">dadwdawdw</h1> */}
          </div>
        </div>
      </section>
      {/* adaft m3ad lkol doctor */}
      <section className={ShowDivOfPutTime}>
        <div className="d-flex justify-content-end">
          <i
            onClick={closeDiv}
            className="fa-regular fa-circle-xmark fs-3 text-danger closeOfHospitalPutTime"
          ></i>
        </div>
        <div className="d-flex flex-row flex-wrap w-100 justify-content-evenly">
          <div className="w-4/12 shadow text-end p-4 rounded-4">
            <h1 className="fs-4">أختر اليوم</h1>
            <div className="d-flex justify-content-center flex-wrap mt-3">
              <input
                type="date"
                className="form-control"
                value={docInformation.day}
                onChange={putDay}
                name="day"
              />
              <p className="mt-4 text-muted">المواعيد اللتى تم أختيارها </p>
            </div>
            <div className="d-flex justify-content-evenly gap-1 flex-wrap mt-4">
              {docInformation.time.map((element, i) => (
                <p
                  key={i}
                  className="w-12 mt-2 bg-primary text-center p-2 rounded-3 text-white"
                >
                  {element}
                </p>
              ))}
            </div>
          </div>
          <div className="w-50 shadow text-end p-4 rounded-4">
            <h1 className="fs-4">أختر مواعيد العمل</h1>
            <div className=" position-relative overflow-scroll w-100 heightOfTimeDiv mt-3">
              <div className="position-absolute w-100 d-flex justify-content-evenly flex-wrap">
                <div className="position-absolute  w-100 d-flex justify-content-evenly flex-wrap">
                  {timesValues.map((element, index) => (
                    <input
                      key={index}
                      type="button"
                      className={`opacity-75 mt-3 btn btn-success styleOfButtonOfTime ${
                        activeIndex === index ? "bg-primary" : ""
                      }`}
                      value={element.value}
                      onClick={(e) => {
                        putTime(e);
                        toggleActiveButton(index);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={confirmOperation}>
          <div
            className="alert alert-success text-center mt-4 w-50 fs-5"
            role="alert"
          >
            تم تعين موعد العمل لدى هذا الطبيب فى اليوم المحدد
          </div>
        </div>
        {errorForTIme == false ? (
          ""
        ) : (
          <div className="d-flex justify-content-center">
            <div
              className="alert alert-success text-center mt-4 w-50 fs-5"
              role="alert"
            >
              يجب عليك اعطاء الطبيب مواعيد العمل{" "}
            </div>
          </div>
        )}
        <div className={whenTheAdminChooseSameTime}>
          <div
            className="alert alert-danger text-center mt-4 w-50 fs-5"
            role="alert"
          >
            هناك طبيب اخر فى هذا الموعد
          </div>
        </div>
        <div className={RefOperation}>
          <div
            className="alert alert-danger text-center mt-4 w-50 fs-5"
            role="alert"
          >
            لا يمكن تعين هذا اليوم لهذا الطبيب
          </div>
        </div>
        <div className="d-flex w-100 justify-content-center mt-5">
          <button
            className="me-5 ButtonStyleForHospital fs-4 btn btn-success"
            onClick={putDoctorInformation}
          >
            {watingForPutTimeForDoc ? "...جارى الأضافة" : " أضافة"}
          </button>
          <button
            className="btn btn-danger ButtonStyleForHospital fs-4"
            onClick={closeDiv}
          >
            الغاء
          </button>
        </div>
      </section>
    </>
  );
}
export default Hospital;
