import Link from "next/link";

function Header() {
  return (
    <header>
        <h2 className="bg-stone-50 rounded-lg p-8 shadow-xl mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
                Máiréad's Mince Pie Monitor 2025
            </Link>
        </h2>
        <p className="bg-stone-50 shadow-xl md:flex-row flex justify-center p-4 mt-4 mb-8 md:mb-12 text-center mx-auto text-center tracking-tighter leading-tight md:pr-8"><a href="https://mincepie.red-route.org">View the latest Mince Pie Monitor</a></p>
    </header>
  );
}

export {Header};