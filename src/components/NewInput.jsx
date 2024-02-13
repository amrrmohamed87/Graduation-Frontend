function Input({ id, label, error, ...props }) {
  return (
    <div className="flex flex-col mb-8">
      <label
        htmlFor={id}
        className="text-right mb-1 text-[23px] md:text-[26px]"
      >
        {label}
      </label>
      <input
        id={id}
        required
        {...props}
        className={`h-[30px] border border-gray-500 focus:border-gray-950 rounded-lg pl-2
        md:h-[40px] ${error && "border-red-500 border-[2px]"} `}
      />
      <div className="mt-2">
        {error && <p className="text-[red] text-right">{error}</p>}
      </div>
    </div>
  );
}

export default Input;
