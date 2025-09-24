import '../styles/style.css';
import useSignup from '../hooks/useSignup'
import { inputRenderMap } from '../components/DynamicForm/inputRenderers';
import UsersTable from '../components/UsersTable';
// import Table from '../components/Table/Table';
// import TableHeader from '../components/Table/TableHeader';
// import TableBody from '../components/Table/TableBody';
// import TableHeadColumn from '../components/Table/TableHeadColumn';
// import TableRow from '../components/Table/TableRow';
// import TableColumn from '../components/Table/TableColumn';
// import Button from '../components/Button';

function Signup() {
    let { formElements, users, onToggleEdit, onDelete, onUpdate, onRowCellChange } = useSignup();
    let headers = ["Name", "Email", "Mobile", "DOB", "Gender", "Edit Mode", "Action"];
    let columnsToShow = ["userName", "userEmail", "userMobile", "userDOB", "userGender"];
    let tableClassName = "ui-users-table";
    let elementValues = {
        caption_val : 'Users Data',
        delete_val : 'Delete',
        update_val : 'Update',
        emptyTable_val : 'No data found'
    };
    
    return (
        <div className="ui-crud-container ui-flex">
            <main className="ui-main-content ui-flex ">
                <div className="ui-signup-image ui-align-stretch"></div>
                <form id="signup_form" className="ui-signup-form ui-flex ui-align-center">
                    <h1 className="ui-form-title">REACT - Sign up form</h1>

                    {formElements.map((field, ind) => {
                        let InputRender = inputRenderMap[field.type];
                        if (InputRender == null) {
                            console.log(InputRender);
                        }

                        return (
                            <div key={ind} className="ui-sub-content ui-flex ui-align-center">
                                {field.label && <label>{field.label}</label>}
                                <InputRender field={field} />
                            </div>
                        )
                    })}
                </form>
            </main>
            <div id="usersContainer" className="ui-users-data-table">        
                
                <UsersTable 
                    className={tableClassName}
                    columnsToShow={columnsToShow}
                    headers={headers}
                    users={users}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                    onRowCellChange={onRowCellChange}
                    onToggleEdit={onToggleEdit}
                    elementValues={elementValues}
                />

                {/* <UsersTable users_data={users}  onToggleEdit={onToggleEdit} onDelete={onDelete} onUpdate={onUpdate} onInputChange={onRowCellChange} /> */}
                
                {/* <Table className={"ui-users-table"}>
                    <>
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
                                        <Button className={`ui-table-btn ui-button ui-cell-delete margin-right-10 ${user.isEditing ? 'on' : 'off'}`} onClick={(e) => onDelete(e, user.id, user.isEditing)} >Delete</Button>
                                        <Button className={`ui-table-btn ui-button ui-cell-update ${user.isEditing ? 'on' : 'off'}`} onClick={(e) => onUpdate(e, user.id, user.isEditing)} >Update</Button>
                                    </TableColumn>
                                </TableRow>
                                
                            ))
                            :
                               <TableRow>
                                    <TableColumn colSpan={headers.length}>No data found</TableColumn>
                               </TableRow>
                               
                            }
                        </TableBody>
                    </>
                </Table> */}
            </div>
        </div>
    )
}

export default Signup;