(function () {

    let users_data = [
        {
            "id": 0,
            "userName": "sree",
            "userEmail": "sreemass@example.com",
            "userMobile": "+919988776654",
            "userDOB": "2025-09-02",
            "userGender": "male"
        },
        {
            "id": 1,
            "userName": "john",
            "userEmail": "john.doe@example.com",
            "userMobile": "+919876543210",
            "userDOB": "1990-05-15",
            "userGender": "male"
        },
        {
            "id": 2,
            "userName": "jane",
            "userEmail": "jane.smith@example.com",
            "userMobile": "+918123456789",
            "userDOB": "1995-12-22",
            "userGender": "female"
        },
        {
            "id": 3,
            "userName": "alex",
            "userEmail": "alex.williams@example.com",
            "userMobile": "+917654321098",
            "userDOB": "1988-07-10",
            "userGender": "male"
        }
    ];


    document.addEventListener("DOMContentLoaded", function () {
        renderUsers();
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
                newUser['id'] = users_data.length;
                newUser['userName'] = username_val;
                newUser['userEmail'] = useremail_val;
                newUser['userMobile'] = usermobilenum_val;
                newUser['userDOB'] = userdateofbirth_val;
                newUser['userGender'] = usergender_val;

                users_data.push(newUser);
                renderUsers();
                this.reset();

            }
            else {
               alert("Kindly recheck your data");
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
                    <td ><button id="toggleButton" class="ui-table-btn ui-button"onclick = "toggleEditMode(event, ${index})" value="OFF">OFF</button>
                    <td><button class="ui-table-btn ui-button" onclick = "deleteUser(event, ${index})" value="delete">Delete</button>
                        <button class="ui-table-btn ui-button" onclick = "updateUser(event, ${index})" value="update">Update</button>
                    </td>
                </tr>`;
            })
            : html += `<tr><td colspan="7" align="center">No data found</td></tr>`;

        html += `</tbody></table>`;
        usersContainer.innerHTML = html;
    }
    function validateUserData(username_val, useremail_val, usermobilenum_val, userdateofbirth_val, usergender_val) {
        return (
            validateName(username_val) && validateEmail(useremail_val) &&
            validateMobile(usermobilenum_val) && validateDOB(userdateofbirth_val) &&
            validateGender(usergender_val)
        );
    }

    function validateName(userName) {
        return userName.length > 0 ? true : false;
    }
    function validateEmail(userEmail) {
        let regexPattern = /[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9\-]+(\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,4}$/;
        return regexPattern.test(userEmail);
    }
    function validateMobile(userMobile) {
        let regexPattern = /^\+91[6-9][0-9]{9}$/;
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

    window.deleteUser = function (event, idOfUserToRemove) {
        let targetRow = event.currentTarget.closest("tr");
        let isNotInEditMode = targetRow.querySelector("#toggleButton").value === 'OFF';
        if(isNotInEditMode){
            alert("Kindly enable edit mode ON to perform the operation");
            return;
        }
        targetRow.remove();
        users_data = users_data.filter(user => user.id !== idOfUserToRemove);
        if (users_data.length == 0) {
            renderUsers();
        }
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

    window.updateUser = function (event, idOfUserToUpdate) {
        let targetRow = event.currentTarget.closest("tr");
        let tableData = targetRow.querySelectorAll('td');
        let isNotInEditMode = targetRow.querySelector("#toggleButton").value === 'OFF';

        if(isNotInEditMode){
            alert("Kindly enable edit mode ON to perform the operation");
            return;
        }
        let updateUser = {};

        tableData.forEach(element => {
            if (element.hasAttribute('contenteditable')){
                let key = element.getAttribute('data');
                let value = element.textContent.trim();
                updateUser[key] = value;
            }
        });
        let valuesArray = Object.values(updateUser);
        if (validateUserData(...valuesArray)) {
            let storeIndex = users_data.findIndex(user => user.id === idOfUserToUpdate);
            users_data[storeIndex] = Object.assign({}, users_data[storeIndex], updateUser );
            alert("Yaay !! updated your data")
        }
        else {
            alert("Kindly recheck your data");
        }
        console.log("Store Data: ");
        users_data.forEach((item) => {
            console.log(item);
        });
    }
})();