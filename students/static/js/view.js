// Retrieve data and store all local storage content in an array
var arr = allstorage();

let i = arr.length;
while (i--) {
    // Convert all array JSON content into objects
    arr[i] = JSON.parse(arr[i]);
}

// Sorted data for TopStudents page
let arrSorted = arr.sort((x, y) => (x.gpa < y.gpa) ? 1 : (x.gpa > y.gpa) ? -1 : 0);

// Change table content
let tableBody = document.querySelector('#students-data tbody');
tableBody.innerHTML = ''; // Clear existing table rows

for (let i = 0; i < arrSorted.length; i++) {
    let student = arrSorted[i];
    let row = document.createElement('tr');
    let nameCell = document.createElement('td');
    nameCell.innerText = student.name;
    let idCell = document.createElement('td');
    idCell.innerText = student.id;
    let gpaCell = document.createElement('td');
    gpaCell.innerText = student.Gpa;
    let departCell = document.createElement('td');
    departCell.innerText = student.Depart;
    let statusCell = document.createElement('td');
    statusCell.innerHTML = (student.statu == 1) ? '<span class="active-dot" style="background: green;"></span>' : '<span class="active-dot"></span>';
    let deleteCell = document.createElement('td');
    let deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', '/delete/' + student.id);
    deleteLink.innerText = 'Delete';
    deleteCell.appendChild(deleteLink);

    row.appendChild(nameCell);
    row.appendChild(idCell);
    row.appendChild(gpaCell);
    row.appendChild(departCell);
    row.appendChild(statusCell);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
}

function allstorage() {
    var val = [],
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        val.push(localStorage.getItem(keys[i]));
    }
    return val;
}
