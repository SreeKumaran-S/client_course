export default function Button({
    className = "", 
    children = null,
    onClick = ()=> {},
    disabled = false,
}){
    return (
        children &&
        <button className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}