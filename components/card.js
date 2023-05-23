import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css"
import cls from "classnames"

const Card = (props) => {
    return (
        <Link href={props.href} className={styles.cardLink}>
            <div className={cls("glass", styles.container)}>
                <div className={styles.cardHeadWrapper} >
                    <h2 className={styles.cardHeader}>{props.name}</h2>
                </div>
                <div className={styles.cardHeadWrapper} >
                    <Image src={props.imgUrl} alt={props.name} width={260} height={160} className={styles.cardImage} />
                </div>
            </div>
        </Link >
    )
}

export default Card;