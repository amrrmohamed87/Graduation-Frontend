import footerlogo from "../assets/images/MHI-Emerald.svg";
import copyrightSign from "../assets/icons/copyright-sign.svg";

import { footerLinks } from "../data/constants";
export default function Footer() {
  return (
    <section className="padding-x padding-t  pb-4">
      <footer className="max-container">
        <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
          <div className="flex flex-col items-start">
            <a href="/">
              <img src={footerlogo} width={150} height={46} />
            </a>
            <p className=" text-base  text-emerald-950 sm:max-w-sm">
              The Greatest Wealth Is Health, And Life With Insurance Create a
              Great wealth.
            </p>
          </div>

          <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
            {footerLinks.map((section) => (
              <div key={section.title}>
                <h4 className="text-emerald-950  text-2xl leading-normal font-medium mb-6">
                  {section.title}
                </h4>
                <ul>
                  {section.links.map((link) => (
                    <li
                      key={link.name}
                      className="mt-3 text-emerald-950  text-base leading-normal hover:text-slate-gray cursor-pointer"
                    >
                      <a>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between text-emerald-950 mt-24 max-sm:flex-col max-sm:items-center">
          <div className="flex flex-1 justify-start items-center gap-2  cursor-pointer">
            <img
              src={copyrightSign}
              alt="copyright"
              width={20}
              height={20}
              className="rounded-full m-0"
            />
            <p>Copyright. Misr Health Insurance.</p>
          </div>
          <p className=" cursor-pointer">Terms & Conditions</p>
        </div>
      </footer>
    </section>
  );
}
