import { Card, CardBody, Image, Link, CardFooter } from "@nextui-org/react";

import Github                                      from "@component/svg/social/Github";
import Email                                       from "@component/svg/social/Email";

import TextTyper                                   from "@component/text/TextTyper";

const Landing = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 overflow-hidden">
            <Card isBlurred shadow="lg" className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 sm:p-6 max-w-xs sm:max-w-md md:max-w-lg">
                <CardBody>
                    <div className="flex flex-col sm:flex-row items-center sm:space-x-6">
                        <Image
                            src="https://avatars.githubusercontent.com/u/175678329?v=4"
                            alt="avatar"
                            width={96}
                            height={96}
                            className="rounded-full border-4 border-gray-700"
                        />
                        <div className="flex flex-col mt-4 sm:mt-0">
                            <div className="text-white text-sm sm:text-sm font-bold flex-grow overflow-hidden">
                                <TextTyper />
                            </div>
                            <h2 className="text-slate-400 mt-2 text-center sm:text-left">
                                CTO @{' '}
                                <Link isExternal href="https://haruhime.holdings"
                                      className="hover:underline text-slate-300">
                                    Haruhime Holdings
                                </Link>
                            </h2>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="flex justify-around mt-4 sm:mt-0">
                    <Github link="https://github.com/dvhsh" />
                    <Email link="mailto:david@dvh.sh" />
                </CardFooter>
            </Card>
        </div>
    );
};

export default Landing;

// path: src/app/container/landing/Landing.tsx
