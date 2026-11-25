function checkMark() {
let name = document.forms["gradeForm"]["name"].value;
let mark = document.forms["gradeForm"]["mark"].value;

if (name === "") {
    alert("Name must be filled out.");
    return false;
}

// Check if mark is empty
if (mark === "") {
    alert("Mark field cannot be empty.");
    return false;
}

if (isNaN(mark)) {
    alert("Please enter a valid numeric value.");
    return false;
}

mark = parseInt(mark);

if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
}

let grade;
let colour;

if (mark >= 80) {
    grade = "A";
    colour = "green";
} else if (mark >= 65) {
    grade = "B";
    colour = "green";
} else if (mark >= 50) {
    grade = "C";
    colour = "orange";
} else {
    grade = "F";
    colour = "red";
}

document.getElementById("result").innerHTML =
    name + " got grade " + grade;

// Change result colour according to grade
document.getElementById("result").style.color = colour;

// Display date and time
let now = new Date();

document.getElementById("dateTime").innerHTML =
    "Checked on: " + now;

return false;
}

function showTable() {
let grades = ["A", "B", "C", "F"];
let ranges = ["80-100", "65-79", "50-64", "0-49"];

let tableHTML = "<table>";
tableHTML += "<tr><th>Grade</th><th>Mark Range</th></tr>";

for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] +
        "</td><td>" + ranges[i] + "</td></tr>";
}

tableHTML += "</table>";

document.getElementById("tableContainer").innerHTML = tableHTML;
}

// Generate a random mark from 0 to 100
function randomMark() {
let random = Math.floor(Math.random() * 101);

document.getElementById("mark").value = random;
}