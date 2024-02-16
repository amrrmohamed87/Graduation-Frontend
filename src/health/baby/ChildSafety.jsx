import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function ChildSafety() {
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
        <h1 className="text-emerald-800 text-[38px]">سلامة الطفل</h1>
        <hr className="border-t-2 border-emerald-800 w-52 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :سلامة الطفل في السيارة
          </h1>
          <h2 className="font-bold text-[22px] mb-3 md:text-[32px]">
            :أهمية مقعد الطفل في السيارة -
          </h2>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            تسبب الحوادث المرورية وفيات الكثير من الأطفال كل عام، فقد ازدادت
            الحوادث منذ عام 2015 وقد يعود ذلك لعدة أسباب (مثل تشتت السائق)، حيث
            يصعب منع حدوثها إذا كان السائق يستخدم الأجهزة الذكية أثناء القيادة،
            حتى وإن كانت قيادة الشخص سليمة فإن ذلك لا يعني أن السائقين الآخرين
            كذلك. إن التزام الطفل بالجلوس في المقاعد الخلفية، واستخدام المقعد
            المخصص له في السيارة والمناسب لعمره وكذلك تركيبه بشكل صحيح يساعد على
            حمايته، ويقلل من احتمالية إصابته، ويمنع حدوث الإصابات الخطيرة عند
            حصول الحوادث المرورية، حيث أن الأطفال هم أول ضحايا هذه الحوادث
          </p>
          <h2 className="font-bold text-[22px] mb-3 md:text-[32px]">
            :إرشادات عند اختياره
          </h2>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            لا يوجد ما يسمى "أفضل" أو "أكفأ" مقعد، فجميعها تعتمد على عمر وحجم
            الطفل، وكذلك التركيب الصحيح والاستخدام بشكل مناسب. ارتفاع سعر المقعد
            لا يعني بالضرورة أنه الأفضل. ينصح بأن تكون البطانة داعمة للرأس؛
            لضمان راحة الطفل خاصة أثناء السفر. التأكد من قابلية القماش على
            امتصاص الرطوبة، وإمكانية نزعه وتنظيفه، وجود المظلة يحمي الطفل من
            أشعة الشمس. أن يكون سهل النزع والتركيب في عربة الطفل
          </p>
        </div>
      </section>
      <section className="mb-28">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :سلامة الطفل في المنزل
          </h1>
          <h2 className="font-bold text-[22px] mb-3 md:text-[32px]">
            :أكثر الحوادث شيوعًا -
          </h2>
          <ul className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            <li>العبث بالمواد الكيميائية (الأدوية والمنظفات وغيرهم)</li>
            <li>المشاكل المتعلقة بالألعاب</li>
            <li>السقوط و الحروق</li>
          </ul>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            و يمكن أن تحدث الإصابات والحوادث المنزلية في أي وقت، فبعض مسبباتها
            واضحة والبعض الآخر قد لا تتم ملاحظته، وهنالك إرشادات للوقاية من
            الحوادث في كل من الأماكن التالية (المطبخ - غرفة النوم - دورات
            المياه)
          </p>
        </div>
      </section>
    </main>
  );
}

export default ChildSafety;
