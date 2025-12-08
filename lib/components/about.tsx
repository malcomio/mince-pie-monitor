import Link from "next/link";

function About() {
    return (
        <div>
            <h2 className="p-3 text-4xl">
                <Link href="/about/" className="hover:underline">
                    About the Mince Pie Monitor
                </Link>
            </h2>
            <div className="p-3">
                <p>Welcome to the Mince Pie Monitor. I started sharing my thoughts on mince pies, after having a disappointing and pricey mince pie at a well known chain of establishments in London and the South East. An incident I have regaled many over the years. From that moment of culinary adversity, the mince pie monitor was born. The principles remain the same, judging is based on pasty, mincemeat, and cost - you could have the best pastry and mincemeat but if I need to raid my savings to pay for your tasty treats then they will be marked down. I hope you enjoy our thoughts, please share yours.</p>
            </div>
        </div>
    );
}

function Scoring() {
  return (
    <div className='p-3'>
      <h2 className='text-3xl'>Scoring</h2>
      <p>Mince pies are rated out of 5, based on pastry, mincemeat, and cost</p>
    </div>
  );
}

function Footer() {
    return (
        <footer className="bg-stone-50 shadow-xl mb-8 mt-8 rounded-lg">
            <About /> 
            <Scoring />
        </footer>
    );
}

export { About, Scoring, Footer };