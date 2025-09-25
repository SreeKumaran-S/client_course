import useUsersPage from '../hooks/useUsersPage';
import UsersTable from '../components/UsersTable';
import Button from '../components/Button';

function UsersPage(){
    let {goToAddUsersPage, setScrollContainer, users, onToggleEdit, onDelete, onUpdate, onRowCellChange} = useUsersPage();
    return(
        <>
        <Button className="ui-button ui-add-usr-btn" onClick={goToAddUsersPage}>Add Users</Button>
     <div id="usersContainer" className="ui-users-data-table ui-flex" ref={setScrollContainer}>
                <UsersTable
                    className = 'ui-users-table'
                    caption = 'Users Data'
                    emptyStateMessage = "No data found"
                    headers = {["Name", "Email", "Mobile", "DOB", "Gender", "Edit Mode", "Action"]}
                    columnsToShow = {["userName", "userEmail", "userMobile", "userDOB", "userGender"]}
                    toggleButton = {{
                        className: `ui-table-btn ui-button ui-cell-toogle`,
                        on: {className:'ui-on', label: 'ON' },
                        off: {className:'ui-off', label: 'OFF'}
                    }}
                    deleteButton = {{
                        label: 'Delete',
                        className: `ui-table-btn ui-button ui-cell-delete margin-right-10`,
                        on: {className:'ui-on'},
                        off: {className:'ui-off' }
                    }}   
                    updateButton = {{
                        label: 'Update',
                        className: `ui-table-btn ui-button ui-cell-update`,
                        on: {className:'ui-on'},
                        off: {className:'ui-off'}
                    }}
                    users = {users}
                    onDelete = {onDelete}
                    onUpdate = {onUpdate}
                    onRowCellChange = {onRowCellChange}
                    onToggleEdit = {onToggleEdit}
                />
     </div>
     </>
          )     
}
export default UsersPage;