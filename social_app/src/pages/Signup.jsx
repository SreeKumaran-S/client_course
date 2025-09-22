import '../styles/style.css';
import useSignup from '../hooks/useSignup'
import { inputRenderMap } from '../components/DynamicForm/inputRenderers';
import UsersTable from '../components/UsersTable';

function Signup(){
    let {formElements,  users, onToggleEdit ,onDelete, onUpdate, onRowCellChange} =  useSignup();
    return (
        <div className="ui-crud-container ui-flex">     
        <main className="ui-main-content ui-flex ">
        <div className="ui-signup-image ui-align-stretch"></div>
        <form id="signup_form" className="ui-signup-form ui-flex ui-align-center">
            <h1 className="ui-form-title">REACT - Sign up form</h1>

            {formElements.map((field, ind)=>{
                let InputRender = inputRenderMap[field.type];
                if(InputRender == null){
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
        <UsersTable users_data={users}  onToggleEdit={onToggleEdit} onDelete={onDelete} onUpdate={onUpdate} onInputChange={onRowCellChange} />
        </div>
       </div>
    )
}

export default Signup;