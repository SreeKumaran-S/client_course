export default function Caption({
    children = null,
}) {
    return (
        children &&
        <caption>
            {children}
        </caption>
    );
}