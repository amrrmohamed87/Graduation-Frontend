export default function Input({ label, id, ...props }) {
  return (
    <div className="mb-4 text-end ">
      <label
        htmlFor={id}
        className="block text-[0.8rem] md:text-xl mb-[0.2rem] text-[#dff6f6]"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="block w-full max-w-60 p-2 text-lg text-right rounded-2xl outline-none border bg-transparent"
      />
    </div>
  );
}
