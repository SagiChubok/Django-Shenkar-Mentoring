function show() {
  var len = $("#stdcrs option").length;
  if (len > 1) {
    $("#stdcrs option").slice(1, len).remove();
  }

  var selectmenuID = document.getElementById("stdyear");
  var optionValue = selectmenuID.options[selectmenuID.selectedIndex].value;

  if (optionValue == "שנה א'") {
    optionValue = 1;
  } else if (optionValue == "שנה ב'") {
    optionValue = 2;
  } else if (optionValue == "שנה ג'") {
    optionValue = 3;
  } else if (optionValue == "שנה ד'") {
    optionValue = 4;
  }
  optionValue = optionValue - 1;

  $("#stdcrs").val($("#stdcrs option:first").val());

  $.getJSON("../static/data/courses.json", function (data) {
    for (let i = 0; i < data.year[optionValue].courses.length; i++) {
      $("#stdcrs").append(
        '<option value="' +
          data.year[optionValue].courses[i].name +
          '">' +
          data.year[optionValue].courses[i].name +
          "</option>"
      );
    }
  });
}

function getCmbData() {
  $.getJSON("../static/data/courses.json", function (data) {
    $.each(data.year, function () {
      $("#stdyear").append(
        '<option value="' + this.name + '">' + this.name + "</option>"
      );
    });
  });
}

$(document).ready(function () {
  getCmbData();
});
