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
    SiLeetcode,
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

    const languages = [
        { Icon: SiJavascript , label: "JavaScript" , color: "text-yellow" },
        { Icon: SiTypescript , label: "TypeScript" , color: "text-blue"   },
        { Icon: SiPython     , label: "Python"     , color: "text-yellow" },
        { Icon: SiKotlin     , label: "Kotlin"     , color: "text-mauve"  },
        { Icon: SiCplusplus  , label: "C++"        , color: "text-blue"   },
        { Icon: SiPhp        , label: "PHP"        , color: "text-mauve"  },
    ];

    const tools = [
        { Icon: SiGit          , label: "Git"           , color: "text-peach" },
        { Icon: SiJetbrains    , label: "JetBrains"     , color: "text-mauve" },
        { Icon: SiVisualstudio , label: "Visual Studio" , color: "text-mauve" },
        { Icon: SiMongodb      , label: "MongoDB"       , color: "text-green" },
        { Icon: SiMysql        , label: "MySQL"         , color: "text-blue"  },
    ];

    const connections = [
        { Icon: SiGithub   , label: "GitHub"   , link: "https://github.com/dvhsh"          , color: "text-overlay0" },
        { Icon: SiLeetcode , label: "LeetCode" , link: "https://leetcode.com/u/dvhsh"      , color: "text-overlay0" },
        { Icon: SiLinkedin , label: "LinkedIn" , link: "https://www.linkedin.com/in/dvhsh" , color: "text-overlay0" },
        { Icon: SiGmail    , label: "Email"    , link: "mailto:david@dvh.sh"               , color: "text-overlay0" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6">
            <Card className="bg-crust rounded-3xl shadow-2xl max-w-lg sm:max-w-xl p-4 sm:p-6">
                <CardBody className="flex flex-col items-center">
                    <Image
                        src="https://avatars.githubusercontent.com/u/175678329?v=4"
                        alt="avatar"
                        width={90}
                        height={90}
                        className="rounded-full border-4 border-surface0 shadow-lg mb-4 sm:mb-5"
                    />

                    <h1 className="text-center text-text text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                        <TextTyper />
                    </h1>

                    <p className="text-subtext0 text-center text-sm mb-1 sm:mb-2">
                        CSIS Student, Software Engineer, and Entrepreneur <br />
                        Founder & CTO @ <Link isExternal href="https://haruhime.holdings" className="hover:underline text-blue">Haruhime Holdings</Link>
                    </p>

                    <Divider className="my-3 sm:my-4 bg-surface2 opacity-20" />

                    <SkillsSection title="Languages" skills={languages} iconSize="w-8 sm:w-9 h-8 sm:h-9" />
                    <SkillsSection title="Tools" skills={tools} iconSize="w-8 sm:w-9 h-8 sm:h-9" />

                    <Divider className="my-3 sm:my-4 bg-surface2 opacity-20" />

                    <ConnectSection connections={connections} iconSize="w-6 sm:w-8 h-6 sm:h-8" />
                </CardBody>
            </Card>

            <footer className="flex justify-center items-center py-3 mt-4 hover:text-text transition-colors duration-300">
                <Link
                    isExternal
                    href="https://github.com/dvh-sh/dvh.sh"
                    target="_blank"
                    aria-label="Source Redirect"
                    className="transition-colors duration-300"
                >
                    <p className="ml-2 text-xs sm:text-sm text-subtext1 hover:underline">&copy; dvh.sh {new Date().getFullYear()}</p>
                </Link>
            </footer>
        </div>
    );
}

// path: src/app/page.tsx