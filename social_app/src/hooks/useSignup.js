import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getUsersInDb, addUserInDb, deleteUserInDb, updateUserInDb } from '../services/request.js';
import { setUsers, appendUsers, addUser, deleteUser, updateUser, toggleEditMode } from '../actions/signupActions';
import { useNotification } from '../context/NotificationContext';
import { validateUserData } from '../utils/userValidator';
import { useNavigate, useLocation} from 'react-router-dom';

function useSignup(initialFormData) {
    let users = useSelector((state) => state.usersState.users);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { notify } = useNotification();
    let location = useLocation();

    let [userFormData, setUserFormData] = useState(initialFormData);

    function getMaxDate() {
        return new Date().toISOString().split('T')[0];
    }

    function onUserSignup(e) {
        e.preventDefault();

        let { userid_val, username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val } = userFormData;
        username_val = username_val.trim();
        useremail_val = useremail_val.trim();
        usermobilenum_val = usermobilenum_val.trim();

        let invalidFields = validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val);

        if (invalidFields.length === 0) {
            let user = {};
            user['id'] = userid_val;
            user['userName'] = username_val;
            user['userEmail'] = useremail_val;
            user['userMobile'] = usermobilenum_val;
            user['userDOB'] = userdateofbirth_val;
            user['userGender'] = usergender_val;

            if (location.pathname.startsWith("/addUser")) {
                let callback = {
                    success: (resp) => {
                        notify("User data created successfully", "ui-info");
                        dispatch(addUser(user));
                        console.log(resp);
                        // navigate('/');
                    },
                    error: (err) => {
                        notify("Error occured in sign up", "ui-error");
                        console.log(err);
                    }
                }
                addUserInDb(callback, user);                 // Create operation
            }
            else if (location.pathname.startsWith("/updateUser")) {
                let { id, ...userObjectToUpdate } = user;
                let callback = {
                    success: (resp) => {
                        notify("Yaay updated your data in db !!", "ui-info");
                        dispatch(updateUser(id, userObjectToUpdate));
                        console.log(resp);
                        navigate('/');
                    },
                    error: (err) => {
                        notify("Error occured in updation", "ui-error");
                        console.log(err);
                    }
                };

                updateUserInDb(callback, id, userObjectToUpdate);     // Update operation 
            }
            
            setUserFormData(initialFormData);
        }
        else {
            let incorrectDataMessage = `Recheck these incorrect fields:\n${invalidFields.join('\n')}`;
            notify(incorrectDataMessage, ["ui-warn", "ui-invalid-fields"]);
        }
    }



    let formElements = [
        {
            label: "Name",
            type: 'text',
            value: userFormData['username_val'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, username_val: e.target.value }))
        },
        {
            label: "Email",
            type: 'text',
            value: userFormData['useremail_val'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, useremail_val: e.target.value }))
        },
        {
            label: "Mobile No",
            type: 'text',
            value: userFormData['usermobilenum_val'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, usermobilenum_val: e.target.value }))
        },
        {
            label: "Date of birth",
            type: 'date',
            max_limit: getMaxDate(),
            value: userFormData['userdateofbirth_val'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userdateofbirth_val: e.target.value }))
        },
        {
            label: "Gender",
            type: 'select',
            value: userFormData['usergender_val'],
            options: [
                { value: "-", label:"Select Gender", 'hide': true },
                { value: "male", label: "male" },
                { value: "female", label: "female" },
                { value: "transgender", label: "transgender" }
            ],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, usergender_val: e.target.value }))
        },
        {
            type: "actions",
            className: "ui-sub-content ui-button-actions ui-flex ui-justify-space-between",
            children: [
                {
                    type: "submit",
                    value: 'Signup',
                    className: "ui-button ui-submit",
                    onClick: (e) => onUserSignup(e)
                },
                {
                    type: 'reset',
                    value: 'Reset',
                    className: "ui-button ui-reset",
                    onClick: () => setUserFormData(initialFormData)
                }
            ]
        }

    ];

    return { formElements };
}

export default useSignup;