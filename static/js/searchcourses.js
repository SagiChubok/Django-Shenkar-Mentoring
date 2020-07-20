


var ajaxResultA;
var ajaxResultB;

function myfoo2(i) {
  const date = new Date(ajaxResultA.courses[i].datePublished);
  const year = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(date);
  const month = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(date);
  const day = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(date);

  var flag = ajaxResultB[2];
  var intersted_str;
  if (flag == 0) intersted_str = "הרשמה";
  else intersted_str = "הסרת השתתפות";

  var full_name = ajaxResultB[0];
  var userid = ajaxResultB[1];

  var course_name = ajaxResultA.courses[i].courseName;
  var datePublished = day + "/" + month + "/" + year;
  var more_info = ajaxResultA.courses[i].moreInfo;
  var intersted =
    ajaxResultA.courses[i].currentIntersted +
    "/" +
    ajaxResultA.courses[i].maxInterested;
  var course_img = ajaxResultA.courses[i].img;

  var card =
    "<div class='card' id= course_" +
    ajaxResultA.courses[i].id +
    " data-aos='zoom-in'>   <div class='img-fit'> <img src=" +
    course_img +
    " alt='coverimg'> <div class='blackCover'></div></div>    <div class='description'> <h1>הקורס המוצע: " +
    course_name +
    "</h1>    <h2><i class='fa fa-user-circle' aria-hidden='true'></i>&nbsp;פורסם על ידי:&nbsp; <a href='../profile/" +
    userid +
    "' target='_blank'>" +
    full_name +
    "</a> &nbsp; <i class='fa fa-calendar' aria-hidden='true'></i>&nbsp;תאריך פרסום:&nbsp;" +
    datePublished +
    "</h2> <p>" +
    more_info +
    "</p>       <div class='interstingLeft'><button type='button' class='btn btn-outline-dark' onclick='toggle_interested(\"" +
    ajaxResultA.courses[i].id +
    "\")' >" +
    intersted_str +
    "</button></div>  </div>   <div class='card-footer'><div class='interstingRight'><i class='fas fa-users'></i>   <span>" +
    intersted +
    " סטודנטים מתעניינים בקורס המוצע על ידי מנטור זה</span></div></div>    </div>";

  $("#courses-cards-section").append(card);


}

function myfoo() {
  $("#courses-cards-section").fadeOut(200, function () {
    $(this).empty().show();
  });

  setTimeout(function () {
    for (let i = 0; i < ajaxResultA.courses.length; i++) {
      ajaxResultB = "";

      if (
        ajaxResultA.courses[i].courseName == $("#stdcrs").val() ||
        $("#stdyear").val() == null
      ) {

        $("#noInfo").text("");

        $.ajax({
          url:
            "./getmentor/" +
            ajaxResultA.courses[i].mentor_id +
            "/" +
            ajaxResultA.courses[i].id,
          async: true,
          method: "GET",
          dataType: "json",
          contentType: "application/json",
          success: function (mentor) {
            ajaxResultB = mentor;

            myfoo2(i);
          },
        });
      }
    }
  }, 300);
}

function toggle_interested(id) {
  var url = "./toggleinterested/" + id;
  $("#form_interested").attr("action", url);

  $("#courses-cards-section").fadeOut(500, function () {
    $(this).empty().show();
  });

  $("#form_interested").submit();
}

function getcourses() {
  $("#noInfo").text("אין נתונים להצגה");

  $.ajax({
    url: "./getcourses",
    async: true,
    method: "GET",
    dataType: "json",
    contentType: "application/json",
    success: function (data) {
      ajaxResultA = data;
      myfoo();
    },
  });



}

$(document).ready(function () {
  AOS.init();

    getcourses();



  $("#stdcrs").change(function () {

    getcourses();


  });

  $("#stdyear").change(function () {

    $("#noInfo").text("אין נתונים להצגה");


    $("#courses-cards-section").fadeOut(500, function () {
      $(this).empty().show();
    });
  });

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
});