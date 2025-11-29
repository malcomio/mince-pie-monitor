import Link from "next/link";

function Header() {
  return (
    <header>
        <h2 className="text-yellow-300 mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
            <Link href="/" className="hover:underline">
                Mairead's Mince Pie Monitor
            </Link>
        </h2>
    </header>
  );
}

export {Header};