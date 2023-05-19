import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"
import Card from "@/components/card"
import Image from "next/image"
import coffeeStoresData from "../data/coffee-stores.json"

// Get Static Props
export async function getStaticProps(context) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'fsq3lDlIy3F0+VfjuHFvJwv9TJbfbvNXBixUVFalJsKTfCo='
    }
  };

  fetch('https://api.foursquare.com/v3/places/search?query=coffee%20stores&ll=15.24%2C120.59&limit=6', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  return {
    props: {
      coffeeStores: coffeeStoresData,
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
                  <Card key={coffeeStore.id} name={coffeeStore.name} imgUrl={coffeeStore.imgUrl} href={`/coffee-store/${coffeeStore.id}`} className={styles.card} />
                )
              })}
            </div>
          </>
        )}
      </main >

    </div >
  )
}
