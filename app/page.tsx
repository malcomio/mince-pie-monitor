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

function Score({score}: any) {
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

function Pie({pie}: any) {
    return (
        <a href={'/pies/' + pie.slug} className='pie__wrapper text-4xl mb-2'>
            <div className='pie max-w-md mb-8'>
                <p className='pie__name'>{pie.title} </p>
                {pie.image && (
                    <img className='pie__image' src={pie.image.url} alt={'Photo of ' + pie.title}/>
                )}
                <Score score={pie.rating}/>
            </div>
        </a>
    )
}

function Podium({pies}: any) {
    return (
        <div className='winners box text-5xl'>
            <h2 className='list-head mb-4'>
                <span className='heading-before'>🏅</span>
                The Best
                <span className='heading-after'>🏆</span>
            </h2>
            <div className='podium'>
                {pies.map((pie: any) => {
                    return (
                        <Pie key={pie.slug} pie={pie}/>
                    );
                })}
            </div>
        </div>
    )
}

function Leaderboard({pies}: any) {
    return (
        <table>
            <thead>
            <tr>
                <th>Rank</th>
                <th>Pie</th>
                <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {pies.map((pie: any, index: number) => (
                <tr key={pie.slug}>
                    <td>{index + 1}</td>
                    <td>
                        <a href={'/pies/' + pie.slug}>
                            {pie.title}
                        </a>
                        </td>
                    <td><Score score={pie.rating}/></td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

function WoodenSpoon({pies}: any) {
    return (
        <div className='loser box text-5xl'>
            <h2 className='list-head mb-4'>
                <span className='heading-before'>👎</span>
                The Worst
                <span className='heading-after'>👎</span>
            </h2>
            <ul className='wooden-spoon'>
                {pies.slice(pies.length - 1).map((pie: any) => {
                    return (
                        <Pie key={pie.slug} pie={pie}/>
                    );
                })}
            </ul>
        </div>
    )
}

export default async function Page() {
    const pies = await getAllPies();

    return (
        <div className="container mx-auto px-5">
            <Intro/>
            <Podium pies={pies}/>
            <WoodenSpoon pies={pies}/>
            <Leaderboard pies={pies}/>
        </div>
    );
}
