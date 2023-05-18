import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json"

export function getStaticProps({ params }) {
    return {
        props: {
            coffeeStore: coffeeStoreData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id; //dynamic id
            }),
        },
    };
}

export function getStaticPaths() {
    const paths = coffeeStoreData.map(coffeeStore => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            }
        }
    })

    return {
        paths: [
            { params: { id: '0' } },
            { params: { id: '1' } },
        ],
        fallback: true, //false = to show an error 404 page, true = if we want to stay in the page (if page is not found)
    }
}

const CoffeeStore = (props) => {
    const router = useRouter();
    const { address, name, neighbourhood } = props.coffeeStore;

    // Does route exist in getStaticPaths ? if No then show loading state
    if (router.isFallback) {
        return <div>Loading</div>

    }

    return (
        <>
            <Head>
                <title>{name}</title>
            </Head>
            <Link href="/">Back to Home</Link>
            <p>{address}</p>
            <p>{name}</p>
            <p>{neighbourhood}</p>
        </>
    )
}

export default CoffeeStore;