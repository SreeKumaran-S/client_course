export default function TableHeader({ 
    children = null,
}) {
    return (
        children &&
        <thead>
            {children}
        </thead>
    );
}