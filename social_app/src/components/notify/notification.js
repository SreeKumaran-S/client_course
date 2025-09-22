import {useState, useEffect} from 'react';

export default function Notification({ message, types, duration = 2000, onClose}) {
    let [show, setShow] = useState(false);
    useEffect(() => {
        if (message) {
            setShow(true);
            let timer = setTimeout(() => {
                setShow(false);
                onClose(); 
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);


    if (!message) {
        return null;
    }
    let typeClasses = Array.isArray(types) ? types.join(" ") : types || "";

    return (
        <div className={`ui-notification ${show ? "show" : ""} ${typeClasses}`}>
            {message}
        </div>
    );
}