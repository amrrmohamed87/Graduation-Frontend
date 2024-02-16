import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Birth() {
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
        <h1 className="text-emerald-800 text-[38px]">الولادة</h1>
        <hr className="border-t-2 border-emerald-800 w-36 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            قص العجان
          </h1>
          <h2 className="text-right text-[22px] font-bold">
            مالمقصود بقص العجان؟
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            أرضية الحوض هي مجموعة من العضلات تقوم بدور الدعامة لأعضاء الحوض، (
            المثانة، والرحم، والمستقيم). كما تساعد عند قبضها وإرخائها على التحكم
            في عمليتيّ التبول والتغوط. والعجان هو مجموعة من العضلات بين المهبل
            وفتحة الشرج
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :ويمكن حماية أرضية الحوض والعجان
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            بالتغذية الصحية السليمة - الإكثار من شرب السوائل - تمارين اللياقة
            العامة - تمارين الحوض وأرضيته من قبل الحمل وخلاله وفي فترة النفاس
          </p>
          <h2 className="text-right text-[22px] font-bold">ما هو قص العجان؟</h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            قطع جراحي بواسطة المقص لأنسجة قناة الولادة قبيل ولادة رأس الجنين.
            المبررات الطبية له(تسريع الولادة نظرًا لضعف نبضات قلب الجنين -
            احتياج الطبيب لاستخدام الملقط الولادي أو الشفاط)
          </p>
          <h2 className="text-right text-[22px] font-bold">
            ما هي مضار قص العجان؟
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            زيادة احتمال النزف بعد الولادة. احتمالية إصابة الجرح بـ التهابات
            جرثومية. ألم مزمن بالمنطقة. زيادة احتمالية امتداد قص العجان للشرج
            والمستقيم ومضاعفاته. زيادة احتمالية القص والشق في الولادة التالية
          </p>
          <p className="text-right text-[22px] mb-6 ml-6">
            لا يوجد برهان علمي على أن هناك حاجة لقص العجان للمرأة البكرية بل قد
            يسبب ذلك الكثير من المشاكل وبإمكانها أن تلد دون قص المنطقة
          </p>
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            :خلال الولادة
          </h1>
          <p className="text-right text-[22px] mb-6 ml-6">
            سيساعدك مقدم الرعاية الصحية وقت المخاض بكل صبر ويقدم الدعم اللازم
            لحماية منطقة العجان عبر السماح لك بـاتخاذ الوضعيات المستقيمة، وعدم
            تقيِيدك بالسرير و وضع الكمادات الدافئة على المنطقة خلال الطور الثاني
            من الولادة و دعم المنطقة عند خروج الجنين للتّقليل من تمزّقها، وعدم
            القص دون مبرر طبي
          </p>
        </div>
      </section>
    </main>
  );
}

export default Birth;
