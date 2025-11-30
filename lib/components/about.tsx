import Link from "next/link";

function About() {
    return (
        <h2 className="p-3 text-4xl">
            <Link href="/about/" className="hover:underline">
                About the Mince Pie Monitor
            </Link>
        </h2>
    );
}

function Scoring() {
  return (
    <div className='p-3'>
      <h2 className='text-3xl'>Scoring</h2>
      <p>Mince pies are rated out of 5, based on taste, texture, and value</p>
    </div>
  );
}

function Footer() {
    return (
        <footer className="bg-stone-50 shadow-xl mb-8 mt-8 rounded-lg">
            <About /> 
        </footer>
    );
}

export { About, Scoring, Footer };