import React, { useEffect, useState } from 'react'
import "../css/Search.css"
import Footer from '../components/Footer'
import SearchPhoto from "../assets/images/search.jpg"
import axios from 'axios'
export function DocSearch() {
    let [DocData, setDocData] = useState([])

    useEffect(() => {
        getDoctors()

    }, [])
    async function getDoctors() {
        let { data } = await axios.get('https://mhiproject.onrender.com/patient/getDoctors')
        setDocData(data.userD)
    }




    return (
        <>
            <header className="relative h-screen w-full ">
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
                    <div className='flex flex-column justify-content-evenly justify-content-center align-items-center text-center'>
                        <div className=' '>
                            <h2 className="text-black text-[80px]"> الاطباء </h2>
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon1">ابحث</button>
                                <input type="text" class="form-control text-right" placeholder="...بحث" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            </div>
                        </div>
                        {/* this div for result of the search  */}
                        <div className='w-50 mt-4 text-right p-4 border-3 border-black rounded-5 '>
                            <h2 className="text-black textStyleForH2"> احمد بخة  </h2>
                            <p className="mt-2 md:mt-0 textStyleForP"> دكتور عيون  </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='py-8 bg-white'>
                <div className="container">
                    <div className="row py-3 ">
                        {DocData.map((element, i) => <div key={i} className="col-md-4 rounded-5 border-4 mt-3">
                            <div className='py-3 ps-2 text-end'>
                                <h1 className='fs-3'>{element.name}</h1>
                                <span className='fs-5 '>id</span>
                                <h6 className='fs-6'> {element._id} </h6>
                                <h3 className='fs-5'>{element.specialize} </h3>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}