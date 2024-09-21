import {
    SiGithub,
    SiGmail,
} from "react-icons/si";

import { Card, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import ConnectSection from "@container/ConnectSection";

export default function HomePage() {
    const connections = [
        { Icon: SiGithub, label: "GitHub", link: "https://github.com/dvhsh", color: "text-overlay0" },
        { Icon: SiGmail, label: "Email", link: "mailto:david@dvh.sh", color: "text-overlay0" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6">
            <Card className="bg-crust rounded-3xl shadow-2xl max-w-lg sm:max-w-xl p-4 sm:p-6">
                <CardBody className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="flex flex-col items-center sm:items-start sm:mr-6 mb-4 sm:mb-0">
                        <Image
                            src="https://avatars.githubusercontent.com/u/175678329?v=4"
                            alt="avatar"
                            width={90}
                            height={90}
                            className="rounded-full border-4 border-surface0 shadow-lg mb-4 sm:mb-5"
                        />
                        <h1 className="text-center sm:text-left text-text text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                            Hi, I'm David
                        </h1>
                    </div>
                    <div className="flex flex-col flex-grow">
                        <ConnectSection connections={connections} iconSize="w-6 sm:w-8 h-6 sm:h-8" />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
