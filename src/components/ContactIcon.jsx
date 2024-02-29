function Icon({ children, title }) {
  return (
    <div className="flex justify-start items-center gap-2 ml-4 mb-4 mt-2">
      <p className="ml-2 text-emerald-950 font-thin hover:font-bold cursor-pointer">
        {title}
      </p>
      {children}
    </div>
  );
}

export default Icon;
