import {Scoring} from "@/lib/components/about";
import {Header} from "@/lib/components/header";

export default async function Page() {

    return (
        <div className="container mx-auto px-5">
            <Header />
            <h1 className="text-yellow-300 mb-12 text-center text-6xl font-bold leading-tight tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl">
                About the Mince Pie Monitor
            </h1>
            
            <Scoring />            
        </div>
    );
}
