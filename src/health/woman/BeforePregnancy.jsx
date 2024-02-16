import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function BeforePregnancy() {
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
        <h1 className="text-emerald-800 text-[38px]">صحة المرأة قبل الحمل</h1>
        <hr className="border-t-2 border-emerald-800 w-80 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-2 md:text-[38px]">
            التخطيط ما قبل الحمل
          </h1>
          <p className="text-right p-4 text-[22px] font-bold">
            إن التخطيط ما قبل الحمل قد يساعد الزوجين على فهم كيفية تعزيز فرص
            للحصول على حمل صحي، كما لابد من تحديد زيارة قبل الحمل إلى الطبيب،
            حيث تعد هذه الزيارة مهمة لكل سيدة لا سيما إذا كانت أقل من عشرين أو
            تجاوزت الثلاثين من العمر، أو إذا كانت تعاني من أي حالات مرضية مزمنة،
            أو أي مخاوف خاصة
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[25px] text-emerald-800 mb-3 md:text-[38px] md:mb-2">
            :أمور لابد من معرفتها في زيارة ما قبل الحمل
          </h1>
          <h2 className="text-right text-[22px] font-bold">
            :التعرف على وسيلة الحمل المستخدمة
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-4">
            حتى يتيسر للطبيب تقدير موعد التبويض وموعد الحمل إذا مرت السيدة بدورة
            شهرية طبيعية واحدة على الأقل قبل الحمل
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :التأكد من الحصول على التطعيمات الضرورية
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            الجدري المائي (الحماق)، والحصبة الألمانية (الحميراء) لما لها من
            خطورة على الجنين، كما سيتم إعطاء التطعيمات بعد إجراء اختبارات الدم
            للتحقق من المناعة في حال لم تكن التطعيمات كاملة، ويفضل أن يكون ذلك
            قبل شهر على الأقل من محاولة الحمل
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :الأمراض المزمنة والأدوية أو المكملات الغذائية
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            إذا كانت السيدة تعاني من السمنة أو من حالات مرضية مزمنة (مثل: داء
            السكري، الربو، ارتفاع ضغط الدم، خلل في الغدة الدرقية أو الصرع) فلابد
            من ضبط حالة المرض قبل الحمل، وعند استخدام أدوية، أعشاب أو مكملات
            غذائية ففي بعض الحالات يتم تغيير الجرعات، تناول شيء آخر أو التوقف عن
            تناول المنتج قبل الحمل
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :العدوى المنقولة جنسيًا
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            إذا كانت السيدة معرضة لخطر الإصابة بعدوى منقولة جنسياً، أو تعتقد
            أنها أو شريكها مصاب بالعدوى فلا بد من إجراء فحوصات ما قبل الحمل
            للتشخيص والعلاج
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :تاريخ العائلة الطبي
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            إذا كان في العائلة أحد الأمراض الوراثية فيتعين معرفتها قبل الحمل؛
            ليتمكن الطبيب المعالج من تحويل السيدة إلى استشاري في الأمراض
            الوراثية لإجراء التقييم قبل الحمل
          </p>
          <h2 className="text-right text-[22px] font-bold">:عمر الزوجين</h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            كلما تقدمت السيدة بالسن، زاد خطر مشكلات الخصوبة وفقدان الحمل وحالات
            صبغية معينة، وبعض المضاعفات المتعلقة بالحمل (مثل: سكري الحمل)، كما
            قد يكون لعمر الأب دور في ذلك أيضًا
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :تاريخ الحمل السابق
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            يجب ذكر عدد مرات الحمل وطريقة الولادة وأي مضاعفات قد تعرضت لها
            السيدة أثناء الحمل والولادة وبعد الولادة، وولادة مواليد بتشوهات
            خلقية
          </p>
          <h1 className="text-[25px] text-emerald-800 mb-3 md:text-[38px] md:mb-2">
            :أهم التحضيرات التي يجب اتباعها
          </h1>
          <h2 className="text-right text-[22px] font-bold">:حمض الفوليك</h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            يجب أخذ 400 ميكروغرام (400 مكغ) من حمض الفوليك على شكل مكملات غذائية
            كل يوم أثناء المحاولة في الحمل حتى الاسبوع الـ 12 من الحمل؛ للتقليل
            من مخاطر إصابة الطفل بعيوب الانبوب العصبي، أما النساء المصابات
            بالصرع والسكري وولادة طفل بعيوب في الانبوب العصبي فينصحن بأخذ حمض
            الفوليك بجرعة 5 ميليغرام (5 ملغ)
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :المحافظة على وزن صحي
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            الوزن الزائد أو السمنة يزيد من مخاطر بعض مشاكل الحمل (مثل: ارتفاع
            ضغط الدم، جلطات الدم وسكري الحمل)، كما يمكن المحافظة على وزن صحي من
            خلال اتباع نظام غذائي متوازن وممارسة النشاط البدني
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :التوقف عن التدخين
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            حيث يرتبط بمشاكل صحية (مثل: الولادة المبكرة، انخفاض وزن المولود
            ومتلازمة موت الرضع المفاجئ)
          </p>
          <h2 className="text-right text-[22px] font-bold">
            :التوقف عن شرب الخمور
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            حيث يمكن أن تعبر إلى الجنين، كما قد يؤثر التعرض المفرط لها على نمو
            الطفل
          </p>
        </div>
      </section>
    </main>
  );
}

export default BeforePregnancy;
