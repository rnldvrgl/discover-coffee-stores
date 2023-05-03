import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

const Pages = () => {
   const router = useRouter();
 return (
   <>
   <Head>
        <title>Page {router.query.page}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
        <h1>Page {router.query.page}</h1>
   </>

 )
}

export default Pages;