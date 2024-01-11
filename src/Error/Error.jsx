import Navbar from "../components/Navbar";

export default function Error() {
  return (
    <>
      <main className="m-16">
        <h1 className="font-bold text-3xl text-emerald-950 text-center">
          An error Occurred!
        </h1>
        <p className="text-2xl leading-7 text-center">
          Could not find this page
        </p>
      </main>
    </>
  );
}
