import app from "../assets/images/app.jpg";
import play from "../assets/images/play.jpg";
import download from "../assets/images/download.png";
function DownLoadApp() {
  return (
    <section className="md:h-screen">
      <div className="bg-white shadow-xl rounded-2xl p-4 m-4">
        <h1 className="text-emerald-950 text-center text-[20px] mb-6 md:text-[40px]">
          قم بتحميل برنامج مصر للتأمين الصحي
        </h1>
        <div className="flex flex-col justify-center items-center md:flex-row">
          <div className="flex flex-col justify-center items-center md:w-1/2 md:pr-28">
            <p className="text-emerald-950 text-end text-[20px] md:text-[28px]">
              قم بتنزيل تطبيقنا الآن، حيث تجتمع الراحة مع التكنولوجيا المتطورة!
              افتح عالمًا من الإمكانيات من خلال تطبيقنا سهل الاستخدام الذي يلبي
              جميع احتياجاتك. سواء كنت أثناء التنقل أو مسترخي في المنزل، فقد تم
              تصميم تطبيقنا لجعل تجربتك سلسة وممتعة
            </p>
            <div className="flex justify-center items-center gap-4">
              <img src={app} className="w-[120px] md:w-[200px] rounded-2xl" />
              <img src={play} className="w-[120px] md:w-[200px] rounded-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <img src={download} className="h-[400px] rounded-xl md:h-[500px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownLoadApp;

{
  /**<div className="flex flex-col justify-center items-center md:flex-row">
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-white text-end text-[20px] leading-[30px] md:text-[25px] md:leading-[45px]">
              قم بتنزيل تطبيقنا الآن، حيث تجتمع الراحة مع التكنولوجيا المتطورة!
              افتح عالمًا من الإمكانيات من خلال تطبيقنا سهل الاستخدام الذي يلبي
              جميع احتياجاتك. سواء كنت أثناء التنقل أو مسترخي في المنزل، فقد تم
              تصميم تطبيقنا لجعل تجربتك سلسة وممتعة
            </p>
            <div className="flex justify-center items-center gap-4">
              <img src={app} className="w-[120px] md:w-[200px] rounded-2xl" />
              <img src={play} className="w-[120px] md:w-[200px] rounded-2xl" />
            </div>
          </div>
          <div className="mt-4">
            <img src={download} className="rounded-2xl h-[400px] md:h-auto" />
          </div>
        </div> */
}
