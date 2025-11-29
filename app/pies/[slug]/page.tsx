import Link from "next/link";

import {documentToReactComponents} from '@contentful/rich-text-react-renderer';

import {getAllPies, getPie} from "@/lib/api";
import {Score} from "@/lib/components/score";

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

    return (
        <div className="container mx-auto px-5">
            <h2 className="mb-20 mt-8 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
                <Link href="/" className="hover:underline">
                    Mince Pie Monitor
                </Link>
            </h2>
            <article>
                <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
                    {pie.title}
                </h1>

                <Score score={pie.rating}/>
                {
                    pie.image && (
                        <div className="mb-8 sm:mx-0 md:mb-16">
                            <img title={pie.title} src={pie.image.url} alt={pie.title}/>
                        </div>
                    )
                }

                <div className="mx-auto max-w-2xl">
                    <div className="prose">
                        {documentToReactComponents(pie.description.json)}
                    </div>
                </div>
            </article>
            <hr className="border-accent-2 mt-28 mb-24"/>
        </div>
    );
}
