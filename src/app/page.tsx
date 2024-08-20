import {
    SiJetbrains,
    SiVisualstudio,
    SiGit,
    SiMongodb,
    SiMysql,
    SiJavascript,
    SiPhp,
    SiTypescript,
    SiPython,
    SiKotlin,
    SiCplusplus,
    SiGithub,
    SiLinkedin,
    SiGmail,
}                                               from "react-icons/si";

import { Card, CardBody, Image, Link, Divider } from "@nextui-org/react";

import TextTyper                                from "@component/text/TextTyper";
import SkillsSection                            from "@container/SkillsSection";

export default function Page() {
    const year = new Date().getFullYear();

    const languages = [
        { Icon: SiJavascript , label: "JavaScript" , color: "text-yellow-400" },
        { Icon: SiTypescript , label: "TypeScript" , color: "text-blue-400"   },
        { Icon: SiPython     , label: "Python"     , color: "text-yellow-400" },
        { Icon: SiKotlin     , label: "Kotlin"     , color: "text-purple-400" },
        { Icon: SiCplusplus  , label: "C++"        , color: "text-blue-400"   },
        { Icon: SiPhp        , label: "PHP"        , color: "text-purple-400" },
    ];

    const tools = [
        { Icon: SiGit          , label: "Git"           , color: "text-orange-400" },
        { Icon: SiJetbrains    , label: "JetBrains"     , color: "text-purple-400" },
        { Icon: SiVisualstudio , label: "Visual Studio" , color: "text-purple-400" },
        { Icon: SiMongodb      , label: "MongoDB"       , color: "text-green-400"  },
        { Icon: SiMysql        , label: "MySQL"         , color: "text-blue-400"   },
    ];

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
                        CSIS Student, Software Developer, and Entrepreneur <br/>
                        Founder & CTO @ <Link isExternal href="https://haruhime.holdings" className="hover:underline text-blue-400">Haruhime Holdings</Link>
                    </p>

                    <Divider className="my-6 bg-gray-500 transition-opacity duration-500 hover:opacity-80"/>

                    <SkillsSection title="Languages" skills={languages} />
                    <SkillsSection title="Tools" skills={tools} />

                    <Divider className="my-6 bg-gray-500 transition-opacity duration-500 hover:opacity-80"/>

                    <h2 className="text-white text-xl font-semibold mb-4">Connect with Me</h2>
                    <div className="flex justify-center space-x-6">
                        <a href={"https://github.com/dvhsh"} target={"_blank"} className="fill-slate-400" aria-label="Github Redirect">
                            <SiGithub className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>
                        <a href={"https://www.linkedin.com/in/dvhsh"} target={"_blank"} className="fill-slate-400" aria-label="LinkedIn Redirect">
                            <SiLinkedin className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>
                        <a href={"mailto:david@dvh.sh"} target={"_blank"} className="fill-slate-400" aria-label="Email Redirect">
                            <SiGmail className="text-gray-400 w-10 h-10 hover:text-white hover:scale-110 transition-transform duration-300" />
                        </a>
                    </div>
                </CardBody>
            </Card>

            <footer
                className="flex justify-center items-center py-4 text-slate-400 mt-6 hover:text-white transition-colors duration-300">
                <a href="https://github.com/dvh-sh/dvh.sh" target="_blank"
                   className="fill-slate-400 transition-colors duration-300" aria-label="Source Redirect">
                    <SiGithub className="h-6 w-6 hover:scale-125 transition-transform duration-300"/>
                </a>
                <p className="ml-2 text-sm">&copy; dvh.sh {year}</p>
            </footer>
        </div>
    );
}

// path: src/app/page.tsx
