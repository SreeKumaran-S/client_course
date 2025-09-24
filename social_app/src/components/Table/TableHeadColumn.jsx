export default function TableHeadColumn({ 
    children = null,
}) {
    return (
        children &&
        <th>
            {children}
        </th>
    );
}