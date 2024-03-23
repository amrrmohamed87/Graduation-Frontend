function TextArea({ id, label, ...props }) {
  return (
    <div className="flex flex-col justify-start items-end mb-4">
      <label htmlFor={id} className="text-gray-800 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        required
        {...props}
        className="h-[40px] w-full border-2 border-gray-300 focus:border-gray-950 rounded-lg pl-2
          md:h-[50px]"
      />
    </div>
  );
}

export default TextArea;
