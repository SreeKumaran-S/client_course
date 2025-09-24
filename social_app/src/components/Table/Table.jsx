export default function Table({
    className = "",
    children = null,
}) {
    return (
        children &&
        <table className={className}>
             {children}
        </table>
    );
}