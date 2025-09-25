import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, appendUsers, addUser, deleteUser, updateUser, toggleEditMode } from '../actions/signupActions';
import { useNotification } from '../context/NotificationContext';
import { getUsersInDb, addUserInDb, deleteUserInDb, updateUserInDb } from '../services/request.js';
import { validateUserData } from '../utils/userValidator';
import { useNavigate } from 'react-router-dom';

function useUsersPage() {
    let users = useSelector((state) => state.usersState.users);
    let dispatch = useDispatch();
    let { notify } = useNotification();
    let navigate = useNavigate();
    let signupConfig = useRef({
        currentPageNo: 0,
        limit: 10,
        prefetchHeightBefore: 100,
        scrollContainer: null,
        isDataAvailableToFetch: true,
        isFetching: false,
    });
    let setScrollContainer = useCallback((el) => {
        signupConfig.current.scrollContainer = el;
    }, []);
    let [editingUsers, setEditingUsers] = useState({});

    useEffect(() => {
        fetchUsers(0);                  // 1st-fetch
        let scrollContainer = signupConfig.current.scrollContainer;
        if (!scrollContainer) {
            return;
        }
        let handleScroll = () => {
            if (scrollContainer.scrollTop + scrollContainer.clientHeight >= scrollContainer.scrollHeight - signupConfig.current.prefetchHeightBefore) {
                if (signupConfig.current.isDataAvailableToFetch && !signupConfig.current.isFetching) {
                    fetchUsers(signupConfig.current.currentPageNo + 1);
                }
            }
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

    function fetchUsers(pageNo) {            // Read operation
        signupConfig.current.isFetching = true;
        let callback = {
            success: (resp) => {
                if (pageNo === 0) {
                    dispatch(setUsers(resp));
                }
                else {
                    dispatch(appendUsers(resp));
                }

                signupConfig.current.isFetching = false;
                signupConfig.current.currentPageNo = pageNo;
                signupConfig.current.isDataAvailableToFetch = resp.length === signupConfig.current.limit;

            },
            error: (err) => {
                notify("Error occured in fetching", "ui-error");
                signupConfig.current.isFetching = false;
                console.log(err);
            }
        }
        let data = {
            _start: pageNo * signupConfig.current.limit,
            _limit: signupConfig.current.limit
        };
        getUsersInDb(callback, data);
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
        // unnecessary as update is done in '/update' page
        // value = value?.trim();
        // setEditingUsers(prev =>
        // ({
        //     ...prev, [userId]: { ...prev[userId], [columnName]: value }
        // }));
    }

    function onUpdate(event, userId, isNotInEditMode) {
        if (!isNotInEditMode) {
            notify("Kindly enable edit mode ON to perform the operation", "ui-warn");
            return;
        }
    
        let userToUpdate = editingUsers[userId];
    
        navigate('/updateUser', {
            state: {
                initialFormData : {
                    userid_val : userToUpdate.id,
                    username_val: userToUpdate.userName,
                    useremail_val: userToUpdate.userEmail,
                    usermobilenum_val: userToUpdate.userMobile,
                    userdateofbirth_val: userToUpdate.userDOB,
                    usergender_val: userToUpdate.userGender,
                }
            }
        });

    }


    return { setScrollContainer, users, onToggleEdit, onDelete, onUpdate, onRowCellChange };
}
export default useUsersPage;