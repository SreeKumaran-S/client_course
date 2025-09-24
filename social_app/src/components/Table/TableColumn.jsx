export default function TableColumn({
    colSpan = 1,
    align="center",
    onInput,
    contentEditable=false,
    children}){
    return (
            <td 
             colSpan={colSpan} 
             align={align} 
             contentEditable={contentEditable} 
             suppressContentEditableWarning={true}
             onInput={onInput}>
                {children}
            </td>
    );
}