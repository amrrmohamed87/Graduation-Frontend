import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import serviceImage from "../assets/images/service-section.png";
import services from "../assets/images/puzzle.png";
import protection from "../assets/images/protection.png";

export default function Services() {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/services");
  }

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: "100vw", // Starts off-screen to the left, 'vw' stands for viewport width
    },
    visible: {
      opacity: 1,
      x: 0, // Ends at its natural position
      transition: {
        duration: 0.9,
        ease: "easeInOut",
      },
    },
  };
  const leftMotionVariants = {
    offscreen: {
      opacity: 0,
      x: "500", // Starts from the left side off-screen
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

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

  return (
    <section className="lg:h-screen bg-white rounded-[30px] flex justify-between items-center max-lg:flex-col gap-10 w-full p-8  max-container mb-16">
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={leftMotionVariants}
        className="flex flex-1 flex-col items-end text-right"
      >
        <h2 className="text-[35px] md:text-[45px] font-bold mb-1 text-[#056558] lg:max-w-lg">
          الخدمات
        </h2>
        <h3 className="text-[22px] md:text-[28px] text-black lg:max-w-lg">
          المعجزة ليست أننا نقوم بهذا العمل، ولكننا سعداء للقيام بذلك
        </h3>
        <div className="bg-white shadow-md px-4 py-2 flex items-start gap-2 mt-4 mb-4">
          <p className="text-xl leading-[2.5rem] lg:max-w-lg md:text-[18px]">
            يقدم نظام التأمين الصحي المقترح خدمات رعاية صحية مريحة من خلال جدولة
            المواعيد مع الأطباء، ومعلومات الأدوية وتوافرها، والنصائح الصحية،
            والتصفية حسب أسماء الأطباء وتخصصاتهم
          </p>
          <img src={services} className="w-[30px] bg-emerald-100" />
        </div>
        <div className="bg-white shadow-md px-4 py-2 flex items-start gap-2 mt-4 mb-4">
          <p className="text-xl leading-[2rem] lg:max-w-lg md:text-[18px]">
            ويهدف البرنامج إلى تسهيل الوصول إلى الرعاية الصحية في مصر، وتعزيز
            التطبيب عن بعد، وتمكين الأفراد بالمعلومات، وتحسين صحة المجتمع بشكل
            عام
          </p>
          <img src={protection} className="w-[30px] bg-emerald-100" />
        </div>
        {/* 
        <div>
          <button
            onClick={navigateHandler}
            className="mt-3 px-2 py-2 bg-emerald-950 hover:bg-black text-white rounded-full w-36 text-xl font-bold"
          >
            الخدمات
          </button>
        </div> */}
      </motion.div>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={upwardMotionVariants}
        className="flex flex-1 justify-center items-center"
      >
        <img
          src={serviceImage}
          alt="service"
          className="object-contain rounded-3xl"
        />
      </motion.div>
    </section>
  );
}
