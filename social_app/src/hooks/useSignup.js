import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { getUsersInDb, addUserInDb, deleteUserInDb, updateUserInDb } from '../services/request.js';
import { setUsers, appendUsers, addUser, deleteUser, updateUser, toggleEditMode } from '../actions/signupActions';
import { useNotification } from '../context/NotificationContext';

function useSignup() {
    
    useEffect(() => {
        fetchUsers(0);                  // 1st-fetch
        let handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - signupConfig.current.prefetchHeightBefore) {
                if (signupConfig.current.isDataAvailableToFetch && !isFetching) {
                    fetchUsers(signupConfig.current.currentPageNo + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    let users = useSelector((state) => state.usersState.users);
    let dispatch = useDispatch();
    let { notify } = useNotification();
    let [isFetching, setIsFetching] = useState(false);
    let signupConfig = useRef({
        currentPageNo: 0,
        limit: 5,
        prefetchHeightBefore: 100,
        isDataAvailableToFetch: true
    });

    const initialFormData = {
        username_val: "",
        useremail_val: "",
        usermobilenum_val: "",
        userdateofbirth_val: "",
        usergender_val: ""
    };
    let [userFormData, setUserFormData] = useState(initialFormData);
    let [editingUsers, setEditingUsers] = useState({});

    function validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val) {
        let validateFields = {
            name: validateName(username_val),
            email: validateEmail(useremail_val),
            mobile: validateMobile(usermobilenum_val),
            dob: validateDOB(userdateofbirth_val),
            gender: validateGender(usergender_val)
        };


        let incorrectDataMessage = "";
        for (let key in validateFields) {
            if (!validateFields[key]) {
                incorrectDataMessage = incorrectDataMessage.concat(key + "\n");
            }
        }
        if (incorrectDataMessage.length > 0) {
            incorrectDataMessage = `Recheck these incorrect fields \n${incorrectDataMessage}`;
            notify(incorrectDataMessage, ["ui-warn", "ui-invalid-fields"]);
            return false;
        }
        else {
            return true;
        }

    }

    function validateName(userName) {
        return !!userName?.length;
    }
    function validateEmail(userEmail) {
        let regexPattern = /[a-zA-Z0-9_\-.]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,4}$/;
        return regexPattern.test(userEmail);
    }
    function validateMobile(userMobile) {
        let regexPattern = /^\+91\s?[6-9][0-9]{9}$/;
        return regexPattern.test(userMobile);
    }
    function validateGender(userGender) {
        let regexPattern = /^(male|female|transgender)$/;
        return regexPattern.test(userGender);
    }
    function validateDOB(userDOB) {
        let dob = new Date(userDOB);
        let today = new Date();
        return !!userDOB && today > dob;
    }
    function getMaxDate() {
        return new Date().toISOString().split('T')[0];
    }

    function onToggleEdit(e, userId) {
        if (!editingUsers[userId]) {
            let user = users.find(u => u.id === userId);
            if (user) {
                setEditingUsers(prev =>
                    ({ ...prev, [userId]: { ...user } })
                );
            }
        }
        dispatch(toggleEditMode(userId));
    }

    function onDelete(event, userId, isNotInEditMode) {
        if (!isNotInEditMode) {
            notify("Kindly enable edit mode ON to perform the operation", "ui-warn");
            return;
        }

        let callback = {
            success: (resp) => {
                delete editingUsers[userId];
                dispatch(deleteUser(userId));
                notify("Wipped your data in db", "ui-info");
                fetchUsers(0);
            },
            error: (err) => {
                notify("Error occured in deletion", "ui-error");
                console.log(err);
            }
        };
        deleteUserInDb(callback, userId);     // Delete operation
    }
    function onRowCellChange(userId, columnName, value) {
        value = value.trim();
        setEditingUsers(prev =>
        ({
            ...prev, [userId]: { ...prev[userId], [columnName]: value }
        }));
    }
  
    function onUpdate(event, userId, isNotInEditMode) {
        let userToUpdate = editingUsers[userId];

        if (!isNotInEditMode) {
            notify("Kindly enable edit mode ON to perform the operation", "ui-warn");
            return;
        }

        let { userName, userEmail, userMobile, userDOB, userGender } = userToUpdate;
  
        if (validateUserData(userName, userEmail, userMobile, userDOB, userGender)) {
            let { id, ...userObjectToUpdate } = userToUpdate;
            let callback = {
                success: (resp) => {
                    dispatch(updateUser(userId, userObjectToUpdate ));
                    notify("Yaay updated your data in db !!", "ui-info");
                    console.log(resp);
                },
                error: (err) => {
                    notify("Error occured in updation", "ui-error");
                    console.log(err);
                }
            };

            updateUserInDb(callback, userId, userObjectToUpdate);     // Update operation    
        }
    }

    function onUserSignup(e) {
        e.preventDefault();
        
        let { username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val } = userFormData;
        username_val = username_val.trim();
        useremail_val = useremail_val.trim();
        usermobilenum_val = usermobilenum_val.trim();

        if (validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val)) {
            let newUser = {};
            newUser['id'] = crypto.randomUUID();
            newUser['userName'] = username_val;
            newUser['userEmail'] = useremail_val;
            newUser['userMobile'] = usermobilenum_val;
            newUser['userDOB'] = userdateofbirth_val;
            newUser['userGender'] = usergender_val;

            let callback = {
                success: (resp) => {
                    notify("User data created successfully", "ui-info");
                    console.log(resp);
                    dispatch(addUser(newUser));
                    fetchUsers(0);
                },
                error: (err) => {
                    notify("Error occured in sign up", "ui-error");
                    console.log(err);
                }
            }
            addUserInDb(callback, newUser);                 // Create operation
            setUserFormData(initialFormData);
        }
    }

    function fetchUsers(pageNo) {            // Read operation
        setIsFetching(true);
        let callback = {
            success: (resp) => {
                if (pageNo === 0) {
                    dispatch(setUsers(resp));
                }
                else {
                    dispatch(appendUsers(resp));
                }

                setIsFetching(false);
                signupConfig.current.currentPageNo = pageNo;
                signupConfig.current.isDataAvailableToFetch = resp.length === signupConfig.current.limit;

            },
            error: (err) => {
                notify("Error occured in fetching", "ui-error");
                setIsFetching(false);
                console.log(err);
            }
        }
        let data = {
            _start: pageNo * signupConfig.current.limit,
            _limit: signupConfig.current.limit
        };
        getUsersInDb(callback, data);
    }

    let formElements = [
        {
            label: "Name",
            type: 'text',
            value: userFormData['username_val'],
            onChange: (e) => setUserFormData((prev) => ({ ...prev, username_val: e.target.value}))
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
                { value: "Select Gender", 'hide': true },
                { value: "male" },
                { value: "female" },
                { value: "transgender" }
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

    return { formElements, users, onToggleEdit, onDelete, onUpdate, onRowCellChange };
}

export default useSignup;