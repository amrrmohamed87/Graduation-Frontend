function Input({ id, label, icon, showPassword, ...props }) {
  return (
    <div className="flex flex-col mb-4 md:mb-8">
      <label
        htmlFor={id}
        className="text-right text-[#056550] mb-1 md:mb-2 text-[20px] md:text-[23px] lg:text-[26px]"
      >
        {label}
      </label>
      <div className="relative flex justify-center items-center">
        <input
          id={id}
          required
          {...props}
          className={`w-full rounded-lg h-[28px] md:h-[35px] lg:h-[40px] border-2 border-gray-400 focus:border-gray-950 pl-2 md:pl-3`}
        />
        {icon && (
          <div
            onClick={showPassword}
            className="absolute inset-y-0 right-0 pr-2 md:pr-3 flex items-center cursor-pointer"
          >
            <div className="text-sm md:text-base">{icon}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
