import React, { useEffect, useState } from "react";
import "../css/Search.css";
import Footer from "../components/Footer";
import SearchPhoto from "../assets/images/search.jpg";
import SectionPhoto from "../assets/images/Search-Drug-Monitoring-Checker.jpg";
import SectionPhoto2 from "../assets/images/shutterstock-huge-file.avif";
import axios from "axios";
import AOS from 'aos';
export function MedSearch() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);
  // get medicines
  const [getMedicine, setGetMedicine] = useState([]);
  const [showDiv, setShowDiv] = useState();
  const [showDivGetMed, setShowDivGetMed] = useState("d-none");
  const [error, setError] = useState("d-none");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    GetMedicines();
  }, []);
  async function GetMedicines() {
    try {
      let { data } = await axios.get(
        "https://mhiproject.onrender.com/patient/getMedicines"
      );
      setGetMedicine(data.findMedicines);
      setIsLoading(false);
    } catch (error) {}
  }
  const toggleDivPosition2 = (index) => {
    setShowDiv((prevShowDiv) => (prevShowDiv === index ? null : index));
  };
  function ShowDiv() {
    setShowDivGetMed("w-100");

  }
  function HideDiv() {
    setShowDivGetMed("d-none");
    setShowDiv(null)
  }
  // ------------------------

  // search medicines
  const [ShowDivSearch, setShowDivSearch] = useState("d-none");
  const [error2, setError2] = useState("");
  const [classError2, setClassError2] = useState("d-none");
  const [ValueOfSearch, setValueOfSearch] = useState({
    name: "",
  });
  const [resultOfSearch, setResultOfSearch] = useState([]);
  function showThing() {
    setShowDivSearch(" mt-5 w-100  position-relative");
  }
  function closeDivShowSearch() {
    setShowDivSearch("d-none");
    setValueOfSearch((prevState) => ({
      ...prevState,
      name: "",
    }));
  }
  function readthing(e) {
    let NewValueOfSearch = { ...ValueOfSearch };
    NewValueOfSearch[e.target.name] = e.target.value;
    setValueOfSearch(NewValueOfSearch);
  }
  async function getResponseOfSearch(e) {
    e.preventDefault();
    try {
      let { data } = await axios.post(
        "https://mhiproject.onrender.com/patient/searchMedicine",
        ValueOfSearch
      );
      setResultOfSearch(data.searchName);
      setError2("");
      setClassError2("d-none");
      showThing()
    } catch (error2) {
      if (error2.response && error2.response.status === 404) {
        setError2("غير متوفر");
        setClassError2(
          "text-center fs-1 w-50 alert ClassError2Width alert-warning fw-bold mt-3"
        );
        setResultOfSearch([]);
      } else {
        setError2("");
        setClassError2("d-none");
      }
    }
  }

  // ------------------------

  return (
    <>
      <header data-aos="fade-right" className="relative h-screen w-full">
        <div className=" w-full h-screen">
          <img
            src={SearchPhoto}
            className="object-cover object-center h-screen w-full"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]"> البحث </h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50">
            {" "}
            توفير معرفة أعمق تساعد الأشخاص في جميع المعلومات التي يحتاجونها{" "}
          </p>
        </div>
      </header>
      {/* header alsf7a */}
      <section>
        <div className="container">
          <div className="w-100 flex-wrap d-flex justify-content-center">
            <div className="w-100 d-flex justify-content-center">
              <h1 className="text-center text-[#056558] mt-12 text-[22px] md:text-[30px] w-50">
                البحث عن الأدوية يمثل{" "}
              </h1>
            </div>
            <h1 className="text-center textInUpper mt-4 text-[22px] md:text-[30px] w-50">
              "رحلة من التفاؤل و الثقة ،حيث تمكن فى كل قرار صحي حكمة واهتمام
              بالصحة الشخصية"
            </h1>
          </div>
          <div className="d-flex w-100 flex-wrap gap-5 mt-5  py-3 justify-content-around">
            <div className=" DivSoraSearchMed rounded-4 shadow-lg">
              <img src={SectionPhoto} alt="sora" className="rounded-4 h-100" />
            </div>
            <div data-aos="fade-up"
     data-aos-anchor-placement="bottom-bottom" className=" textForSearchMed shadow-lg p-4 rounded-4">
              <h1 className="text-end textForSearchMEdH1 fs-1">
                هدفنا هو التوعية{" "}
                <i className="fa-solid fs-3 text-success fa-magnifying-glass"></i>
              </h1>
              <p className="fs-3 mt-5  text-end textForSearchMEdP">
                هدفنا هو توفير معلومات شاملة ومفصلة عن الأدوية والمواد الفعالة
                فيها، بحيث يمكن للمستخدم الحصول على معرفة عميقة حول استخدامات
                الأدوية وطرق استعمالها والأمراض التي تعالجها، دون الحاجة إلى
                قراءة الروشتة الطبية. يهدف (الويب سايت) إلى تمكين الأفراد من فهم
                الأدوية التي يتناولونها والتوعية بشكل أفضل وتحسين تجربتهم الطبية
                دون بذل جهد إضافي في البحث عن المعلومات.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* search aladwya */}
      <section className="py-5">
        <div className="container">
          <form data-aos="fade-left" onSubmit={getResponseOfSearch}>
            <div className="d-flex w-100 justify-content-center ">
              <button onClick={getResponseOfSearch} type="button" className="btn btn-info rounded-5">
                <i className="fa-solid fs-3 text-white fa-magnifying-glass"></i>
              </button>
              <input
                onChange={readthing}
                type="text"
                className="w-50 form-control text-end  rounded-5"
                name="name"
                placeholder=".....ابحث عن الادوية"
                value={ValueOfSearch.name}
              />
            </div>
          </form>
        </div>
        {/* 3rd ntegt alsearch */}
        <div className="d-flex w-100 justify-content-center">
                <div className={classError2}>{error2}</div>
              </div>
        <div  className={ShowDivSearch}>
          <div
            onClick={closeDivShowSearch}
            className="position-absolute StyleOfCloseX end-0 top-0"
          >
            {" "}
            <i className="fa-regular fs-3 text-dark opacity-75 fa-circle-xmark"></i>
          </div>
          <div className=" w-100">
            <div className="container">
              <div className="d-flex SHowSearchMedicines overflow-scroll justify-content-center gap-3 shadow-lg p-4 rounded-4">
                {resultOfSearch == null
                  ? ""
                  : resultOfSearch.map((element, i) => (
                      <div
                        key={i}
                        className="ShowResultOfSearchMed rounded-4 mt-3 shadow position-relative overflow-hidden "
                      >
                        <div className="d-flex mt-2 justify-content-center ">
                          <div className="d-flex justify-content-center w-50 styleCardOfShowMed">
                            <h1 className="fs-2 text-muted opacity-75">
                              {element.name}
                            </h1>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mt-3 me-4">
                          <p className="text-end mt-3 fs-5">
                            {" "}
                            {element.description}
                          </p>
                          <span className="mt-3 fs-4 me-2 ms-2">:</span>
                          <i className="fa-solid fa-file-medical mt-3 text-success fs-3 "></i>
                        </div>
                        <div className="d-flex justify-content-end mt-3 me-4">
                          <p className="text-end mt-3 fs-4">
                            {" "}
                            {element.components}
                          </p>
                          <span className="mt-3 fs-4 me-2 ms-2">:</span>
                          <i className="fa-solid mt-3 fa-mortar-pestle fs-4 text-success"></i>
                        </div>
                        <div className="d-flex justify-content-end mt-2 me-4">
                          <p className="mt-3 text-end fs-5">
                            {element.tradeMark}
                          </p>
                          <span className="text-success text-end fs-5 mt-3 ms-2">
                            {/* : اسم الشركات */}
                            <span className="mt-3 fs-4 me-2 ms-2">:</span> <i className="fa-regular fa-building fs-4 text-success"></i>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleDivPosition2(i)}
                          className={`btn bg-success text-white  ms-2 mt-2 z-2 position-relative buttonToShowHowToUse start-0 ${
                            showDiv === i ? "active" : ""
                          }`}
                        >
                          طريقة الاستعمال
                        </button>
                        <div
                          className={`bg-success StyleLayerOfCardOfMedi w-100 h-100 position-absolute start-0 rounded-4 ${
                            showDiv === i ? "active" : ""
                          }`}
                        >
                          <div className="h-100 p-4 text-center d-flex justify-content-center">
                            <p className="text-white fs-5 fw-bold align-self-center">
                              {element.howToUse}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 3rd aladwya kolha */}
      <section>
        <div className="container">
          <div className="container p-4 rounded-4 shadow">
            <div className="d-flex flex-wrap gap-5 justify-content-evenly">
              <div data-aos="fade-right" className="w-25 soraShowAllMed shadow rounded-4">
                <img src={SectionPhoto2} alt="" className="w-100 rounded-4" />
              </div>
              <div data-aos="fade-left" className="shadow TextShowAllMed p-4 rounded-4 w-50">
                <h1 className="text-center fs-2"> يمكنك عرض جميع الادوية </h1>
                <div className="d-flex justify-content-center gap-5 mt-5">
                  <button
                    type="button"
                    onClick={ShowDiv}
                    className="btn bg-success text-white"
                  >
                    عرض
                  </button>
                  <button
                    type="button"
                    onClick={HideDiv}
                    className="btn bg-danger text-white"
                  >
                    الغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showDivGetMed}>
          <div className="widthSection">
            <div className="container widthSection">
              <div className={error}>Loading Page</div>
              <div className="row SHowMedicines overflow-scroll justify-content-evenly gap-3 shadow-lg p-4 rounded-4">
                {isLoading == true ? (
                  <h1 className="fs-1 mt-5 text-center fw-bold ">
                    {" "}
                    جارى التحميل
                  </h1>
                ) : (
                  ""
                )}
                {getMedicine.map((element, i) => (
                  <div
                    key={i}
                    className="col-md-3 rounded-4 mt-3 shadow position-relative overflow-hidden WidthOfResultCard"
                  >
                    <div className="d-flex mt-2 justify-content-center ">
                      <div className="d-flex justify-content-center w-50 styleCardOfShowMed">
                        <h1 className="fs-2 text-muted opacity-75">
                          {element.name}
                        </h1>
                      </div>
                    </div>
                      <p className="text-end mt-3 fs-5">
                        {" "}
                        {element.description}
                        <span className="mt-3 fs-4 ms-2 me-2">:</span>
                      <i className="fa-solid fa-file-medical mt-3 text-success fs-3 "></i>
                      </p>
                    <p className="text-end mt-2 fs-4">
                      {" "}
                      {element.components} :{" "}
                      <i className="fa-solid fa-mortar-pestle fs-4 text-success"></i>
                    </p>
                    <div className="d-flex justify-content-evenly">
                      <p className="mt-3 text-end fs-6 w-75">
                        {" "}
                        {element.tradeMark}{" "}
                      </p>
                      <span className="text-success text-center fs-5 mt-3 w-50 ">
                        : اسم الشركات
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleDivPosition2(i)}
                      className={`btn bg-success text-white mb-3 mt-3 z-2 start-0 position-relative buttonToShowHowToUse ${
                        showDiv === i ? "active" : ""
                      }`}
                    >
                      طريقة الاستعمال
                    </button>
                    <div
                      className={`bg-success StyleLayerOfCardOfMedi w-100 h-100 position-absolute start-0 rounded-4 ${
                        showDiv === i ? "active" : ""
                      }`}
                    >
                      <div className="h-100 p-4 text-center d-flex justify-content-center">
                        <p className="text-white fs-5 fw-bold align-self-center">
                          {element.howToUse}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
