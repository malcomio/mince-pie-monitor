import {About, Scoring} from "@/lib/components/about";
import {Header} from "@/lib/components/header";

export default async function Page() {

    return (
        <div className="container mx-auto px-5">
            <Header />
            <div className="bg-stone-50 shadow-xl p-3 mx-auto my-4 rounded-lg">
            <h1 className="text-5xl p-3">
                About the Mince Pie Monitor
            </h1>
            
            <Scoring />
            </div>
        </div>
    );
}
