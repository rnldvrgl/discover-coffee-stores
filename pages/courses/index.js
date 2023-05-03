import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Pages = () => {
    const router = useRouter();
 return (
<>
    <Head>
        <title>Welcome to Next.js with Ankita</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1>Welcome to Next.js with Ankita</h1>
</>
 )
}

export default Pages;