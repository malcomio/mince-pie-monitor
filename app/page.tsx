import {getAllPies} from "@/lib/api";
import {Score} from "@/lib/components/score";
import {Footer} from "@/lib/components/about";
import {Leaderboard} from "@/lib/components/leaderboard";
import Link from "next/link";

function Intro() {
    return (
        <section className="">
            <h1 className="bg-stone-50 shadow-xl rounded-lg md:flex-row flex justify-center p-8 mt-8 mb-16 md:mb-12 text-center mx-auto text-6xl md:text-8xl text-center font-bold tracking-tighter leading-tight md:pr-8">
                Máiréad's Mince Pie Monitor
            </h1>
        </section>
    );
}

function Pie({pie}: any) {
    return (
        <Link href={'/pies/' + pie.slug + '/'} className='pie__wrapper text-4xl mb-2 flex-col max-w-md'>
            <p className='mb-2'>{pie.title} </p>
            {pie.image && (
                <img className='pie__image' src={pie.image.url} alt={'Photo of ' + pie.title}/>
            )}
            <div className='mt-2'>
                <Score score={pie.rating}/>
            </div>
        </Link>
    )
}

function Podium({pie}: any) {
    return (
        <div className='rounded-lg text-5xl text-center bg-stone-50 shadow-xl  bg-stone-50 shadow-xl mx-auto p-3 max-w-md'>
            <h2 className='list-head mb-4'>
                <span className='mr-2'>🏅</span>
                The Best
                <span className='ml-2'>🏆</span>
            </h2>
            <div className='mt-4'>
                <Pie key={pie.slug} pie={pie}/>
            </div>
        </div>
    )
}

export default async function Page() {
    const pies = await getAllPies();

    return (
        <div className="container mx-auto px-5">
            <Intro/>
            <Podium pie={pies[0]}/>
            <Leaderboard pies={pies}/>
            <Footer />
        </div>
    );
}
