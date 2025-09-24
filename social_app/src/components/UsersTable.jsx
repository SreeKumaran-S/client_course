import Table from '../components/Table/Table';
import Caption from '../components/Table/Caption';
import TableHeader from '../components/Table/TableHeader';
import TableBody from '../components/Table/TableBody';
import TableHeadColumn from '../components/Table/TableHeadColumn';
import TableRow from '../components/Table/TableRow';
import TableColumn from '../components/Table/TableColumn';
import Button from '../components/Button';

// export default function UsersTable({users_data, onToggleEdit, onDelete, onUpdate, onInputChange}) {
   export default function UsersTable({
    className,
    columnsToShow,
    headers,
    users,
    onDelete, 
    onUpdate, 
    onToggleEdit,
    onRowCellChange,
    elementValues}) {    
    return(
         <Table className={className}>
                    <>
                        <Caption>{elementValues.caption_val}</Caption>
                        <TableHeader>
                            <TableRow >
                               {
                                headers.map((head, ind)=>(
                                    <TableHeadColumn key={ind}>{head}</TableHeadColumn>
                                ))
                               }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { users?.length > 0 ? 
                               users.map((user, ind) => (
                                <TableRow key={ind} > 
                                    {Object.keys(user).map((column, colInd) => (
                                        columnsToShow.includes(column) && 
                                        <TableColumn key={colInd} contentEditable={user.isEditing} onInput={(e)=> onRowCellChange(user.id, column, e.currentTarget.textContent)}>
                                            {user[column]}     
                                        </TableColumn>
                                    ))}
                                    <TableColumn>
                                        <Button className={`ui-table-btn ui-button ui-cell-toogle ${user.isEditing ? 'on' : 'off'}`} onClick={(e) => onToggleEdit(e, user.id)} >
                                            {user.isEditing ? 'ON' : 'OFF'}
                                        </Button>
                                    </TableColumn>
                                    <TableColumn>
                                        <Button className={`ui-table-btn ui-button ui-cell-delete margin-right-10 ${user.isEditing ? 'on' : 'off'}`} onClick={(e) => onDelete(e, user.id, user.isEditing)} >{elementValues.delete_val}</Button>
                                        <Button className={`ui-table-btn ui-button ui-cell-update ${user.isEditing ? 'on' : 'off'}`} onClick={(e) => onUpdate(e, user.id, user.isEditing)} >{elementValues.update_val}</Button>
                                    </TableColumn>
                                </TableRow>
                                
                            ))
                            :
                               <TableRow>
                                    <TableColumn colSpan={headers.length}>{elementValues.emptyTable_val}</TableColumn>
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