import {Score} from "@/lib/components/score";
import Link from "next/link";

function Leaderboard({pies}: any) {
    return (
        <div className='p-3 bg-stone-50 mb-8 mt-8 rounded-lg'>
            <h2 className='list-head mb-4 text-3xl text-center'>
                🥧 Mince Pie Leaderboard 🥧
            </h2>
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
                            <Link href={'/pies/' + pie.slug + '.html'}>
                                {pie.title}
                            </Link>
                        </td>
                        <td className='p-1'><Score score={pie.rating}/></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export {Leaderboard};