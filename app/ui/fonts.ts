import {
    Geist,
    Geist_Mono,
    Source_Code_Pro
} from "next/font/google";


export const sourceCodePro = Source_Code_Pro({
    weight: "400",
    subsets: ["latin"]
})

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});