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

import { Card, CardBody }                       from "@nextui-org/card";
import { Divider }                              from "@nextui-org/divider";
import { Image }                                from "@nextui-org/image";
import { Link }                                 from "@nextui-org/link";

import TextTyper                                from "@component/text/TextTyper";

import SkillsSection                            from "@container/SkillsSection";
import ConnectSection                           from "@container/ConnectSection";

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

    const connections = [
        { Icon: SiGithub   , label: "GitHub"   , link: "https://github.com/dvhsh"          , color: "text-gray-400" },
        { Icon: SiLinkedin , label: "LinkedIn" , link: "https://www.linkedin.com/in/dvhsh" , color: "text-gray-400" },
        { Icon: SiGmail    , label: "Email"    , link: "mailto:david@dvh.sh"               , color: "text-gray-400" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6">
            <Card className="bg-gray-800 rounded-3xl shadow-2xl max-w-lg sm:max-w-xl p-4 sm:p-6">
                <CardBody className="flex flex-col items-center">
                    <Image
                        src="https://avatars.githubusercontent.com/u/175678329?v=4"
                        alt="avatar"
                        width={90}
                        height={90}
                        className="rounded-full border-4 border-gray-600 shadow-lg mb-4 sm:mb-5"
                    />
                    <h1 className="text-center text-white text-lg sm:text-xl font-bold mb-2 sm:mb-3"><TextTyper/></h1>
                    <p className="text-gray-300 text-center text-sm sm:text-base mb-1 sm:mb-2">
                        CSIS Student, Software Developer, and Entrepreneur <br/>
                        Founder & CTO @ <Link isExternal href="https://haruhime.holdings" className="hover:underline text-blue-400">Haruhime Holdings</Link>
                    </p>

                    <Divider className="my-3 sm:my-4 bg-gray-500 opacity-20"/>

                    <SkillsSection title="Languages" skills={languages} iconSize="w-8 sm:w-9 h-8 sm:h-9" />
                    <SkillsSection title="Tools" skills={tools} iconSize="w-8 sm:w-9 h-8 sm:h-9" />

                    <Divider className="my-3 sm:my-4 bg-gray-500 opacity-20"/>

                    <h2 className="text-white text-lg sm:text-xl font-semibold mb-3">Connect with Me</h2>
                    <ConnectSection connections={connections} />
                </CardBody>
            </Card>

            <footer
                className="flex justify-center items-center py-3 text-slate-400 mt-4 hover:text-white transition-colors duration-300">
                <a href="https://github.com/dvh-sh/dvh.sh" target="_blank"
                   className="fill-slate-400 transition-colors duration-300" aria-label="Source Redirect">
                    <SiGithub className="h-5 sm:h-6 w-5 sm:w-6 hover:scale-125 transition-transform duration-300"/>
                </a>
                <p className="ml-2 text-xs sm:text-sm">&copy; dvh.sh {year}</p>
            </footer>
        </div>
    );
}

// path: src/app/page.tsx
