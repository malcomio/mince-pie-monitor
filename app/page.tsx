import {draftMode} from "next/headers";

import {getAllPies} from "@/lib/api";

function Intro() {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
                Mince Pie Monitor
            </h1>
        </section>
    );
}

function Score({score}) {
    const hasHalfPoint = score % 1 !== 0;
    return (
        <div className='pie__score'>
            {
                Array.from({length: score}, (_, i) => (
                    <span key={i}>🎄</span>
                ))
            }
            {hasHalfPoint && <span>🌲</span>}
        </div>
    )
}

function Pie({pie}) {
    return (
        <a href={pie.slug} className='pie__wrapper text-4xl'>
            <li className='pie'>
                <p className='pie__name'>{pie.title} </p>
                {pie.image && (
                    <img className='pie__image max-w-md' src={pie.image.url} alt={'Photo of ' + pie.title}/>
                )}
                <Score score={pie.rating}/>
            </li>
        </a>
    )
}

function Podium({pies}) {
    return (
        <div className='winners box text-5xl'>
            <h2 className='list-head'>
                <span className='heading-before'>🏅</span>
                The Best
                <span className='heading-after'>🏆</span>
            </h2>
            <ul className='podium'>
                {pies.map((pie) => {
                    return (
                        <Pie key={pie.slug} pie={pie}/>
                    );
                })}
            </ul>
        </div>
    )
}

function WoodenSpoon({pies}) {
    return (
        <div className='loser box text-5xl'>
            <h2 className='list-head'>
                <span className='heading-before'>👎</span>
                The Worst
                <span className='heading-after'>👎</span>
            </h2>
            <ul className='wooden-spoon'>
                {pies.slice(pies.length - 1).map((pie) => {
                    return (
                        <Pie key={pie.slug} pie={pie}/>
                    );
                })}
            </ul>
        </div>
    )
}

export default async function Page() {
    const {isEnabled} = draftMode();
    const pies = await getAllPies(isEnabled);

    return (
        <div className="container mx-auto px-5">
            <Intro/>
            <Podium pies={pies}/>
            <WoodenSpoon pies={pies}/>
        </div>
    );
}
