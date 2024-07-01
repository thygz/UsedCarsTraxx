import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [userAccount, setUserAccount] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setUserAccount(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserAccount();
    }, [listing.userRef]);
    return (
        <>
            {userAccount && (
                <div className="flex flex-col gap-3 mt-5">
                    <p className="text-sm text-slate-800">
                        Contact{' '}
                        <span className="font-semibold">
                            {userAccount.username}
                        </span>{' '}
                        for{' '}
                        <span className="font-semibold">{listing.make}</span>{' '}
                        {''}
                        <span className="font-semibold">{listing.model}</span>
                    </p>
                    <textarea
                        name="message"
                        id="message"
                        rows="3"
                        value={message}
                        onChange={onChange}
                        placeholder="Enter your mesage here..."
                        className="border border-gray-600 bg-inherit px-3 py-2 rounded-sm text-sm focus:outline-gray-400"
                    ></textarea>
                    <Link
                        to={`mailto:${userAccount.email}?subject=Regarding ${listing.make}&body=${message}`}
                        className="bg-cyan-800 text-white text-1xl font-semibold text-center p-3 uppercase rounded-lg hover:opacity-95"
                    >
                        Send Message
                    </Link>
                </div>
            )}
        </>
    );
}
