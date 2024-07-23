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
                    className="fixed bottom-14 md:bottom-3 right-2 h-10 w-10 rounded-full bg-cyan-500 flex justify-center items-center shadow-2xl"
                    onClick={handleScrollToTop}
                >
                    <FaArrowUp className="text-white text-xl" />
                </button>
            )}
        </div>
    );
}
