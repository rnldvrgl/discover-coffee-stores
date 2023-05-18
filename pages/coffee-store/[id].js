import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json"

export function getStaticProps({ params }) {
    return {
        props: {
            coffeeStore: coffeeStoreData.find(coffeeStore => {
                return coffeeStore.id === 0;//dynamic id
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
    }
}

const CoffeeStore = () => {
    const router = useRouter();
    return (
        <>
            <div>Coffee Store Page</div>
            <Link href="/">Back to Home</Link>
        </>
    )
}

export default CoffeeStore;