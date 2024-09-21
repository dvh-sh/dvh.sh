import { Link } from "@nextui-org/link";

export default function ProjectsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6">
            <div className="bg-crust rounded-3xl shadow-2xl max-w-lg sm:max-w-xl p-4 sm:p-6">
                <h1 className="text-center text-text text-lg sm:text-xl font-bold mb-4">Projects</h1>
                <p className="text-text mb-4">Here are some of the projects I've worked on:</p>
                <ul className="list-disc list-inside text-text">
                    <li>Project 1 - Description of project 1</li>
                </ul>
            </div>
        </div>
    );
}
