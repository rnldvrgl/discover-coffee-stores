import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./coffee-store.module.css"
import { useRouter } from "next/router";
import cls from "classnames"
import { fetchCoffeeStores } from "@/lib/coffee-store"

export async function getStaticProps({ params }) {

    const coffeeStores = await fetchCoffeeStores();
    console.log(coffeeStores)
    return {
        props: {
            coffeeStore: coffeeStores.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id; //dynamic id
            }),
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id.toString(),
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeeStore = (props) => {
    const router = useRouter();

    // Does route exist in getStaticPaths ? if No then show loading state
    if (router.isFallback) {
        return <div>Loading</div>
    }

    const { address, name, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {
        console.log("Upvote")
    }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.col1}>
                <div className={styles.backToHomeLink}>
                    <Link href="/">Back to Home</Link>
                </div>
                <div className={styles.nameWrapper}>
                    <h1 className={styles.name}>{name}</h1>
                </div>
                <Image src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt="a"></Image>
            </div>
            <div className={cls("glass", styles.col2)}>
                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/places.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>{address}</p>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/star.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>1</p>
                </div>

                <button className={styles.upvoteButton} onClick={handleUpvoteButton}>Up Vote!</button>
            </div>
        </div>
    )
}

export default CoffeeStore;