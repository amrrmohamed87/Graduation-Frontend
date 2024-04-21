import { useState } from "react";
import CalculatorInput from "./CalculatorInput";

import calculator from "../assets/images/calculator.png";
import salad from "../assets/images/salad.png";

function CaloriesCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState("كَسُول");
  const [result, setResult] = useState(null);
  const [male, setIsMale] = useState(false);
  const [female, setIsFemale] = useState(false);

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

      default:
        totalCalories = 0;
    }

    setResult(
      `السعرات الحرارية اليومية المقدرة اللازمة: ${Math.round(
        totalCalories
      )} سعره `
    );
    setWeight("");
    setHeight("");
    setAge("");
    setGender("");
    setActivityLevel("كَسُول");
    setIsMale(false);
    setIsFemale(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section className="md:h-[700px]">
      <div className="flex justify-center">
        <div className="flex flex-col md:flex-row items-center p-8 bg-white rounded-[15px] shadow-sm md:border w-[1200px] md:h-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="bg-white border max-w-[550px] mt-6 rounded-[10px] shadow-md py-4 md:py-16 md:px-8">
              <div className="flex justify-center">
                <img src={salad} className="w-[60px]" />
              </div>
              <div className="flex justify-center items-center gap-3 mt-4 mb-2">
                <button
                  onClick={() => {
                    setIsMale(true);
                    setIsFemale(false);
                    setGender("ذكر");
                  }}
                  className={`shadow-sm rounded-[20px] py-4 px-20 text-[20px] ${
                    male
                      ? "bg-blue-400 border-none"
                      : "bg-transparent border border-gray-600"
                  }`}
                >
                  ذكر
                </button>
                <button
                  onClick={() => {
                    setIsFemale(true);
                    setIsMale(false);
                    setGender("أنثى");
                  }}
                  className={`shadow-sm rounded-[20px] py-4 px-20 text-[20px] transition-all duration-300 ${
                    female
                      ? "bg-pink-400 border-none"
                      : "bg-transparent border border-gray-600"
                  }`}
                >
                  أنثى
                </button>
              </div>
              <div className="flex md:gap-4">
                <CalculatorInput
                  placeholder="الطول(سم)"
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <CalculatorInput
                  placeholder="الوزن(كم)"
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <CalculatorInput
                  placeholder="العمر"
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="flex gap-2 md:gap-4">
                {/* <div className="flex flex-col">
                <label
                  htmlFor="gender"
                  className="text-right text-emerald-700 mb-2 md:text-[20px]"
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
              </div> */}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="activityLevel"
                  className="text-right mb-2 text-emerald-700"
                >
                  مستوى النشاط
                </label>
                <select
                  id="activityLevel"
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value)}
                  className="h-[30px] text-right bg-white  border border-gray-500 focus:border-gray-950 rounded-lg pr-2
                 md:w-full md:h-[35px] mx-2"
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
              </div>
              <div className="p-2 md:p-0">
                <button
                  onClick={calculate}
                  className={`py-2 w-full text-center mt-8 text-white   border border-gray-500 rounded-lg
                     transition-all duration-300 md:text-[20px] ${
                       female
                         ? "bg-pink-400 hover:bg-pink-600"
                         : "bg-emerald-500"
                     } ${
                    male ? "bg-blue-400 hover:bg-blue-500" : "bg-emerald-500"
                  }`}
                >
                  احسب
                </button>
              </div>
            </div>
          </form>
          <div className="m-4 md:m-0">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-center text-emerald-700 text-[22px]  md:text-[40px]">
                احسب سعراتك الحرارية
              </h1>
              <img src={calculator} className="w-[25px] md:w-[40px]" />
            </div>
            <p className="text-[17px] text-right mt-2 mb-4 md:text-[20px]">
              أدخل معلوماتك في النموذج أدناه وانقر على "احسب" لتحديد كمية
              السعرات الحرارية اليومية التي تتناولها
            </p>
            {result && (
              <p className="text-center text-[17px] text-emerald-600 mt-8 mb-8 md:text-right md:text-[30px]">
                {result}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaloriesCalculator;
