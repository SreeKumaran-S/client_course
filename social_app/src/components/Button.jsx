export default function Button({
    className = "", 
    title = "",
    children = null,
    onClick = ()=> {},
    disabled = false,
}){
    return (
        children &&
        <button className={className} title={title} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}