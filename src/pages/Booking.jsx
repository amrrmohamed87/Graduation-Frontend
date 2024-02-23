import React from 'react'
import "../css/Booking.css"
import BgPhoto from "../assets/images/1.jpg"
import sectionsPhoto from "../assets/images/pexels-photo-5155774.webp"
import Footer from './../components/Footer';
export  function Booking() {
  return (
    <>
    <header className="relative h-screen w-full">
        <div className=" w-full h-screen">
          <img src={BgPhoto} className="object-cover object-center h-screen w-full" />
        </div>
        <div className="absolute inset-0 bg-black opacity-80"></div>
        <div className="absolute inset-2 left-4 md:inset-0 flex flex-1 flex-col justify-center text-right mr-2 md:mr-0 md:items-center">
          <h2 className="text-white text-[80px]"> الحجز </h2>
          <p className="text-slate-300 text-[40px] mt-2 md:mt-0 opacity-50">يمكنك بسهولة تحديد المواعيد وتلقي خدمات الرعاية الصحية في الوقت المناسب</p>
        </div>
      </header>
      <section className='bg-white py-6'>
        <h1 className='text-center text-6xl'> التخصصات</h1>
      </section>
      <section>
        <div className='container py-3'>
            <div className='row'>
                <div className='col-md-3  rounded-5 position-relative layer'>
                    <img src={sectionsPhoto} alt="photo"  className='rounded-5 '/>
                    <div className="position-absolute bg-black layerUp rounded-5 h-100 opacity-50 ">
                        <div>
                            <h1 className='text-white fs-1 fw-bold'>القلب</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <Footer/>
    </>
  )
}
