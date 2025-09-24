import Table from '../components/Table/Table';
import Caption from '../components/Table/Caption';
import TableHeader from '../components/Table/TableHeader';
import TableBody from '../components/Table/TableBody';
import TableHeadColumn from '../components/Table/TableHeadColumn';
import TableRow from '../components/Table/TableRow';
import TableColumn from '../components/Table/TableColumn';
import Button from '../components/Button';

export default function UsersTable({
    className = "",
    caption = null,
    emptyStateMessage = "",
    columnsToShow = [],
    headers = [],
    users = [],
    toggleButton = {
        className: "",
        on: { className: '', label: '' },
        off: { className: '', label: '' }
    },
    deleteButton = {
        label: '',
        className: '',
        on: { className: '' },
        off: { className: '' }
    },
    updateButton = {
        label: '',
        className: '',
        on: { className: '' },
        off: { className: '' }
    },
    onDelete = null,
    onUpdate = null,
    onToggleEdit = null,
    onRowCellChange = ()=> {},
    children = null,
}) {
   
    return (
        <Table className={className}>
            <>
                { caption && <Caption>{caption}</Caption> }
                <TableHeader>
                    <TableRow >
                        {
                            headers.map((head, ind) => (
                                <TableHeadColumn key={ind}>{head}</TableHeadColumn>
                            ))
                        }
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                      children ? children : 
                      users?.length > 0 ?
                        users.map((user, ind) => (
                            <TableRow key={ind} >
                                {Object.keys(user).map((column, colInd) => (
                                    columnsToShow.includes(column) &&
                                    <TableColumn key={colInd} contentEditable={user.isEditing} onInput={(e) => onRowCellChange(user.id, column, e.currentTarget.textContent)}>
                                        {user[column]}
                                    </TableColumn>
                                ))}

                                {typeof onToggleEdit === 'function' && (
                                <TableColumn>
                                    <Button className={`
                                            ${toggleButton.className} 
                                            ${user.isEditing ? toggleButton.on.className : toggleButton.off.className}
                                            `}
                                        onClick={(e) => onToggleEdit(e, user.id)} >
                                        {user.isEditing ? toggleButton.on.label : toggleButton.off.label}
                                    </Button>
                                </TableColumn>
                                )}

                                {(typeof onDelete === 'function' || typeof onUpdate === 'function') && (
                                <TableColumn>
                                    {typeof onUpdate === 'function' && (
                                    <Button className={`
                                            ${deleteButton.className}
                                            ${user.isEditing ? deleteButton.on.className : deleteButton.off.className}
                                            `}
                                        onClick={(e) => onDelete(e, user.id, user.isEditing)} >{deleteButton.label}</Button>
                                    )}

                                    {typeof onUpdate === 'function' && (
                                    <Button className={`
                                            ${updateButton.className}
                                            ${user.isEditing ? updateButton.on.className : updateButton.off.className}
                                            `}
                                        onClick={(e) => onUpdate(e, user.id, user.isEditing)} >{updateButton.label}</Button>
                                    )}
                                </TableColumn>
                                )}
                            </TableRow>
                        ))
                        :
                        <TableRow>
                            <TableColumn colSpan={headers.length}>{emptyStateMessage}</TableColumn>
                        </TableRow>
                    }
                </TableBody>
            </>
        </Table>


        // <table className="ui-users-table">
        //             <caption>Users Data</caption>
        //             <thead>
        //                 <tr>
        //                     <th>Name</th>
        //                     <th>Email</th>
        //                     <th>Mobile</th>
        //                     <th>DOB</th>
        //                     <th>Gender</th>
        //                     <th>Edit Mode</th>
        //                     <th>Action</th>
        //                 </tr>
        //             </thead>
        // <tbody>

        // {
        //  users_data?.length > 0 
        //   ? users_data.map((user, index) => (
        //         <tr key={index} >
        //                 <td contentEditable={user.isEditing} suppressContentEditableWarning={true}  onInput={e => onInputChange(user.id, 'userName', e.currentTarget.textContent)}>{user.userName}</td>
        //                 <td contentEditable={user.isEditing} suppressContentEditableWarning={true}  onInput={e => onInputChange(user.id, 'userEmail', e.currentTarget.textContent)}>{user.userEmail}</td>
        //                 <td contentEditable={user.isEditing} suppressContentEditableWarning={true}  onInput={e => onInputChange(user.id, 'userMobile', e.currentTarget.textContent)}>{user.userMobile}</td>
        //                 <td contentEditable={user.isEditing} suppressContentEditableWarning={true}  onInput={e => onInputChange(user.id, 'userDOB', e.currentTarget.textContent)}>{user.userDOB}</td>
        //                 <td contentEditable={user.isEditing} suppressContentEditableWarning={true}  onInput={e => onInputChange(user.id, 'userGender', e.currentTarget.textContent)}>{user.userGender}</td>
        //                 <td >
        //                     <button  className={`ui-table-btn ui-button ui-cell-toogle ${user.isEditing ? 'on' : 'off'}`} onClick = {(e)=> onToggleEdit(e, user.id)} >
        //                         {user.isEditing ? 'ON' : 'OFF'}
        //                     </button>
        //                 </td>
        //                 <td><button className={`ui-table-btn ui-button ui-cell-delete margin-right-10 ${user.isEditing ? 'on' : 'off'}`} onClick = {(e)=> onDelete(e, user.id, user.isEditing)} >Delete</button>
        //                     <button className={`ui-table-btn ui-button ui-cell-update ${user.isEditing ? 'on' : 'off'}`} onClick = {(e)=> onUpdate(e, user.id, user.isEditing)} >Update</button>
        //                 </td>
        //             </tr>
        //     ))
        //     : <tr><td colSpan="7" align="center">No data found</td></tr>
        // }

        // </tbody>
        // </table>
    );
}
