import Link from "next/link";

function Header() {
  return (
    <header>
        <h2 className="bg-stone-50 rounded-lg p-8 shadow-xl my-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
                Máiréad's Mince Pie Monitor
            </Link>
        </h2>
    </header>
  );
}

export {Header};