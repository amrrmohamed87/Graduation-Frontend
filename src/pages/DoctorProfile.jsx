import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Dashboard from "../components/Dashboard";
function DoctorProfile() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const specialize = localStorage.getItem("specialize");
  return (
    <main>
      <Dashboard />
      <section className="mt-16">
        <div className="pl-6">
          <h1 className="text-emerald-950 text-[25px] md:text-[35px]">
            Welcome Doctor {name}
          </h1>
          <p className="text-emerald-950 text-[20px] md:text-[28px]">
            Dr/ {specialize}
          </p>
        </div>
      </section>
    </main>
  );
}

export default DoctorProfile;
