export default function Button({
    className, 
    children,
    onClick,
    disabled=false}){
    return (
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}