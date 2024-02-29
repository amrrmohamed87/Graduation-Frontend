function Input({ id, label, icon, showPassword, ...props }) {
  return (
    <div className="flex flex-col mb-8">
      <label
        htmlFor={id}
        className="text-right text-white mb-2 text-[23px] md:text-[26px]"
      >
        {label}
      </label>
      <div className="relative flex justify-center items-center">
        <input
          id={id}
          required
          {...props}
          className={`h-[30px] border-2  border-emerald-700 focus:border-gray-950 rounded-lg pl-2
        md:h-[40px]`}
        />
        {icon && (
          <div
            onClick={showPassword}
            className="absolute inset-y-0 right-0 md:pr-3 flex items-center cursor-pointer w-8"
          >
            {icon}
          </div>
        )}
      </div>
      {/* <div className="mt-2">
      ${error && "border-red-500 border-[2px]"}
        {error && <p className="text-[red] text-right">{error}</p>}
      </div> */}
    </div>
  );
}

export default Input;
