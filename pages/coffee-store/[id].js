import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./coffee-store.module.css"
import { useRouter } from "next/router";
import cls from "classnames"
import { fetchCoffeeStores } from "@/lib/coffee-store"

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    console.log("params", params);

    const coffeeStores = await fetchCoffeeStores();
    const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //dynamic id
    });
    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
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
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const { name, address, neighbourhood, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => { };

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
            </Head>
            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href="/">← Back to Home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image src={imgUrl || "https://images.unsplash.com/photo-149880103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"} width={600} height={360} className={styles.storeImg} alt="Store Image"></Image>
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
        </div >
    )
}

export default CoffeeStore;