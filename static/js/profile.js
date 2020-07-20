var text_max = 200;
var current_len = 0;

function editProfileSubmit() {
  if (submitMail("#mail") && submitPhone("#phone") && submitTextArea(".text"))
    $("#myProfileForm").submit();
  else alert("אחד או יותר מהשדות שהוזנו אינם תקינים");
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $("#profileImg").attr("src", e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
}

$(document).ready(function () {

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

  $("#id_image").change(function () {
    readURL(this);
  });

  $("#phone").keyup(function () {
    submitPhone(this);
  });

  $("#mail").keyup(function () {
    submitMail(this);
  });

  var str = window.location.href;
  if (str.indexOf("edit") >= 0) {
    // About Textarea with character count
    current_len = $(".text").val().length;
    $(".count_message").html(current_len + " / " + text_max);

    $(".text").keyup(function () {
      submitTextArea(this);
      var text_length = $(".text").val().length;
      var text_remaining = text_max - text_length;
      $(".count_message").html(text_length + " / " + text_max);
    });

      //disable enter textarea
      $('textarea').keypress(function(event) {

        if (event.keyCode == 13) {
            event.preventDefault();
        }
    });

  }
});
