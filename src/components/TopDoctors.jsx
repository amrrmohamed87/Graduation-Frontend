import { topDoctors } from "../data/constants";

export default function TopDoctors() {
  return (
    <section className=" flex justify-center items-center flex-col">
      <h1 className="text-center text-4xl font-bold text-emerald-950 mb-3">
        أفضل الأطباء
      </h1>
      <div className="w-1/3 border-b-2 rounded-full border-emerald-950"></div>
      <div className="container mt-8">
        <div className="flex justify-between items-center">
          {topDoctors.map((doctor) => (
            <div
              key={doctor.name}
              className="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 px-4"
            >
              <div className=" p-6 rounded-3xl flex justify-between items-center flex-col">
                <a href={doctor.href}>
                  <img
                    src={doctor.image}
                    width={200}
                    className="rounded-xl mb-4 shadow-2xl hover:animate-pulse"
                  />
                </a>
                <h3 className="text-emerald-950 text-2xl">{doctor.name}</h3>
                <p className="text-emerald-950 text-xl">
                  {doctor.specialization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/3 border-b-2 rounded-full border-emerald-950 mb-5"></div>
    </section>
  );
}
