import Dashboard from "../components/Dashboard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/DoctorDashboard.css"
function Hospital() {
  const name = localStorage.getItem("name");
  const hsopital = localStorage.getItem("hospital");

  // ramez work get hospitals
  const [isLoading, setIsLoading] = useState(true)
  const [hospitalsInfo, setHospitalsInfo] = useState([])
  useEffect(() => {
    getHospitals()
  }, [])
  async function getHospitals() {
    let { data } = await axios.get("https://mhiproject.onrender.com/patient/getHospitals")
    setHospitalsInfo(data.findHospitals)
    setIsLoading(false)
  }
  // ------------------------
  // search for doctors in hospitals
  const [ShowResultFromHospi, setShowResultFromHospi] = useState([])
  
  const [classShowResultOfhospi, setclassShowResultOfhospi] = useState("d-none")
  const [error, setError] = useState()
  async function searchDocINHospi(hospiID) {
    try {
      let { data } = await axios.post("https://mhiproject.onrender.com/patient/searchHospital", { hospitalID: hospiID });
      setShowResultFromHospi(data.searchName);
      setclassShowResultOfhospi("container shadow rounded-4 HightForSlidedown position-relative styleScrollOfHospitalSection overflow-scroll mt-5")
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("لا يوجد اطباء")
      }
    }
  }
  function closeHospitalSection() {
    setclassShowResultOfhospi("d-none")
  }
  return (
    <>
      <Dashboard />
      <section className="mt-16 ">
        <div className="pl-6">
          <h1 className="text-emerald-950 text-[25px] md:text-[35px] text-end">
            اسم المستشفى : {name}
          </h1>
          <p className="text-emerald-950 text-[20px] md:text-[28px] text-end">
            للعنوان اضغط هنا {hsopital}
          </p>
        </div>
      </section>
      <section className="w-100 justify-content-center d-flex mt-5">
        <div className=" widthforfirstSection shadow rounded-4 p-4 text-end">
          <p className="text-end mt-3 fs-4">اعرض الاطباء المتاحين فى كل مستشفى</p>
          <i className="fa-solid fa-arrow-down text-success fs-5 mt-3  "><span className="fs-5 ms-2 text-black fw-medium">المستشفيات  <i className="fa-regular fa-hospital text-success"></i></span></i>

          <div className="d-flex flex-wrap gap-3 justify-content-evenly">
            {isLoading == true ? <h1 className='fs-1 text-center fw-bold '> جارى التحميل</h1> : ""}
            {hospitalsInfo.map((element, i) => <h1 key={i} onClick={() => {
              searchDocINHospi(element._id);
            }} className="forH1InBooking mt-5 p-1 rounded-3 text-center border-2 buttonOnBooking  border-success">{element.name}</h1>)}
          </div>
          {/* عرض الدكاترة */}
          <div className={classShowResultOfhospi}>
            <div className="w-100 d-flex justify-content-end">
              <i onClick={closeHospitalSection} className="fa-regular fa-circle-xmark text-end  p-2 fs-3 text-success styleOFCloseCircleInHospital"></i>
            </div>
            <div className="d-flex  position-absolute start-0 end-0 gap-2 flex-wrap justify-content-evenly">
              <table className="table mt-3">
                <thead>
                  <tr className="table-success">

                    <th scope="col">يوم العمل</th>
                    <th scope="col">التخصص</th>
                    <th scope="col">اسم الطبيب</th>
                  </tr>
                </thead>
                <tbody>
                {ShowResultFromHospi.map((element, i) => <tr>
                    <td><input type="date" className=" border-3 p-1"/></td>
                    <td>{element.specialize}</td>
                    <td>{element.name}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hospital;
