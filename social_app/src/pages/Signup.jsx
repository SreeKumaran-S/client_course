import '../styles/style.css';
import { nameChange} from "../actions/signupActions";
import useSign from '../hooks/useSign'

function Signup(){
    let {value, dispatch} = useSign();
    return (
        <div className="ui-crud-container ui-flex">
            <div>Your name is {value}</div>
        <main className="ui-main-content ui-flex ">
        <div className="ui-signup-image ui-align-stretch"></div>
        <form id="signup_form" className="ui-signup-form ui-flex ui-align-center">
            <h1 className="ui-form-title">Sign up form</h1>
            <div className="ui-sub-content ui-flex ui-align-center">
            <label htmlFor="username">Name</label>
            <input type="text" name="username" onChange= {(e)=>dispatch(nameChange(e.target.value))} />
            </div>
            <div className="ui-sub-content ui-flex ui-align-center">
            <label htmlFor="useremail">Email</label>
            <input type="text" name="useremail" />
                                                 
            </div>
            <div className="ui-sub-content ui-flex ui-align-center">
            <label htmlFor="usermobilenum">Mobile No</label>
            <input type="tel" name="usermobilenum" placeholder="+91 10 digit number" />
            </div>
            <div className="ui-sub-content ui-flex ui-align-center">
            <label htmlFor="userdateofbirth">Date of birth</label>
            <input type="date" name="userdateofbirth" />
            </div>
            <div className="ui-sub-content ui-flex ui-align-center">
            <label htmlFor="usergender" >Gender</label>
            <select name="usergender" >
                <option value="" hidden>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="transgender">Transgender</option>
            </select>
            </div>
            <div className="ui-sub-content ui-button-actions ui-flex ui-justify-space-between">
                <button className="ui-button ui-submit">Sign Up</button>
                <button type="reset" className="ui-button ui-reset">Reset</button>
            </div>
        </form>
        </main>
       </div>
    )
}

export default Signup;