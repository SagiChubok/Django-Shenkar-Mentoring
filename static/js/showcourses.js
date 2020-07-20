var text_max = 200;
var current_len = 0;
var current_len2 = 0;

var ajaxResultA;
var ajaxResultB;

function showdata(i) {
  var fullname = ajaxResultB.student[0];
  var phone = ajaxResultB.student[1];
  var mail = ajaxResultB.student[2];
  var userid = ajaxResultB.student[3];
  var imgurl = ajaxResultB.student[4];

  var tr =
    "<tr data-aos='zoom-in-down'> <td><img class='smallImage' src= \"" +
    imgurl +
    '"></td>' +
    "<td> <a href='../profile/" +
    userid +
    "' target='_blank'> <span class='courseSpanStd'>" +
    fullname +
    "</span></a> </td>" +
    "<td> <div class='courseButtons'> <a href='mailto:" +
    mail +
    "?subject=Shenkar%20Mentoring'> <i class='fa fa-envelope-o' aria-hidden='true'></i> </a>" +
    "<a href='https://wa.me/" +
    phone +
    "?text=Shenkar Mentoring -שלום, אני מתעניין באחד הקורסים שאת/ה מציע/ה ב' target='_blank'> <i class='fa fa-whatsapp' aria-hidden='true'></i> </a> </div> </td> </tr>";

  $("#interested-section").append(tr);
}

function grabdata() {
  setTimeout(function () {
    for (let i = 0; i < ajaxResultA.courses.length; i++) {
      ajaxResultB = "";

      $.ajax({
        url: "./getstudent/" + ajaxResultA.courses[i].Student_id,
        async: true,
        method: "GET",
        dataType: "json",
        contentType: "application/json",
        success: function (student) {
          ajaxResultB = student;
          showdata(i);
        },
      });
    }
  }, 300);
}

function readStudents(id, current) {
  if (current > 0) {
    $("#noInfo").text("");

    $.ajax({
      url: "./getinterested/" + id,
      async: true,
      method: "GET",
      dataType: "json",
      contentType: "application/json",
      success: function (data) {
        ajaxResultA = data;

        grabdata();
      },
      error: function (request) {},
    });
  }
  else{
    $("#noInfo").text("אין נתונים להצגה");
  }
}

function clearModal() {
  $("#studentsModal").on("hidden.bs.modal", function () {
    $("#interested-section").empty();
  });
}

function updateModal(id, info) {
  var url = "update/" + id;
  $("#updateinfocrs").val(info);
  $("#form_updatecourse").attr("action", url);
  current_len2 = info.length;

  // About Textarea with character count
  current_len = $("#updateinfocrs").val().length;
  $(".count_message2").html(current_len + " / " + text_max);
}

function addCourseSubmit() {
  if (
    submitUserType("select[name=stdyear]") &&
    submitUserType("select[name=stdcrs]") &&
    submitMaxStudents("#intmax") &&
    submitTextArea(".text")
  )
    $("#form_addcourse").submit();
  else alert("אחד או יותר מהשדות שהוזנו אינם תקינים");
}

function updateCourseSubmit() {
  if (submitTextArea("#updateinfocrs")) $("#form_updatecourse").submit();
  else alert("אחד או יותר מהשדות שהוזנו אינם תקינים");
}

$(document).ready(function () {
  //Clear forms
  $(".modal").on("hidden.bs.modal", function () {
    $(this).find("input,textarea,select").val("").end();
    $(this).find("input,textarea,select").removeClass("is-invalid");
    $(this).find("input,textarea,select").removeClass("is-valid");
    $(".count_message").html(0 + " / " + text_max);
  });

  clearModal();

  
  $("#openSettings").click(function () {
    if (!$('#openSettings').hasClass("active")) 
    {
      $('#openSettings').addClass("active");
      $('#profile_settings').addClass("fadeIn-profile_settings");
    }
  });

  $("#profile_settings").mouseleave(function () {
    if ($('#openSettings').hasClass("active")) 
    {
      $('#openSettings').removeClass("active");
      $('#profile_settings').removeClass("fadeIn-profile_settings");
    }
  });


  $(".hamburger").click(function () {
    $(this).toggleClass("open");
  });

  $('[data-toggle="tooltip"]').tooltip();

  AOS.init();

  // About Textarea with character count
  current_len = $(".text").val().length;
  $(".count_message").html(current_len + " / " + text_max);

  $(".text").keyup(function () {
    submitTextArea(this);
    var text_length = $(".text").val().length;
    var text_remaining = text_max - text_length;
    $(".count_message").html(text_length + " / " + text_max);
  });

  $("#updateinfocrs").keyup(function () {
    submitTextArea(this);
    var text_length = $("#updateinfocrs").val().length;
    var text_remaining = text_max - text_length;
    $(".count_message2").html(text_length + " / " + text_max);
  });

  $("#intmax").change(function () {
    submitMaxStudents(this);
  });

  $("select[name=stdyear]").change(function () {
    submitUserType(this);
  });

  $("select[name=stdcrs]").change(function () {
    submitUserType(this);
  });
});
