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
} from "react-icons/si";
import { Link } from "@nextui-org/link";

import SkillsSection from "@container/SkillsSection";

export default function SoftwarePage() {
    const languages = [
        { Icon: SiJavascript, label: "JavaScript", color: "text-yellow" },
        { Icon: SiTypescript, label: "TypeScript", color: "text-blue" },
        { Icon: SiPython, label: "Python", color: "text-yellow" },
        { Icon: SiKotlin, label: "Kotlin", color: "text-mauve" },
        { Icon: SiCplusplus, label: "C++", color: "text-blue" },
        { Icon: SiPhp, label: "PHP", color: "text-mauve" },
    ];

    const tools = [
        { Icon: SiGit, label: "Git", color: "text-peach" },
        { Icon: SiJetbrains, label: "JetBrains", color: "text-mauve" },
        { Icon: SiVisualstudio, label: "Visual Studio", color: "text-mauve" },
        { Icon: SiMongodb, label: "MongoDB", color: "text-green" },
        { Icon: SiMysql, label: "MySQL", color: "text-blue" },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-base to-mantle p-4 sm:p-6">
            <div className="bg-crust rounded-3xl shadow-2xl max-w-lg sm:max-w-xl p-4 sm:p-6">

                <SkillsSection title="Languages" skills={languages} iconSize="w-8 sm:w-9 h-8 sm:h-9" />
                <SkillsSection title="Tools" skills={tools} iconSize="w-8 sm:w-9 h-8 sm:h-9" /> 
                <h2 className="text-text text-lg font-bold mb-2">Apps</h2>
                <ul className="list-disc list-inside text-text">
                    <li>Firefox - Everyday browser</li> 
                </ul>
            </div>
        </div>
    );
}
