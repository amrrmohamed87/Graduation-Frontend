import Dashboard from "../components/Dashboard";
function Hospital() {
  const name = localStorage.getItem("name");
  const hsopital = localStorage.getItem("hospital");
  return (
    <main>
      <Dashboard />
      <section className="mt-16">
        <div className="pl-6">
          <h1 className="text-emerald-950 text-[25px] md:text-[35px]">
            {name} Hospital
          </h1>
          <p className="text-emerald-950 text-[20px] md:text-[28px]">
            address/ {hsopital}
          </p>
        </div>
      </section>
    </main>
  );
}
export default Hospital;
