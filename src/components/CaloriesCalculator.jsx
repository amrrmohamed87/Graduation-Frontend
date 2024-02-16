import { useState } from "react";
import CalculatorInput from "./CalculatorInput";

function CaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("ذكر");
  const [activityLevel, setActivityLevel] = useState("كَسُول");
  const [result, setResult] = useState(null);

  function calculate() {
    //convert inputs to numbers by using parseFloat
    const parsedWeight = parseFloat(weight);
    const parsedheight = parseFloat(height);
    const parsedAge = parseFloat(age);

    //valiadtion
    if (isNaN(parsedWeight) || isNaN(parsedheight) || isNaN(parsedAge)) {
      setResult("الرجاء إدخال أرقام صحيحة للوزن والطول والعمر");
      return;
    }

    //Calculate bmr
    let bmr;

    if (gender === "ذكر") {
      bmr =
        88.362 +
        13.397 * parsedWeight +
        4.799 * parsedheight -
        5.677 * parsedAge;
    } else {
      bmr =
        447.593 +
        9.247 * parsedWeight +
        3.098 * parsedheight -
        4.33 * parsedAge;
    }

    //Calculate the total calories based on the activity level
    let totalCalories;

    switch (activityLevel) {
      case "كَسُول":
        totalCalories = bmr * 1.2;
        break;
      case "نشط طفيفة":
        totalCalories = bmr * 1.375;
        break;
      case "نشط إلى حد ما":
        totalCalories = bmr * 1.55;
        break;
      case "نشيط جدا":
        totalCalories = bmr * 1.725;
        break;
      case "نشط جدًا جدًا":
        totalCalories = bmr * 1.9;
        break;
      default:
        totalCalories = 0;
    }

    setResult(
      `السعرات الحرارية اليومية المقدرة اللازمة: ${Math.round(
        totalCalories
      )} سعره `
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="md:h-[700px]">
      <h1 className="text-center mt-8 text-[40px] text-emerald-800 mb-4 md:mt-12 md:mb-8 md:text-[60px]">
        احسب سعراتك الحرارية
      </h1>
      <div className="flex justify-between items-center">
        <form onSubmit={handleSubmit}>
          <div className="bg-emerald-700 rounded-[30px] shadow-2xl py-4 mx-4 md:ml-16 md:py-16 md:px-8">
            <div className="flex md:gap-4">
              <CalculatorInput
                label="الطول(سم)"
                type="number"
                id="height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
              <CalculatorInput
                label="الوزن(كم)"
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex gap-2 md:gap-6">
              <CalculatorInput
                label="العمر"
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <div className="flex flex-col md:mt-[0.01rem]">
                <label
                  htmlFor="gender"
                  className="text-right text-slate-100 mb-2 md:text-[28px]"
                >
                  الجنس
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-[180px] h-[30px] text-right bg-white  border border-gray-500 focus:border-gray-950 rounded-lg pr-2
                  md:w-[250px] md:h-[35px]"
                >
                  <option value="ذكر">ذكر</option>
                  <option value="أنثى">أنثى</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center gap-4 mx-4 md:flex-col md:mr-2 md:items-end">
              <div className="flex flex-col">
                <label
                  htmlFor="activityLevel"
                  className="text-right mb-2 text-slate-100"
                >
                  مستوى النشاط
                </label>
                <select
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="w-[180px] h-[30px] text-right bg-white  border border-gray-500 focus:border-gray-950 rounded-lg pr-2
                  md:w-full md:h-[35px]"
                >
                  <option value="كَسُول">
                    كَسُول (القليل من التمارين أو عدم ممارسة الرياضة)
                  </option>
                  <option value="نشط طفيفة">
                    نشط طفيفة (تمارين خفيفة/رياضة 1-3 أيام/أسبوع)
                  </option>
                  <option value="نشط إلى حد ما">
                    نشط إلى حد ما (تمارين معتدلة/رياضة 3-5 أيام/أسبوع)
                  </option>
                  <option value="نشيط جدا">
                    نشيط جدا (ممارسة التمارين الرياضية الشاقة 6-7 أيام في
                    الأسبوع)
                  </option>
                  <option value="نشط جدًا جدًا">
                    نشط جدًا جدًا (تمرين شاق جدًا/رياضة ووظيفة بدنية أو تدريب
                    مرتين)
                  </option>
                </select>
                <button
                  onClick={calculate}
                  className="w-[120px] h-[30px] text-center mt-8 text-emerald-600 bg-white  border border-gray-500 rounded-lg
                  md:ml-[4.5rem] md:w-[150px] md:h-[45px] hover:bg-[#dddd94] md:text-[28px]"
                >
                  احسب
                </button>
              </div>
            </div>
          </div>
        </form>
        <div>
          <p className="text-[25px] text-right mx-4 mb-4 md:text-[35px] md:mr-16 md:ml-28">
            أدخل معلوماتك في النموذج أدناه وانقر على "احسب" لتحديد كمية السعرات
            الحرارية اليومية التي تتناولها
          </p>
          {result && (
            <p className="text-center text-[23px] text-emerald-600 mt-8 mb-8 md:text-right md:mr-16 md:text-[30px]">
              {result}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default CaloriesCalculator;
