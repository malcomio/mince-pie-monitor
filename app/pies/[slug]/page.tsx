import Link from "next/link";

import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import {getAllPies, getPie} from "@/lib/api";
import {Score} from "@/lib/components/score";
import {Leaderboard} from "@/lib/components/leaderboard";
import {Scoring} from "@/lib/components/about";
import {Header} from "@/lib/components/header";

export async function generateStaticParams() {
    const allPosts = await getAllPies();

    return allPosts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function PostPage(
    {
        params,
    }: {
        params: Promise<{ slug: string }>;
    }) {

    const {slug} = await params;
    const pie = await getPie(slug);
    const pies = await getAllPies();

    return (
        <div className="container mx-auto px-5">

            <Header />
            <article>
                <h1 className="text-yellow-300 mx-auto mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
                    {pie.title}
                </h1>

                <div className="bg-stone-50 p-3 mx-auto my-4">
                    <div className="text-4xl mb-4">
                        <Score score={pie.rating}/>
                    </div>

                    {
                        pie.image && (
                            <div className="mb-8 sm:mx-0 md:mb-16 mx-auto max-w-md">
                                <img title={pie.title} src={pie.image.url} alt={pie.title}/>
                            </div>
                        )
                    }

                    {
                        pie.description && (
                            <div className="prose">
                                {documentToReactComponents(pie.description.json)}
                            </div>
                        )
                    }
                </div>

            </article>

            <Leaderboard pies={pies}/>

            <Scoring/>
        </div>
    );
}
