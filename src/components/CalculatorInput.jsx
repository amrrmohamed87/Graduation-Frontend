function CalculatorInput({ label, id, ...props }) {
  return (
    <div className="flex flex-col mb-6 mx-2">
      <label
        htmlFor={id}
        className="text-right text-slate-100 mb-2 md:text-[28px]"
      >
        {label}
      </label>
      <input
        id={id}
        required
        {...props}
        className="bg-white text-right pr-2 h-[30px] w-[180px] border border-gray-500 focus:border-gray-950 rounded-lg
        md:w-[250px] md:h-[35px]"
      />
    </div>
  );
}

export default CalculatorInput;
