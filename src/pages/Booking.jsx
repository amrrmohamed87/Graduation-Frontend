import React, { useState } from "react";
import "../css/Booking.css";
import BgPhoto from "../assets/images/1.jpg";
import sectionsPhoto1 from "../assets/images/pexels-photo-5155774.webp";
import sectionsPhoto2 from "../assets/images/realheart.jpg";
import sectionsPhoto3 from "../assets/images/ear.webp";
import sectionsPhoto4 from "../assets/images/kids.jpg";
import sectionsPhoto5 from "../assets/images/skin.jpg";
import sectionsPhoto6 from "../assets/images/foto_upload_1525844034.jpg";
import sectionsPhoto7 from "../assets/images/2022-637854515927417334-741.jpg";
import sectionsPhoto8 from "../assets/images/فحص-العين-768x456.jpg";
import sectionsPhoto9 from "../assets/images/endocr.png";
import sectionsPhoto10 from "../assets/images/radyasyononkolojisiradyoterapijpg_0a2d.webp";
import sectionsPhoto11 from "../assets/images/دكتور-نفسي-بالمنزل-ميديكال-كير.jpg";
import sectionsPhoto12 from "../assets/images/6303b6d32a466abd05dcf325_Neurology.jpg";
import sectionsPhoto13 from "../assets/images/symptoms-similarity-of-digestive-system-diseases.jpg";
import sectionsPhoto14 from "../assets/images/الأمراض-المتناقلة-جنسيًا-ft-img.webp";
import sectionsPhoto15 from "../assets/images/1654546_0.jpg";
import sectionsPhoto16 from "../assets/images/download.jfif";
import Footer from "./../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function Booking() {
  const cardData = [
    {
      imgSrc: sectionsPhoto1,
      titleBook: "كشف الامراض العقلية",
    },
    {
      imgSrc: sectionsPhoto2,
      titleBook: "كشف القلب",
    },
    {
      imgSrc: sectionsPhoto3,
      titleBook: "كشف اذن",
    },
    {
      imgSrc: sectionsPhoto4,
      titleBook: "كشف الاطفال",
    },
    {
      imgSrc: sectionsPhoto5,
      titleBook: "كشف الجلدية",
    },
    {
      imgSrc: sectionsPhoto6,
      titleBook: "كشف الامراض الصدرية",
    },

    {
      imgSrc: sectionsPhoto7,
      titleBook: "كشف النساء و الولادة",
    },
    {
      imgSrc: sectionsPhoto8,
      titleBook: "كشف العيون ",
    },
    {
      imgSrc: sectionsPhoto9,
      titleBook: "كشف الغدد الصماء ",
    },
    {
      imgSrc: sectionsPhoto10,
      titleBook: "كشف الاورام ",
    },
    {
      imgSrc: sectionsPhoto11,
      titleBook: "كشف الامراض النفسية ",
    },
    {
      imgSrc: sectionsPhoto12,
      titleBook: "كشف الامراض العصبية ",
    },
    {
      imgSrc: sectionsPhoto13,
      titleBook: "كشف  الجهاز الهضمى ",
    },
    {
      imgSrc: sectionsPhoto14,
      titleBook: "كشف الامراض الجنسية ",
    },
    {
      imgSrc: sectionsPhoto15,
      titleBook: "كشف امراض الروماتيزم ",
    },
    {
      imgSrc: sectionsPhoto16,
      titleBook: "كشف الطبى العام ",
    },
  ];
  const [selectedDate, setSelectedDate] = useState(null);
  const [ClassNamee, setClassName] = useState("d-none bg-white");

  function bookingSection(i, titleBok) {
    let data = document.querySelector(".selectTag");
    data.innerHTML = titleBok;
    setClassName("bg-white");
  }
  const scrollToCenter = () => {
    const windowHeight = window.innerHeight;
    console.log(windowHeight);
    const scrollPosition = windowHeight * 2.5;
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  };

  function closeBookSection() {
    setClassName("d-none");
  }

  return (
    <>
      <header className="relative h-screen w-full">
        <div className=" w-full h-screen">
          <img
            src={BgPhoto}
            className="object-cover object-center h-screen w-full"
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]"> الحجز </h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50">
            يمكنك بسهولة تحديد المواعيد وتلقي خدمات الرعاية الصحية في الوقت
            المناسب
          </p>
        </div>
      </header>
      <section className="bg-white py-6">
        <h1 className="text-center text-6xl"> التخصصات</h1>
      </section>
      <section>
        <div className="container py-3">
          <div className="row justify-content-around ">
            {cardData.map((element, i) => (
              <div
                onClick={() => {
                  bookingSection(i, element.titleBook);
                  scrollToCenter();
                }}
                key={i}
                className="col-md-4  rounded-5 mb-5 position-relative layer cardSize "
              >
                <img
                  src={element.imgSrc}
                  alt="photo"
                  className="rounded-5 w-100 h-100"
                />

                <div className="position-absolute start-0 bg-black layerUp rounded-5 h-100 w-100 opacity-0 top-0 ">
                  <div>
                    <h1 className="text-white fs-2 fw-bold">
                      {element.titleBook}{" "}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className={ClassNamee}>
        <div className="container py-3">
          <div className="row position-relative pt-5">
            <div
              onClick={() => closeBookSection()}
              className="position-absolute end-0 top-0 text-end iconX border border-danger rounded-5"
            >
              <p>اغلاق</p>
            </div>
            <div className="col-md-6 py-3">
              <label
                htmlFor=""
                className="me-2  text-end d-block col-form-label mt-2"
              >
                احجز التاريخ
              </label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className="form-control d-block text-end"
              ></DatePicker>
              <label htmlFor="" className="d-block col-form-label text-end">
                احجز الوقت
              </label>
              <input type="time" className="form-control w-25" />
              <button className="btn btn-success mt-3">احجز الان</button>
            </div>
            <div className="col-md-6 text-end py-3">
              <h1 className="selectTag fs-2"></h1>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
