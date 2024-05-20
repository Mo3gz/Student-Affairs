function validateForm() {
    const form = document.getElementById('subbut');
    const nationalId = form.elements['NatID'].value;
    const fullName = form.elements['Name'].value;
    const gpa = form.elements['Gpa'].value;

    const errorField = document.getElementById('error-field');
    errorField.innerHTML = '';

    if (!nationalId || !fullName || !gpa) {
        errorField.innerHTML = '<p>Please fill in all fields.</p>';
        return false;
    }

    if (nationalId.length !== 14) {
        errorField.innerHTML = '<p>National ID must be 14 characters long.</p>';
        return false;
    }

    const gpaValue = parseFloat(gpa);
    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
        errorField.innerHTML = '<p>GPA must be a valid number between 0 and 4.</p>';
        return false;
    }

    return true;
}

function makeAjaxRequest(url, method, data) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': '{{ csrf_token }}', // Include the CSRF token
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .catch(error => {
            console.error('Error:', error);
        });
}

function handleFormSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const form = document.getElementById('subbut');
    const studentId = form.elements['studentId'].value;

    makeAjaxRequest('/edit/', 'POST', { ID: studentId })
        .then(response => {
            if (response.exists) {
                window.location.href = '/edit/' + response.student_id + '/';
            } else {
                alert('Student ID does not exist!');
            }
        });
}

document.getElementById('subbut').addEventListener('submit', handleFormSubmit);
