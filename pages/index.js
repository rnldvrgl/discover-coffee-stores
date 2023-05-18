import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"
import Card from "@/components/card"
import Image from "next/image"
import coffeeStores from "../data/coffee-stores.json"
import CoffeeStore from "./coffee-store/[id]"

export default function Home() {

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
          <Image src="/static/hero-image.png" width={700} height={400} />
          <div className={styles.cardLayout}>
            {coffeeStores.map(coffeeStore => {
              return (
                <Card name={coffeeStore.name} imgUrl={coffeeStore.imgUrl} href={`/coffee-store/${coffeeStore.id}`} className={styles.card} />
              )
            })}
          </div>
        </div>
      </main>

    </div>
  )
}
