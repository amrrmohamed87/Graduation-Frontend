import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Vaccinations() {
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
        <h1 className="text-emerald-800 text-[38px]">التطعيمات</h1>
        <hr className="border-t-2 border-emerald-800 w-52 mt-2" />
        <p className="text-right p-4 text-[22px] font-bold">
          التطعيمات هي حجر الأساس للصحة العامة، وهي وسيلة يتم بواسطتها حماية
          الشخص من الإصابة بالأمراض المعدية
        </p>
      </div>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :اللقاحات
          </h1>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            يحتوي اللقاح على بكتيريا أو فيروسات ميتة أو ضعيفة (بحيث لا تملك
            القدرة على إحداث المرض)، ويتم إعطاؤها للشخص بحيث تحفّز الجهاز
            المناعي في الجسم للتعرف عليهم، وإنتاج أجسام مضادة تتعرف على الميكروب
            بشكل مبكر، وبالتالي يقوم بمحاربته إذا دخل الجسم مرة أخرى ويمنع حدوث
            المرض. وهي وسيلة سهلة وآمنة للجميع حيث أنها تخضع لاختبارات السلامة
            قبل الموافقة عليها، وتتم مراقبة نتائجها باستمرار.
          </p>
        </div>
      </section>
      <section className="mb-8">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :الفئات المستهدفة
          </h1>
          <ul className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            <li>.الرضع -</li>
            <li>.الأطفال -</li>
            <li>.النساء الحوامل -</li>
            <li>.كبار السن -</li>
            <li>
              .المصابون بضعف في الجهاز المناعي بسبب الخضوع لعلاج السرطان -
            </li>
            <li>.المصابون بأمراض مزمنة -</li>
            <li>.الحجاج -</li>
            <li>.المسافرون لمناطق موبوءة -</li>
          </ul>
        </div>
      </section>
      <section className="mb-28">
        <div className="text-right mr-6 md:mr-12">
          <h1 className="text-[28px] text-emerald-800 md:text-[38px]">
            :أنواع اللقاحات
          </h1>
          <p className="text-[18px] mb-3 md:text-[24px] md:ml-80">
            توجد عدة أنواع من اللقاحات، ويعمل كل نوع على تنشيط الجهاز المناعي
            لمحاربة نوع معين من الميكروبات والأمراض التي تسببها، وتشمل (اللقاحات
            الحية المضعفة - اللقاحات غير النشطة - اللقاحات الفرعية / المترافقة -
            تطعيمات التسمم (السمية))
          </p>
        </div>
      </section>
    </main>
  );
}

export default Vaccinations;
