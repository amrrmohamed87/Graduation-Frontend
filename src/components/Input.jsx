export default function Input({ label, id, error, ...props }) {
  return (
    <div className="mb-4 text-end ">
      <label
        htmlFor={id}
        className="block text-[0.8rem] md:text-2xl mb-[0.2rem] text-black"
      >
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="block w-full max-w-60 p-2 text-lg text-right rounded-2xl  border bg-transparent"
      />
      <div className="mt-2">
        {error && <p className="text-[red]">{error}</p>}
      </div>
    </div>
  );
}
