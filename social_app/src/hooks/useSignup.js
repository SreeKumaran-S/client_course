import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import { getUsersInDb, addUserInDb, deleteUserInDb, updateUserInDb } from '../services/request.js';
import { addUser, updateUser} from '../actions/signupActions';
import { useNotification } from '../context/NotificationContext';
import { validateUserData } from '../utils/userValidator';
import { useNavigate, useParams } from 'react-router-dom';
import { constants } from '../services/constants';

function useSignup(pageName) {
    let { notify } = useNotification();
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let { id } = useParams();

    let initialFormData = useRef({
        userId: crypto.randomUUID(),
        userName: "",
        userEmail: "",
        userMobile: "",
        userDOB: "",
        userGender: "",
    });

    let [userFormData, setUserFormData] = useState(initialFormData.current);

    useEffect(() => {
        if (pageName === constants.UPDATE_USER_PAGE) {
            let callback = {
                success: (resp) => {
                    console.log(resp);
                    let { id, userName, userEmail, userMobile, userDOB, userGender } = resp[0];
                    let fetchedData = {
                        userId: id,
                        userName, userEmail, userMobile, userDOB, userGender
                    };

                    initialFormData.current = fetchedData;
                    setUserFormData(initialFormData.current);
                },
                error: (err) => {
                    notify("Error occured in fetching", "ui-error");
                    console.log(err);
                }
            }
            let data = { id };
            getUsersInDb(callback, data);
        }
    },[]);

    function getMaxDate() {
        return new Date().toISOString().split('T')[0];
    }

    function onUserSignup(e) {
        e.preventDefault();

        let { userId, userName, userEmail, userMobile, userDOB, userGender } = userFormData;
        userName = userName.trim();
        userEmail = userEmail.trim();
        userMobile = userMobile.trim();

        let invalidFields = validateUserData(userName, userEmail, userMobile, userDOB, userGender);

        if (invalidFields.length === 0) {
            let user = { userId, userName, userEmail, userMobile, userDOB, userGender };

            if (pageName === constants.ADD_USER_PAGE) {
                let callback = {
                    success: (resp) => {
                        notify("User data created successfully", "ui-info");
                        dispatch(addUser(user));
                        console.log(resp);
                        navigate('/');
                    },
                    error: (err) => {
                        notify("Error occured in sign up", "ui-error");
                        console.log(err);
                    }
                }
                addUserInDb(callback, user);                 // Create operation
            }
            else if (pageName === constants.UPDATE_USER_PAGE) {
                let { userId, ...userObjectToUpdate } = user;
                let callback = {
                    success: (resp) => {
                        notify("Yaay updated your data in db !!", "ui-info");
                        dispatch(updateUser(userId, userObjectToUpdate));
                        console.log(resp);
                        navigate('/');
                    },
                    error: (err) => {
                        notify("Error occured in updation", "ui-error");
                        console.log(err);
                    }
                };

                updateUserInDb(callback, userId, userObjectToUpdate);     // Update operation 
            }

            setUserFormData(initialFormData.current);
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
            value: userFormData['userName'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userName: e.target.value }))
        },
        {
            label: "Email",
            type: 'text',
            value: userFormData['userEmail'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userEmail: e.target.value }))
        },
        {
            label: "Mobile No",
            type: 'text',
            value: userFormData['userMobile'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userMobile: e.target.value }))
        },
        {
            label: "Date of birth",
            type: 'date',
            max_limit: getMaxDate(),
            value: userFormData['userDOB'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userDOB: e.target.value }))
        },
        {
            label: "Gender",
            type: 'select',
            value: userFormData['userGender'],
            options: [
                { value: "", label: "Select Gender", 'hide': true },
                { value: "male", label: "male" },
                { value: "female", label: "female" },
                { value: "transgender", label: "transgender" }
            ],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, userGender: e.target.value }))
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
                    onClick: () => setUserFormData(initialFormData.current)
                }
            ]
        }

    ];

    return { formElements };
}

export default useSignup;