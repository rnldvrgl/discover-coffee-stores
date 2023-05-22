import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"
import Card from "@/components/card"
import Image from "next/image"
import { fetchCoffeeStores } from "@/lib/coffee-store"
import useTrackLocation from "@/hooks/use-track-location"
import { useEffect, useState } from "react"

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

  const { handleTrackLocation, latLong, locationErrorMsg, isFindingLocation } = useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState('');
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
          console.log({ fetchedCoffeeStores });
          setCoffeeStores(fetchedCoffeeStores);
          //set coffee stores
        } catch (error) {
          //set error
          console.log("Error", { error });
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);


  // Handle Button Function
  const handleOnBannerBtnClick = () => {
    console.log("hi");
    handleTrackLocation();
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick} />
        {/* Location Error Message */}
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg} </p>}

        {/* Coffee Stores Error Message */}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError} </p>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" alt="Hero Image" width={700} height={400} />
        </div>

        {/* Stores Near Me */}
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores Near Me:</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map(coffeeStore => {
                return (
                  <Card key={coffeeStore.id} name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'} href={`/coffee-store/${coffeeStore.id}`} className={styles.card} />
                )
              })}
            </div>
          </div>
        )}


        {/* Coffee Stores in Mabalacat */}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Mabalacat Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map(coffeeStore => {
                return (
                  <Card key={coffeeStore.id} name={coffeeStore.name} imgUrl={coffeeStore.imgUrl || 'https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80'} href={`/coffee-store/${coffeeStore.id}`} className={styles.card} />
                )
              })}
            </div>
          </div>
        )}
      </main >

    </div >
  )
}
