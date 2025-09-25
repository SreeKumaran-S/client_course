import '../styles/style.css';
import useSignup from '../hooks/useSignup'
import { inputRenderMap } from '../components/DynamicForm/inputRenderers';
import {useLocation} from 'react-router-dom';

function Signup() {
    let location = useLocation();
    let initialFormData = location.state?.initialFormData ||
    {
        userid_val: crypto.randomUUID(),
        username_val: "",
        useremail_val: "",
        usermobilenum_val: "",
        userdateofbirth_val: "",
        usergender_val: "-"
    }
    let { formElements } = useSignup(initialFormData);
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
        </div>
    )
}

export default Signup;
