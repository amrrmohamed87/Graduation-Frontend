import React from 'react'
import "../css/Search.css"
import Footer from '../components/Footer'
import SearchPhoto from "../assets/images/search.jpg"
import SectionPhoto from "../assets/images/Search-Drug-Monitoring-Checker.jpg"
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
          <form>
            <div className='d-flex w-100 justify-content-center '>
              <button type='button' className='btn btn-info rounded-5'>
                <i className="fa-solid fs-3 text-info fa-magnifying-glass"></i>
              </button>
              <input type="text" className='w-50 form-control text-end  rounded-5' placeholder='.....ابحث عن الادوية'/>
            </div>    
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}
