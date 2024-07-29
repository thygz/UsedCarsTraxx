import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 1800) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    });

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div>
            {showButton && (
                <button
                    className="fixed bottom-16 md:bottom-4 right-4 h-10 w-10 rounded-full bg-slate-400 flex justify-center items-center shadow-2xl"
                    onClick={handleScrollToTop}
                >
                    <FaArrowUp className="text-slate-900 text-xl" />
                </button>
            )}
        </div>
    );
}
