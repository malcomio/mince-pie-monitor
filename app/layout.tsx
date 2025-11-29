import "./globals.css";
import {Inter} from "next/font/google";
import {EXAMPLE_PATH, CMS_NAME} from "@/lib/constants";

export const metadata = {
    title: `Mince Pie Monitor`,
    description: `Mairead's mince pie monitor 2025`,
};

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
        <head>
            <link rel="icon"
                  href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🥧</text></svg>"/>
        </head>
        <body>
        <section className="min-h-screen">
            <main>{children}</main>
        </section>
        </body>
        </html>
    );
}
