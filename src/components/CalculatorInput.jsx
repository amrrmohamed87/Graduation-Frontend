import { useEffect, useRef } from "react";

function CalculatorInput({ label, placeholder, id, ...props }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const currentInput = inputRef.current;
    const preventScroll = (event) => {
      event.preventDefault();
    };

    if (currentInput) {
      currentInput.addEventListener("wheel", preventScroll);
    }

    return () => {
      if (currentInput) {
        currentInput.removeEventListener("wheel", preventScroll);
      }
    };
  }, []);

  return (
    <div className="flex flex-col mb-6 mx-2">
      <label
        htmlFor={id}
        className="text-right text-emerald-700 mb-2 md:text-[20px]"
      >
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        ref={inputRef}
        {...props}
        style={{
          WebkitAppearance: "none",
          MozAppearance: "textfield",
        }}
        className="appearance-none bg-white text-right pr-4 h-[25px] w-full border border-gray-500 focus:border-gray-950 rounded-lg
         md:h-[30px]"
      />
    </div>
  );
}

export default CalculatorInput;
