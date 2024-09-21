import { Link } from "@nextui-org/link";

export default function Header() {
    return (
        <nav className="flex justify-between w-full max-w-4xl mb-8">
            <Link href="/" className="text-text text-lg font-bold">Home</Link>
            <div className="flex space-x-4">
                <Link href="/software" className="text-text text-lg">Software</Link>
                <Link href="/projects" className="text-text text-lg">Projects</Link>
            </div>
        </nav>
    );
}