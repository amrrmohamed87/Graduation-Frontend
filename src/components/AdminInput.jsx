function Input({ id, label, ...props }) {
  return (
    <div className="flex flex-col justify-start items-end mb-4">
      <label htmlFor={id} className="text-white mb-2">
        {label}
      </label>
      <input
        id={id}
        required
        {...props}
        className="h-[30px] border-2 border-emerald-700 focus:border-gray-950 rounded-lg pl-2
        md:h-[40px]"
      />
    </div>
  );
}

export default Input;
