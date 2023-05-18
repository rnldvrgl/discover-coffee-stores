import Link from "next/link";
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

    // Does route exist in getStaticPaths ? if No then show loading state
    if (router.isFallback) {
        return <div>Loading</div>

    }

    return (
        <>
            <div>Coffee Store Page {router.query.id}</div>
            <Link href="/">Back to Home</Link>
            <p>{props.coffeeStore.address}</p>
            <p>{props.coffeeStore.name}</p>
        </>
    )
}

export default CoffeeStore;