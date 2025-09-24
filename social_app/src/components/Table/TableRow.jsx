export default function TableRow({
    children = null,
}) {
    return (
        children &&
        <tr>
            {children}
        </tr>
    );
}