import {
    FaHeart,
    FaGithub,
    FaLinkedin
} from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="relative text-white overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-gray-400 text-sm">
                                © 2025 Moviebly. All rights reserved. Made with{' '}
                                <FaHeart className="inline text-red-400 mx-1 animate-pulse" />
                                for movie lovers.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                <span>Powered by</span>
                                <div className="flex gap-2">
                                    <a
                                        href="https://github.com/deeppatel055"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                    >
                                        <FaGithub className="hover:text-white transition-colors cursor-pointer" />
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/in/deep-patel-734a62225/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                    >
                                        <FaLinkedin className="hover:text-blue-400 transition-colors cursor-pointer" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
