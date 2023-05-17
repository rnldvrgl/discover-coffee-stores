import Link from "next/link";
import Image from "next/image";

const Card = (props) => {
    return (
        <Link href={props.href}>
            <h2>{props.name}</h2>
            <Image src={props.imgUrl} width={260} height={160} />
        </Link>
    )
}

export default Card;