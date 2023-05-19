import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"
import Card from "@/components/card"
import Image from "next/image"
import coffeeStoresData from "../data/coffee-stores.json"
import { fetchCoffeeStores } from "@/lib/coffee-store"

// Get Static Props
export async function getStaticProps(context) {

  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    }, //will be passed to the page component as props
  }
}

export default function Home(props) {
  console.log(props)

  // Handle Button Function
  const handleOnBannerBtnClick = () => {
    console.log("hi");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick} />
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="Hero Image" width={700} height={400} />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(coffeeStore => {
                return (
                  <Card key={coffeeStore.id} name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'} href={`/coffee-store/${coffeeStore.fsq_id}`} className={styles.card} />
                )
              })}
            </div>
          </>
        )}
      </main >

    </div >
  )
}
