import type { Metadata, ResolvingMetadata } from 'next'

import {documentToReactComponents} from '@contentful/rich-text-react-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

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

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = (await params).slug
    const pie = await getPie(slug);
    
    const pageTitle = `${pie.title} | Mairead's Mince Pie Monitor`;
    const pageDescription = pie.description ? documentToPlainTextString(pie.description.json).slice(0, 160) : 'Find out how this mince pie scores on Mairead\'s Mince Pie Monitor.';
    return {
        title: pageTitle,
        description: pageDescription,
        openGraph: {
            title: pageTitle,
            url: `https://mincepie.red-route.org/pies/${pie.slug}/`,
            type: 'article',
            description: pageDescription,
            images: pie.image ? [
                {
                    url: pie.image.url,
                    width: pie.image.width,
                    height: pie.image.height,
                    alt: pie.title,
                }
            ] : undefined,
        }
    }
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
                <div className="bg-stone-50 p-3 mx-auto my-4 rounded-lg">
                    <h1 className="mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
                        {pie.title}
                    </h1>

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
