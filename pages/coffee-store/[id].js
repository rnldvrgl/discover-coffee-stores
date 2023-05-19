import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styles from "./coffee-store.module.css"
import { useRouter } from "next/router";
import coffeeStoreData from "../../data/coffee-stores.json"
import cls from "classnames"

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
    const { address, name, neighbourhood, imgUrl } = props.coffeeStore;

    // Does route exist in getStaticPaths ? if No then show loading state
    if (router.isFallback) {
        return <div>Loading</div>
    }

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
                <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name}></Image>
            </div>
            <div className={cls("glass", styles.col2)}>
                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/places.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>{address}</p>
                </div>
                <div className={styles.iconWrapper}>
                    <Image src="/static/icons/nearMe.svg" width="24" height="24" alt="" />
                    <p className={styles.text}>{neighbourhood}</p>
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