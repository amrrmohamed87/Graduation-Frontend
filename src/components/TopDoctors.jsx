import { topDoctors } from "../data/constants.js";

export default function TopDoctors() {
  return (
    <section className="max-container mb-16">
      <h1 className="text-center text-4xl font-bold text-emerald-950">
        أفضل الأطباء
      </h1>
      <div className="mt-20 flex flex-1 justify-evenly items-center max-lg:flex-col gap-14">
        {topDoctors.map((doctor) => (
          <div
            key={doctor.name}
            className="flex justify-center items-center flex-col"
          >
            <a href={doctor.href}>
              <img
                src={doctor.image}
                alt={doctor.name}
                className="object-cover rounded-xl w-[150px] h-[150px]"
              />
            </a>
            <h3 className="mt-3 text-3xl text-center font-bold text-emerald-950">
              {doctor.name}
            </h3>
            <p className="mt-2 max-w-sm text-center text-lg leading-7 text-emerald-950">
              {doctor.specialization}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
