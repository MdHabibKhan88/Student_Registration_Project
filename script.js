const form = document.getElementById("studentForm");

const errorIds = [
    "nameError",
    "emailError",
    "phoneError",
    "dobError",
    "departmentError",
    "genderError",
    "passwordError"
];

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    errorIds.forEach(id => showError(id, ""));
    document.getElementById("successMessage").textContent = "";
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const department = document.getElementById("department").value;
    const password = document.getElementById("password").value;
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    const gender = selectedGender ? selectedGender.value : "";

    let isValid = true;

    if (name === "") {
        showError("nameError", "Full name is required.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailPattern.test(email)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    if (phone === "") {
        showError("phoneError", "Phone number is required.");
        isValid = false;
    }

    if (dob === "") {
        showError("dobError", "Date of birth is required.");
        isValid = false;
    } else if (new Date(dob) > new Date()) {
        showError("dobError", "Date of birth cannot be in the future.");
        isValid = false;
    }

    if (department === "") {
        showError("departmentError", "Please select a department.");
        isValid = false;
    }

    if (gender === "") {
        showError("genderError", "Please select your gender.");
        isValid = false;
    }

    if (password.length < 8) {
        showError("passwordError", "Password must be at least 8 characters.");
        isValid = false;
    }

    if (!isValid) return;

    const tableBody = document.getElementById("studentData");
    const emptyRow = document.getElementById("emptyRow");
    if (emptyRow) emptyRow.remove();

    const row = document.createElement("tr");

    // Password is intentionally not displayed in the table.
    [name, email, phone, dob, department, gender].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
    });

    tableBody.appendChild(row);

    document.getElementById("successMessage").textContent =
        "Student registered successfully!";

    form.reset();
});

form.addEventListener("reset", function () {
    clearErrors();
});
