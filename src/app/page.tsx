import {
    SiJetbrains,
    SiTypescript,
    SiPython,
    SiKotlin,
    SiCplusplus,
    SiGit,
    SiGithub,
    SiLinkedin,
    SiGmail
}                                               from "react-icons/si";

import { Card, CardBody, Image, Link, Divider } from "@nextui-org/react";

import TextTyper                                from "@component/text/TextTyper";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-6">
            <Card className="bg-gray-800 rounded-3xl shadow-2xl max-w-2xl p-8">
                <CardBody className="flex flex-col items-center">
                    <Image
                        src="https://avatars.githubusercontent.com/u/175678329?v=4"
                        alt="avatar"
                        width={120}
                        height={120}
                        className="rounded-full border-4 border-gray-600 shadow-lg mb-6"
                    />
                    <h1 className="text-center text-white text-xl font-bold mb-4"><TextTyper/></h1>
                    <p className="text-gray-300 text-center mb-6">
                        CSIS Student, Software Developer, and Entrepreneur. <br/>
                        Founder & CTO @ <Link isExternal href="https://haruhime.holdings" className="hover:underline text-blue-400">Haruhime Holdings</Link>
                    </p>

                    <Divider className="my-6 bg-gray-500"/>

                    <h2 className="text-white text-xl font-semibold mb-4">Skills</h2>
                    <div className="flex justify-center space-x-6 mb-6">
                        <SiTypescript className="text-blue-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                        <SiPython className="text-yellow-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                        <SiKotlin className="text-purple-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                        <SiCplusplus className="text-blue-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-white text-lg font-semibold mb-2">Tools</h3>
                    <div className="flex justify-center space-x-6 mb-6">
                        <SiGit className="text-orange-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                        <SiJetbrains className="text-purple-400 w-10 h-10 hover:scale-110 transition-transform duration-300" />
                    </div>

                    <Divider className="my-6 bg-gray-500"/>

                    <h2 className="text-white text-xl font-semibold mb-4">Connect with Me</h2>
                    <div className="flex justify-center space-x-6">
                        <a href={"https://github.com/dvhsh"} target={"_blank"} className="fill-slate-400" aria-label="Github Redirect" >
                            <SiGithub className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>

                        <a href={"https://www.linkedin.com/in/dvhsh"} target={"_blank"} className="fill-slate-400" aria-label="LinkedIn Redirect" >
                            <SiLinkedin className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>

                        <a href={"mailto:david@dvh.sh"} target={"_blank"} className="fill-slate-400" aria-label="Email Redirect" >
                            <SiGmail className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

// path: src/app/page.tsx
