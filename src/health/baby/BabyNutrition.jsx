import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function BabyNutrition() {
  return (
    <main>
      <section className="m-4 mb-12 md:mb-8">
        <button>
          <Link
            to="/health-awareness"
            className="flex items-center gap-4 bg-white shadow-2xl rounded-[30px] px-6 py-2 md:gap-8"
          >
            <IoArrowBackCircleSharp size={40} className="text-emerald-700" />
            <p className="text-emerald-800 md:text-[25px]">الرجوع</p>
          </Link>
        </button>
      </section>
      <div className="flex flex-col justify-center items-center mb-8">
        <h1 className="text-emerald-800 text-[38px]">تغذية الطفل</h1>
        <hr className="border-t-2 border-emerald-800 w-52 mt-2" />
        <p className="text-right p-4 text-[22px] font-bold">
          الغذاء الصحي هو الذي يساعد الإنسان على تطوير وتحسين صحته العامة والتي
          من شأنها أن تضمن له القيام بالنشاط اليومي بكفاءة وفعالية
        </p>
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            هنالك وسائل تساعد الطفل على إنقاص وزنه بدون التأثير على نموه، والتي
            تهدف إلى المحافظة على ثبات الوزن لحين زيادة طوله، وهي
          </h1>
          <ul className="text-[18px] text-right mb-3 md:text-[24px] md:ml-80">
            <li>.شرب كوبين من الماء قبل الأكل -</li>
            <li>.تقليل كمية السكر بالمشروبات تدريجيًا -</li>
            <li>.يفضل أن تكون منتجات الألبان قليلة الدسم -</li>
            <li>.عدم تناول نوعين من النشويات في نفس الوجبة -</li>
            <li>.تجنب تناول الفاكهة أو الحلويات بعد الأكل مباشرةً -</li>
            <li>.تجنب استخدام مصطلح حمية غذائية أو رجيم -</li>
            <li>.جعل كل المحيطين بالطفل يتبعون نفس العادات الصحية -</li>
            <li>.جعل الاختيارات المتاحة عند الجوع صحية قدر الإمكان -</li>
          </ul>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            :أمراض تؤثر على نمو الطفل
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            سوء التغذية - الأمراض الجينية - اضطرابات الهرمونات - فقر الدم
          </p>
        </div>
      </section>
    </main>
  );
}

export default BabyNutrition;
