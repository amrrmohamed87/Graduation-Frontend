import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function AfterPregnancy() {
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
        <h1 className="text-emerald-800 text-[38px]">صحة المرأة بعد الحمل</h1>
        <hr className="border-t-2 border-emerald-800 w-80 mt-2" />
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 mb-4 md:text-[38px]">
            الرضاعة الطبيعية
          </h1>
          <h2 className="text-right text-[22px] font-bold">
            لمرحله الأمومة +الأمومة في اللحظة الاولى والتلامس الظاهري
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            حليب الأم هو الغذاء المثالي للطفل فهو مصمم ليوفر له جميع العناصر
            الغذائية من أجل نمو صحي، يتكيف حليب الثدي مع نمو الطفل لتلبية
            احتياجاته المتغيرة، كما يحميه من الالتهابات والأمراض، بالإضافة أنه
            سهل الحصول عليه ومتاح كلما احتاج إليه الطفل حيث تساهم الرضاعة
            الطبيعية في خلق علاقة حميمية قوية بين الأم والطفل وإشعاره بالحنان
            والدفء
          </p>
          <h2 className="text-right text-[22px] font-bold">
            الرضاعة الطبيعية في الساعة الأولى + علامات الجوع
          </h2>
          <p className="text-right  text-[22px] mb-6 ml-6">
            من المهم للغاية إرضاع الطفل حديث الولادة على الأقل من ثمانية إلى
            اثني عشر مرة في فترة 24 ساعة خلال الأسبوع الأول من حياته، كما يجب
            إطعام الطفل كلما أظهر علامات الجوع وقد تشمل (إصدار الأصوات أو الصراخ
            - البكاء - مص قبضة اليد أو الإصبع - وضع اليدين في الفم - وضع اليدين
            في الفم - تحريك الذراعين والساقين - إحكام إطباق القبضتين - تحريك
            الرأس عند لمس خده أو فمه)
          </p>
          <h2 className="text-right text-[22px] font-bold">
            اتجاهات الوضعية الصحيحة والأوضاع المختلفة للرضاعة{" "}
          </h2>
          <ul className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            <li>.قومي بلف ذراعيك حول ظهر الطفل، وتقريبه اتجاهك -</li>
            <li>.كما يمكنك استخدام عدد من الوسائد لدعم وضعية الطفل -</li>
            <li>.قربي طفلك إلى ثديك ولا تحني ظهرك -</li>
            <li>.تأكدي أن وضعية حلمة الثدي تلامس شفة الطفل العلوية -</li>
          </ul>
          <p className="text-right font-bold text-[22px] mb-6 ml-6">
            من الأفضل الإرضاع من الصدرين بالتناوب، أي إذا أرضعت الأم طفلها من
            أحد الصدرين تستخدم الآخر في الرضعة التالية وهكذا، والحرص على تنظيف
            الحلمة بقطعة قماش مبللة بالماء قبل الإرضاع
          </p>
        </div>
      </section>
    </main>
  );
}

export default AfterPregnancy;
