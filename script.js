function signup(event) {
    event.preventDefault();

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var addressLine1 = document.getElementById('addressLine1').value;
    var city = document.getElementById('city').value;
    var state = document.getElementById('state').value;
    var pincode = document.getElementById('pincode').value;
    var userType = document.getElementById('userType').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    var userDetails = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        addressLine1: addressLine1,
        city: city,
        state: state,
        pincode: pincode,
        userType: userType,
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    window.location.href = 'login.html';
}

function login(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedUserDetails && username === storedUserDetails.username && password === 'password') {
        window.location.href = 'dashboard.html?username=' + username + '&userType=' + storedUserDetails.userType;
    } else {
        alert('Invalid credentials');
    }
}

function displayDashboard() {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    var userType = urlParams.get('userType');
    document.getElementById('username').textContent = username;
    var storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    var userDetailsList = document.getElementById('userDetails');

    for (var key in storedUserDetails) {
        var listItem = document.createElement('li');
        listItem.textContent = key + ': ' + storedUserDetails[key];
        userDetailsList.appendChild(listItem);
    }
}

if (window.location.pathname.includes('dashboard.html')) {
    displayDashboard();
}
