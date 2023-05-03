import Link from "next/link";
import { useRouter } from "next/router";

const CoffeeStore = () => {
    const router = useRouter();
    return (
        <>
        <div>Coffee Store Page</div>
        <Link href="/">Back to Home</Link>
        </>
    )
}

export default CoffeeStore;