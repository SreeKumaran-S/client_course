(function () {

    window.users_data = [];
    let currentPageNo = 0;
    let limit = 5;
    let isFetching = false;
    let isDataAvailableToFetch = true;

    document.addEventListener("DOMContentLoaded", function () {

        fetchUsers(0);
        setPaginationHandlerForUsers();

        let signup_form = document.querySelector("#signup_form");
        let username = signup_form.querySelector('input[name="username"]');
        let useremail = signup_form.querySelector('input[name="useremail"]');
        let usermobilenum = signup_form.querySelector('input[name="usermobilenum"]');
        let userdateofbirth = signup_form.querySelector('input[name="userdateofbirth"]');
        let usergender = signup_form.querySelector('select[name="usergender"]');
        this.usersContainer = document.getElementById('usersContainer');

        setMaxDate(userdateofbirth);

        signup_form.addEventListener('submit', function (event) {
            event.preventDefault();
            let username_val = username.value.trim();
            let useremail_val = useremail.value.trim();
            let usermobilenum_val = usermobilenum.value.trim();
            let userdateofbirth_val = userdateofbirth.value;
            let usergender_val = usergender.value;

            if (validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val)) {
                let newUser = {};

                newUser['id'] = crypto.randomUUID();
                newUser['userName'] = username_val;
                newUser['userEmail'] = useremail_val;
                newUser['userMobile'] = usermobilenum_val;
                newUser['userDOB'] = userdateofbirth_val;
                newUser['userGender'] = usergender_val;

                users_data.push(newUser);

                let callback = {
                    success: (resp) => {
                        showNotification("User data created successfully", "ui-info");
                        console.log(resp);
                        fetchUsers(0);
                    },
                    error: (err) => {
                        showNotification("Error occured in sign up", "ui-error");
                        console.log(err);
                    }
                }
                addUserInDb(callback, newUser);                 // Create operation

                this.reset();

            }
        });
    });

    function renderUsers() {
        let html = `<table class="ui-users-table">
                <caption>Users Data</caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Edit Mode</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>`;

        users_data.length > 0
            ? users_data.map((user, index) => {
                html += `<tr>
                    <td contenteditable="false" data="userName">${user.userName}</td>
                    <td contenteditable="false" data="userEmail">${user.userEmail}</td>
                    <td contenteditable="false" data="userMobile">${user.userMobile}</td>
                    <td contenteditable="false" data="userDOB">${user.userDOB}</td>
                    <td contenteditable="false" data="userGender">${user.userGender}</td>
                    <td ><button id="toggleButton" class="ui-table-btn ui-button"onclick = "toggleEditMode(event, '${user.id}')" value="OFF">OFF</button>
                    <td><button class="ui-table-btn ui-button" onclick = "deleteUser(event, '${user.id}')" value="delete">Delete</button>
                        <button class="ui-table-btn ui-button" onclick = "updateUser(event, '${user.id}')" value="update">Update</button>
                    </td>
                </tr>`;
            })
            : html += `<tr><td colspan="7" align="center">No data found</td></tr>`;

        html += `</tbody></table>`;
        usersContainer.innerHTML = html;
    }
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
            showNotification(incorrectDataMessage, ["ui-warn", "ui-invalid-fields"]);
        }
        else {
            return true;
        }

    }

    function validateName(userName) {
        return userName.length > 0 ? true : false;
    }
    function validateEmail(userEmail) {
        let regexPattern = /[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,4}$/;
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
        return today > dob;
    }
    function setMaxDate(element) {
        let dobInput = element;
        let today = new Date().toISOString().split('T')[0];
        dobInput.setAttribute('max', today);
    }

    window.toggleEditMode = function (event, idOfUserToToggleEdit) {
        let targetRow = event.currentTarget.closest("tr");
        let targetButton = event.currentTarget;
        let editState = targetButton.value;

        targetRow.querySelectorAll('td').forEach((element) => {
            if (element.hasAttribute('contenteditable')) {
                if (editState == 'ON') {
                    element.setAttribute("contenteditable", false);
                }
                else {
                    element.setAttribute("contenteditable", true);
                }
            }
        });
        let newEditState = editState === 'OFF' ? 'ON' : "OFF";
        targetButton.value = newEditState;
        targetButton.textContent = newEditState;
    }

    window.deleteUser = function (event, idOfUserToRemove) {
        let targetRow = event.currentTarget.closest("tr");
        let isNotInEditMode = targetRow.querySelector("#toggleButton").value === 'OFF';
        if (isNotInEditMode) {
            showNotification("Kindly enable edit mode ON to perform the operation", "ui-warn");
            return;
        }
        targetRow.remove();
        users_data = users_data.filter(user => user.id != idOfUserToRemove);

        let callback = {
            success: (resp) => {
                showNotification("Wipped your data in db", "ui-info");
                fetchUsers(0);
                console.log("Updated list: ");
                users_data.forEach((item) => {
                    console.log(item);
                });
            },
            error: (err) => {
                showNotification("Error occured in deletion", "ui-error");
                console.log(err);
            }
        };
        deleteUserInDb(callback, idOfUserToRemove);     // Delete operation
    }
    window.updateUser = function (event, idOfUserToUpdate) {
        let targetRow = event.currentTarget.closest("tr");
        let tableData = targetRow.querySelectorAll('td');
        let isNotInEditMode = targetRow.querySelector("#toggleButton").value === 'OFF';

        if (isNotInEditMode) {
            showNotification("Kindly enable edit mode ON to perform the operation", "ui-warn");
            return;
        }
        let updateUser = {};

        tableData.forEach(element => {
            if (element.hasAttribute('contenteditable')) {
                let key = element.getAttribute('data');
                let value = element.textContent.trim();
                updateUser[key] = value;

            }
        });
        let valuesArray = Object.values(updateUser);
        if (validateUserData(...valuesArray)) {
            let storeIndex = users_data.findIndex(user => user.id == idOfUserToUpdate);
            users_data[storeIndex] = Object.assign({}, users_data[storeIndex], updateUser);

            let callback = {
                success: (resp) => {
                    console.log(resp);
                    showNotification("Yaay updated your data in db !!", "ui-info");
                },
                error: (err) => {
                    showNotification("Error occured in updation", "ui-error");
                    console.log(err);
                }
            };

            updateUserInDb(callback, idOfUserToUpdate, updateUser);     // Update operation

        }
    
        console.log("Store Data: ");
        users_data.forEach((item) => {
            console.log(item);
        });
    }

    window.fetchUsers = (pageNo) => {            // Read operation
        let callback = {
            success: (resp) => {
                if(pageNo == 0){
                    users_data = resp;
                }
                else{
                    users_data.push(...resp);
                }
               
                renderUsers();
                isFetching = false;
                isDataAvailableToFetch = resp.length == limit ;
            },
            error: (err) => {
                showNotification("Error occured in fetching", "ui-error");
                console.log(err);
            }
        }
        let data = {
            _start: pageNo * limit,
            _limit: limit
        };
        getUsersInDb(callback, data);
        currentPageNo = pageNo;
    }

    window.setPaginationHandlerForUsers = () => {                                   // pagination handler
        window.addEventListener("scroll", () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
                if(isDataAvailableToFetch && !isFetching ){
                    fetchUsers(currentPageNo + 1);
                }
            }
        });
    }

})();