$(document).ready(function() {
  $("#subbut").click(function(event) {
    event.preventDefault();
    validateForm();
    if (formIsValid) {
      storeData();
    }
  });
});

function validateForm() {
  var idInput = $("[name='id']");
  var nationalIdInput = $("[name='NatID']");
  var GpaInput = $("[name='Gpa']");
  var level = $("[name='level']").val();
  var depart = $("[name='Depart']").val();
  var name = $("[name='name']");
  
  

  if (idInput.val().length !== 8) {
    document.getElementById('error-field').innerHTML = "ID must be exactly 8 characters long.";
    return;
  }

  if (nationalIdInput.val().length !== 14) {
    document.getElementById('error-field').innerHTML = "National ID must be exactly 14 characters long.";
    return;
  }

  if (name.val().length == 0) {
    document.getElementById('error-field').innerHTML = "Please Enter Name";
    return;
  }

  if (GpaInput.val() > 4 || GpaInput.val() < 0 || GpaInput.val().length == 0) {
    document.getElementById('error-field').innerHTML = "GPA must be less than or equal to 4";
    return;
  }

  if( (level == 1 || level == 2) && depart != 'none'){
    document.getElementById('error-field').innerHTML = "Level 1, 2 Can't Assign Department";
    return;
  }

  if( (level == 3 || level == 4) && depart == 'none'){
    document.getElementById('error-field').innerHTML = "Level 3, 4 must Assign Department";
    return;
  }
  
  $("#add-student-form").submit();
  
}

function storeData() {
  var id = $("#id").val();
  var natId = $("[name='NatID']").val();
  var name = $("[name='name']").val();
  var gpa = $("[name='Gpa']").val();
  var level = $("[name='level']").val();
  var depart = $("[name='Depart']").val();
  var status = $("[name='status']").val();
  var gender = $("[name='gender']:checked").val();

  var data = {
    id: id,
    NatID: natId,
    name: name,
    Gpa: gpa,
    level: level,
    Depart: depart,
    status: status,
    gender: gender,
    csrfmiddlewaretoken: getCookie('csrftoken')
  };

  $.ajax({
    type: "POST",
    url: "{% url 'add' %}",
    data: data,
    success: function(response) {
      if (response.error) {
        $("#error-field").text(response.error);
      } else {
        resetForm();
        alert("Student added successfully.");
      }
    },
    error: function(xhr, errmsg, err) {
      alert("Error occurred while adding student.");
    }
  });
}

function resetForm() {
  $("#id").val("");
  $("#NatID").val("");
  $("#name").val("");
  $("#Gpa").val("");
  $("#level").val("");
  $("#Depart").val("");
  $("#status").val("");
  $("#gender").prop("checked", false);
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}