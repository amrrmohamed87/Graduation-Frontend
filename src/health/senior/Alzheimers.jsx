import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Alzheimers() {
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
        <h1 className="text-emerald-800 text-[38px]">الزهايمر</h1>
        <hr className="border-t-2 border-emerald-800 w-36 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            :نبذة مختصرة
          </h1>
          <p className="text-right text-[22px] mb-6 ml-6">
            ليس كل نسيان يعني الزهايمر، حيث أن الزهايمر هو تلف يصيب أجزاء
            التفكير والذاكرة والكلام في المخ وهو أخطر بكثير من النسيان. الزهايمر
            ليس مرحلة طبيعية من مراحل الشيخوخة، لكن احتمال الإصابة به يتزايد مع
            تقدم العمر. مرض الزهايمر من أكثر أنواع الخرف شيوعًا حيث يصيب النساء
            بنسبة أعلى من الرجال. على الرغم من أن الزهايمر هو مرض لا شفاء منه،
            إلا إن هنالك علاجات قد تحسن جودة حياة مَن يعانون منه. يمر المصاب
            بعدة مراحل ولا تظهر الأعراض دفعةً واحدة، ويستمر بالتقدم بسرعة مختلفة
            من شخص لآخر
          </p>
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            :تعريف المرض
          </h1>
          <p className="text-right text-[22px] mb-6 ml-6">
            هو ضمور في خلايا المخ السليمة ينتج عنه تراجع مستمر في الذاكرة وفي
            القدرات العقلية والذهنية، وهو السبب الأكثر شيوعًا للخرف، والذي يؤذي
            المهارات العقلية والاجتماعية مما يؤدي إلى إعاقة الأداء اليومي في
            الحياة العادية ويزداد تدهورًا بمرور الوقت
          </p>
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            :المراحل
          </h1>
          <h2 className="text-right text-[22px] font-bold">
            :المرحلة المبكرة (الأعراض غير واضحة) -
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            صعوبة اختيار الكلمة المناسبة أو الاسم أثناء الكلام. صعوبة حفظ أسماء
            الأشخاص الجدد. صعوبة أداء المهام الاجتماعية والمهنية. نسيان ما قرأه
            قبل فترة قصيرة. ضياع الأغراض الثمينة ووضعها في غير أماكنها المناسبة.
            صعوبة التخطيط والتنظيم
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :المرحلة المتوسطة (تبدأ الأعراض بالوضوح) -
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            صعوبة تذكر الأحداث المهمة والتاريخ الشخصي. تقلبات المزاج والميل إلى
            العزلة. صعوبة تذكر عنوان المنزل أو رقم الهاتف الشخصي أو الجامعة التي
            تخرج منها. الارتباك بخصوص التاريخ، يوم الأسبوع، الموسم أو المكان.
            الحاجة إلى المساعدة في اختيار الثياب المناسبة. البعض يواجه صعوبة في
            التحكم بعمليات الإخراج. تغير نظام النوم. تزداد خطورة الضياع في
            الطرق. تغيرات في الشخصية، مثل: الشك المَرَضي، وتكرار بعض التصرفات
            (مثل هز اليدين أو تمزيق المناديل)
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :المرحلة المتأخرة -
          </h2>
          <p className="text-right text-[22px] mb-6 ml-6">
            الحاجة إلى العناية والمراقبة طوال الوقت. ضعف الوعي بالأمور التي تحدث
            حوله. مواجهة مشاكل في القدرات الجسدية، مثل: المشي والجلوس إلى أن يصل
            إلى صعوبة البلع. صعوبة التواصل مع الآخرين. يكون عرضة للإصابة
            بالأمراض المعدية، مثل: التهاب الرئة (النيمونيا)
          </p>
        </div>
      </section>
    </main>
  );
}

export default Alzheimers;
