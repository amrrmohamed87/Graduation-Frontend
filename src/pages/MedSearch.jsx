import React from 'react'
import "../css/Search.css"
import Footer from '../components/Footer'
import SearchPhoto from "../assets/images/search.jpg"
export function MedSearch() {
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
      <section className='py-8 flex justify-content-center align-items-center bg-white'>
        <div className='container-xxl'>
          <div className='flex flex-column justify-content-center align-items-center text-center'>
            <div>
            <h2 className="text-black text-[80px]"> الأدوية </h2>
            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1">ابحث</button>
                                <input type="text" class="form-control text-right" placeholder="...بحث" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            </div>
            </div>
            {/* this div for result of the search  */}
            <div className='w-50 text-left mt-4 p-4 border-3 border-black rounded-5 '> 
            <h2 className="text-black textStyleForH2"> panadol </h2>
            <p className="mt-2 md:mt-0 textStyleForP">Paracetamol (Panadol, Calpol, Alvedon) is an analgesic and antipyretic drug that is used to temporarily relieve mild-to-moderate pain and fever. It is commonly included as an ingredient in cold and flu medications and is also used on its own. </p>
              </div>
          </div>
        </div>
      </section>
      
     
      <Footer />
    </>
  )
}
