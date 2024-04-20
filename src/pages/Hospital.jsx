import Dashboard from "../components/Dashboard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/DoctorDashboard.css"
function Hospital() {
  const name = localStorage.getItem("name");
  const hsopital = localStorage.getItem("hospital");

  // ramez work get hospitals
 
  // ------------------------
  // search for doctors in hospitals
  // ---------------------------
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
      
    </>
  );
}
export default Hospital;
