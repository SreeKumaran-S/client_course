export default function Table({ className, children}) {
    return (
        <table className={className}>
             {children}
        </table>
    );
}