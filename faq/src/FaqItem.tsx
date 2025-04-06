import React, { useEffect, useState } from 'react';

interface FaqItemProps {
    faq: {
        question: string;
        answer: string;
    };
    index: number;
}

const FaqItem: React.FC<FaqItemProps> = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);


    useEffect(() => {
        if (index === 0) {
            setIsOpen(true)
        }
    }, [])

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-purple-100 border border-purple-300 rounded-md shadow-md mb-4 p-4 transition-all duration-300">
            <div className="flex items-center justify-between cursor-pointer" onClick={handleClick}>
                <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
                <button className="text-purple-600 hover:text-purple-800 text-2xl focus:outline-none">
                    {isOpen ? '^' : '>'}
                </button>
            </div>

            {isOpen && (
                <div className="mt-2 text-gray-700 text-sm">
                    <p>{faq.answer}</p>
                </div>
            )}
        </div>
    );
};

export default FaqItem;
