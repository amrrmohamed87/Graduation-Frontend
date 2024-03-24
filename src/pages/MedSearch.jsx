import React, { useEffect, useState } from 'react'
import "../css/Search.css"
import Footer from '../components/Footer'
import SearchPhoto from "../assets/images/search.jpg"
import SectionPhoto from "../assets/images/Search-Drug-Monitoring-Checker.jpg"
import SectionPhoto2 from "../assets/images/shutterstock-huge-file.avif"
import axios from 'axios'
export function MedSearch() {
  // get doctor 
  const [getMedicine, setGetMedicine] = useState([]);
  const [showDiv, setShowDiv] = useState();
  const [showDivGetMed, setShowDivGetMed] = useState("d-none")
  useEffect(() => {
    GetMedicines()
  }, [])
  async function GetMedicines() {
    let { data } = await axios.get('https://mhiproject.onrender.com/patient/getMedicines')
    setGetMedicine(data.findMedicines)
  }
  const toggleDivPosition2 = (index) => {

    setShowDiv(prevShowDiv => (prevShowDiv === index ? null : index));


  };
  function ShowDiv() {
    setShowDivGetMed('container');
  }
  function HideDiv() {
    setShowDivGetMed("d-none")
  }
  // ------------------------
  function showThing() {
    alert("hello")
  }
  function readthing(e) {
    console.log(e.target.value);
  }
  return (
    <>
      <header className="relative h-screen w-full">
        <div className=" w-full h-screen">
          <img src={SearchPhoto} className="object-cover object-center h-screen w-full" />
        </div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]"> البحث </h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50"> توفير معرفة أعمق تساعد الأشخاص في جميع المعلومات التي يحتاجونها </p>
        </div>
      </header>
      {/* header alsf7a */}
      <section>
        <div className='container'>
          <div className='w-100 flex-wrap d-flex justify-content-center'>
            <div className='w-100 d-flex justify-content-center'>
              <h1 className="text-center text-[#056558] mt-12 text-[22px] md:text-[30px] w-50">البحث عن الأدوية يمثل </h1>
            </div>
            <h1 className="text-center mt-4 text-[22px] md:text-[30px] w-50">"رحلة  من التفاؤل و الثقة ،حيث تمكن فى كل قرار صحي حكمة واهتمام بالصحة الشخصية"</h1>
          </div>
          <div className='d-flex w-100 gap-5 mt-5  py-3 justify-content-around'>
            <div className=' DivSoraSearchMed rounded-4 shadow-lg'>
              <img src={SectionPhoto} alt="sora" className='rounded-4' />
            </div>
            <div className='w-50 shadow-lg p-4 rounded-4'>
              <h1 className='text-end fs-1'>هدفنا هو التوعية <i className="fa-solid fs-3 text-success fa-magnifying-glass"></i></h1>
              <p className='fs-3 mt-5 text-end '>قم بتنزيل تطبيقنا الآن، حيث تجتمع الراحة مع التكنولوجيا المتطورة! افتح عالمًا من الإمكانيات من خلال تطبيقنا سهل الاستخدام الذي يلبي جميع احتياجاتك. سواء كنت أثناء التنقل أو مسترخي في المنزل، فقد تم تصميم تطبيقنا لجعل تجربتك سلسة وممتعة
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* search aladwya */}
      <section className='py-5'>
        <div className='container'>
          <form >
            <div className='d-flex w-100 justify-content-center '>
              <button type='button' className='btn btn-info rounded-5'>
                <i className="fa-solid fs-3 text-info fa-magnifying-glass"></i>
              </button>
              <input onChange={readthing} onClick={showThing} type="text" className='w-50 form-control text-end  rounded-5' placeholder='.....ابحث عن الادوية' />
            </div>
          </form>
        </div>
      </section>
      {/* 3rd aladwya kolha */}
      <section>
        <div className='container'>
          <div className='container p-4 rounded-4 shadow'>
            <div className='d-flex gap-5 justify-content-evenly'>
              <div className='w-25 shadow rounded-4'>
                <img src={SectionPhoto2} alt="" className='w-100 rounded-4'/>
              </div>
              <div className='shadow p-4 rounded-4 w-50'>
                <h1 className='text-center fs-2'> يمكنك عرض جميع الادوية </h1>
                <div className='d-flex justify-content-center gap-5 mt-5'>
                  <button type='button' onClick={ShowDiv} className='btn bg-success text-white'>عرض</button>
                  <button type='button' onClick={HideDiv} className='btn bg-danger text-white'>الغاء</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={showDivGetMed}>
          <div className='container'>
            <div className='container'>
              <div className="row SHowMedicines overflow-scroll justify-content-evenly gap-3 shadow-lg p-4 rounded-4">
                {getMedicine.map((element, i) => <div key={i} className="col-md-3 rounded-4 mt-3 shadow position-relative overflow-hidden">
                  <div className='d-flex mt-2 justify-content-center '>
                    <div className="d-flex justify-content-center w-50 styleCardOfShowMed">
                      <h1 className='fs-2 text-muted opacity-75'>{element.name}</h1>
                    </div>
                  </div>
                  <div className='d-flex justify-content-evenly mt-3'>
                    <p className='text-end mt-3 fs-5'>  {element.description}</p>
                    <span className='mt-3 me-1 ms-1 fs-4'> : </span>
                    <i class="fa-solid fa-file-medical mt-3 text-success fs-3 ms-2"></i>
                  </div>
                  <p className='text-end mt-2 fs-4'> {element.components} : <i class="fa-solid fa-mortar-pestle fs-4 text-success"></i></p>
                  <div className='d-flex justify-content-evenly'>
                    <p className='mt-3 text-end fs-6 w-75'>  {element.tradeMark} </p>
                    <span className='text-success text-end fs-5 mt-3 w-50 '>: اسم الشركات</span>
                  </div>
                  <button type='button' onClick={() => toggleDivPosition2(i)} className={`btn bg-success text-white mb-3 mt-3 z-2 position-relative buttonToShowHowToUse ${showDiv === i ? 'active' : ''}`}>طريقة الاستعمال</button>
                  <div className={`bg-success StyleLayerOfCardOfMedi w-100 h-100 position-absolute start-0 rounded-4 ${showDiv === i ? 'active' : ''}`} >
                    <div className='h-100 p-4 text-center d-flex justify-content-center'>
                      <p className='text-white fs-5 fw-bold align-self-center'>{element.howToUse}</p>
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
