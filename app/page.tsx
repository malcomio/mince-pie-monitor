import {getAllPies} from "@/lib/api";
import {Score} from "@/lib/components/score";
import {Scoring} from "@/lib/components/about";
import {Leaderboard} from "@/lib/components/leaderboard";

function Intro() {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-16 md:mb-12">
            <h1 className="text-yellow-300 mx-auto text-6xl md:text-8xl text-center font-bold tracking-tighter leading-tight md:pr-8">
                Mairead's Mince Pie Monitor
            </h1>
        </section>
    );
}

function Pie({pie}: any) {
    return (
        <a href={'/pies/' + pie.slug} className='pie__wrapper text-4xl mb-2 flex-col max-w-md'>
            <p className='mb-2'>{pie.title} </p>
            {pie.image && (
                <img className='pie__image' src={pie.image.url} alt={'Photo of ' + pie.title}/>
            )}
            <div className='mt-2'>
                <Score score={pie.rating}/>
            </div>
        </a>
    )
}

function Podium({pie}: any) {
    return (
        <div className='rounded-lg text-5xl text-center bg-stone-50  bg-stone-50 mx-auto p-3 max-w-md'>
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
            <Scoring/>
        </div>
    );
}
