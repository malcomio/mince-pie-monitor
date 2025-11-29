import {getAllPies} from "@/lib/api";
import {Score} from "@/lib/components/score";
import {About} from "@/lib/components/about";

function Intro() {
    return (
        <section className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-16 md:mb-12">
            <h1 className="text-yellow-300 text-6xl md:text-8xl text-center font-bold tracking-tighter leading-tight md:pr-8">
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
        <div className='winners box text-5xl text-center bg-stone-50  bg-stone-50 mx-auto p-3 max-w-md'>
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

function Leaderboard({pies}: any) {
    return (
        <div className='p-3 bg-stone-50 mb-8 mt-8'>
            <table className='table-auto w-full text-left'>
                <thead className='bg-gray-200 border-gray-200'>
                <tr>
                    <th className='p-1'>Rank</th>
                    <th className='p-1'>Pie</th>
                    <th className='p-1'>Score</th>
                </tr>
                </thead>
                <tbody>
                {pies.map((pie: any, index: number) => (
                    <tr key={pie.slug} className='odd:bg-white even:bg-gray-50'>
                        <td className='p-1'>{index + 1}</td>
                        <td className='p-1'>
                            <a href={'/pies/' + pie.slug}>
                                {pie.title}
                            </a>
                        </td>
                        <td className='p-1'><Score score={pie.rating}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
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
            <About/>
        </div>
    );
}
