import Icon from "../components/ContactIcon";
import { FaPhoneAlt } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";

function Contact() {
  return (
    <main>
      <header className="relative h-[50px] md:h-[90px] bg-emerald-950"></header>
      <section className="mt-10 mb-12 md:mb-0 md:mt-20">
        <div className="md:flex md:justify-center md:items-center">
          <div className="md:mr-16 md:ml-12 flex flex-col justify-center items-end p-4 text-end">
            <h1 className="text-emerald-950 text-2xl font-bold md:text-[45px] md:mb-8">
              تواصل معنا
            </h1>
            <hr className="w-1/2 ml-4 md:w-full text-end" />
            <p className="text-emerald-950 mt-4 md:mb-4">
              إذا كان لديك أي أسئلة أو استفسارات، فلا تتردد في الاتصال بنا. ونحن
              سوف نكون سعداء لمساعدتك
            </p>
            <Icon title="19195">
              <FaPhoneAlt size={20} className="text-emerald-950" />
            </Icon>
            <Icon title="القاهرة، مصر">
              <CiLocationArrow1 size={20} className="text-emerald-950" />
            </Icon>
            <Icon title="misrhealth@gmail.com">
              <MdOutlineAttachEmail size={20} className="text-emerald-950" />
            </Icon>
          </div>
          <div className="mx-2 p-2 md:mr-24 bg-white shadow-2xl h-[530px] rounded md:h-[400px] md:w-[600px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7292349.07065559!2d25.5801232234962!3d26.817128101479337!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14368976c35c36e9%3A0x2c45a00925c4c444!2sEgypt!5e0!3m2!1sen!2seg!4v1709126548943!5m2!1sen!2seg"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
