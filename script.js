function signup(event) {
    event.preventDefault();

    // Get form values
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

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Save user details to localStorage (for simplicity, in a real app, you'd use a server)
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

    // Redirect to the login page (for simplicity, in a real app, you'd redirect to a login page)
    window.location.href = 'login.html';
}

function login(event) {
    event.preventDefault();

    // Get form values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // For simplicity, check if the username and password match with the stored user details
    var storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedUserDetails && username === storedUserDetails.username && password === 'password') {
        // Redirect to the dashboard with the username and user type
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

    // Display user details from localStorage
    var storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
    var userDetailsList = document.getElementById('userDetails');

    for (var key in storedUserDetails) {
        var listItem = document.createElement('li');
        listItem.textContent = key + ': ' + storedUserDetails[key];
        userDetailsList.appendChild(listItem);
    }
}

// Check if on the dashboard page and display details
if (window.location.pathname.includes('dashboard.html')) {
    displayDashboard();
}
