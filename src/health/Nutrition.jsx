import { motion } from "framer-motion";

import heroImage from "../assets/images/nutrition-hero.jpg";
import dietImage from "../assets/images/diet.jpg";
import benefits from "../assets/images/diets.png";
import CaloriesCalculator from "../components/CaloriesCalculator";
import Footer from "@/components/Footer";
import { healthyFood, healthyFoodTwo } from "@/data/constants";

function Nutrition() {
  const upwardMotionVariants = {
    offscreen: {
      opacity: 0,
      y: 500, // Start below the natural position
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.1, // Adjust the bounce effect, if spring type is used
        duration: 2,
      },
    },
  };
  const upwardMotionVariantsPattern = {
    offscreen: {
      opacity: 0,
      y: 200, // Start below the natural position
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.1, // Adjust the bounce effect, if spring type is used
        duration: 2,
      },
    },
  };

  const upwardMotionVariantsSecond = {
    offscreen: {
      opacity: 0,
      y: 300, // Start below the natural position
    },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Optional, for a spring-like effect
        bounce: 0.1, // Adjust the bounce effect, if spring type is used
        duration: 2,
      },
    },
  };

  const animationVariants = {
    hidden: {
      opacity: 0,
      y: 100, // Start below the viewport
    },
    visible: {
      opacity: 1,
      y: 0, // Move to natural position
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: 100, // Move below the viewport
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  return (
    <main>
      <section className="relative">
        <img
          src={heroImage}
          className="object-cover object-center w-full h-[932px] md:h-[800px]"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, amount: 0.7 }}
          variants={animationVariants}
          className="absolute inset-2 flex flex-col justify-center items-end mt-48 mr-2 md:mt-16 md:mr-4"
        >
          <h1 className="text-emerald-700 text-[70px]">التغذية</h1>
          <h1 className="text-emerald-700 text-[40px]">
            وتخطيط النظام الغذائي
          </h1>
        </motion.div>
      </section>
      <motion.section
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.7 }}
        variants={animationVariants}
        className="md:mb-36"
      >
        <h1 className="text-center text-emerald-700 text-[28px] mt-16 md:mb-10 md:mt-20 md:text-[45px]">
          التغذية الصحية
        </h1>
        <div className="mt-0 md:mt-4 p-4 md:p-8 md:flex md:items-center gap-8">
          <div className="bg-white border rounded-[10px] shadow-md mb-4 py-4">
            <div className="flex justify-center items-center gap-2">
              <h2 className="text-center mb-2 md:mb-6 pt-3 text-[17px] md:text-[25px]">
                فوائد الغذاء الصحي
              </h2>
              <img src={benefits} className="w-[32px]" />
            </div>
            <p className="text-right text-emerald-950 text-[17px] mx-4 mb-2 md:text-[20px] pl-0 md:pl-6 tracking-normal pb-2 mb:pb-8">
              أعظم ثروة في الحياة هي الصحة. لذلك، من الضروري أن تعتني بصحتك.
              واحدة من العناصر الأساسية لتصبح صحية هي التغذية السليمة. يعد تزويد
              جسمك بالطعام الصحي أسلوبًا مهمًا يجب اتباعه. اجعل صحتك أولوية
              ولاحظ أنها تغير كل جانب من جوانب حياتك
            </p>
          </div>
          <img
            src={dietImage}
            className="md:h-[380px] rounded-[10px] shadow-md"
          />
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.7 }}
        variants={animationVariants}
        className="mb-16"
      >
        <div className="flex flex-col md:flex-row justify-center gap-12 p-4">
          {healthyFood.map((food) => (
            <div
              key={food.src}
              className="flex flex-col justify-center items-end max-w[300px] md:max-w-[400px] bg-white rounded-[15px] border shadow-md p-4"
            >
              <div className="flex items-center gap-2">
                <img src={food.src} className="w-[30px]" />
                <h2 className="mt-2 md:text-[22px]">{food.label}</h2>
              </div>
              <p className="text-right md:text-[16px] mt-2">
                {food.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-12 p-4">
          {healthyFoodTwo.map((food) => (
            <div
              key={food.src}
              className="flex flex-col justify-center items-end max-w[300px] md:max-w-[400px] bg-white rounded-[15px] border shadow-md p-4"
            >
              <div className="flex items-center gap-2">
                <img src={food.src} className="w-[30px]" />
                <h2 className="mt-2 md:text-[22px]">{food.label}</h2>
              </div>
              <p className="text-right md:text-[16px] mt-2">
                {food.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: false, amount: 0.7 }}
        variants={animationVariants}
      >
        <CaloriesCalculator />
      </motion.section>
      <Footer />
    </main>
  );
}

export default Nutrition;
