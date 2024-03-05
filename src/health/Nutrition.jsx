import heroImage from "../assets/images/nutrition-hero.jpg";
import dietImage from "../assets/images/diet.jpg";
import CaloriesCalculator from "../components/CaloriesCalculator";

function Nutrition() {
  return (
    <main>
      <section className="relative">
        <img
          src={heroImage}
          className="object-cover object-center w-full h-[932px] md:h-[700px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <div className="absolute inset-2 flex flex-col justify-center items-end mt-48 mr-2 md:mt-16 md:mr-4">
          <h1 className="text-emerald-700 text-[70px]">التغذية</h1>
          <h1 className="text-emerald-700 text-[40px]">
            وتخطيط النظام الغذائي
          </h1>
        </div>
      </section>
      <section className="md:h-screen">
        <h1 className="text-center text-emerald-700 text-[40px] mt-16 md:mb-12 md:mt-36 md:text-[60px]">
          فوائد الغذاء الصحي
        </h1>
        <div className="mt-4 md:flex md:items-center">
          <p className="text-right text-emerald-950 text-[25px] mx-4 mb-2 md:text-[35px]">
            أعظم ثروة في الحياة هي الصحة. لذلك، من الضروري أن تعتني بصحتك. واحدة
            من العناصر الأساسية لتصبح صحية هي التغذية السليمة. يعد تزويد جسمك
            بالطعام الصحي أسلوبًا مهمًا يجب اتباعه. اجعل صحتك أولوية ولاحظ أنها
            تغير كل جانب من جوانب حياتك
          </p>
          <img
            src={dietImage}
            className="p-4 md:h-[450px] rounded-[50px] shadow-amber-50"
          />
        </div>
      </section>
      <section>
        <CaloriesCalculator />
      </section>
    </main>
  );
}

export default Nutrition;
