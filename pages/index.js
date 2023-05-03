import Head from "next/head"
import styles from "../styles/Home.module.css"
import Banner from "@/components/banner"
import Image from "next/image"

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
        </div>
      </main>

    </div>
  )
}
