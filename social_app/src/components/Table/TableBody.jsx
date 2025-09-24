export default function TableBody({
    children = null,
}) {
    return (
        children &&
        <tbody>
            {children}
        </tbody>
    );
}