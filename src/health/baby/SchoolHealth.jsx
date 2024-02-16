import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function SchoolHealth() {
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
      <div className="flex flex-col justify-center items-center mb-12">
        <h1 className="text-emerald-800 text-[38px]">الصحة المدرسية</h1>
        <hr className="border-t-2 border-emerald-800 w-52 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :وجبة الإفطار
          </h1>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            وجبة الإفطار من الوجبات المهمة من الناحية الغذائية لأنها تأتي بعد
            مدة طويلة من آخر وجبة تم تناولها، حيث تساعد على زيادة النشاط
            والتحصيل العلمي لأنه يمد الجسم بالعناصر الذي يحتاجها.
          </p>
        </div>
      </section>
      <section className="mr-6 md:mr-12">
        <ul className="text-[18px] text-right mb-3 md:text-[24px] md:ml-80">
          <li>.يجب أن نتذكر أن الأكل بالإقناع وليس بالإكراه -</li>
          <li>.تشجيع الطلبة على ممارسة النشاط البدني -</li>
          <li>.على الأم التحلي بالصبر عند غرس العادات الصحية الغذائية -</li>
          <li>. وجبة الإفطار تساعد الطلبة على تنظيم الوجبات الثلاثة -</li>
          <li>.ينصح بتناول كأس ماء عند الاستيقاظ من النوم -</li>
        </ul>
      </section>
    </main>
  );
}

export default SchoolHealth;
