function animateElements() {
  $(".progressbar").each(function () {
    var elementPos = $(this).offset().top;
    var topOfWindow = $(window).scrollTop();
    var percent = $(this).find(".circle").attr("data-percent");
    var percentage = parseInt(percent, 10) / parseInt(100, 10);
    var animate = $(this).data("animate");
    if (elementPos < topOfWindow + $(window).height() - 30 && !animate) {
      $(this).data("animate", true);
      $(this)
        .find(".circle")
        .circleProgress({
          startAngle: -Math.PI / 2,
          value: percent / 100,
          thickness: 14,
          fill: {
            color: "#f85858",
          },
        })
        .on("circle-animation-progress", function (event, progress, stepValue) {
          $(this)
            .find("div")
            .text((stepValue * 100).toFixed(1) + "%");
        })
        .stop();
      $(".circle p").fadeIn(1500);
    }
  });
}

function registerSubmit() {
  if (
    submitRegisterID("#registerID") &&
    submitRegisterPass("#registerPass") &&
    submitFullName("#fullName") &&
    submitMail("#mail") &&
    submitPhone("#phone") &&
    submitUserType("select[name=usertype]")
  )
    $("#registerForm").submit();
  else alert("אחד או יותר מהשדות שהוזנו אינם תקינים");
}

function loginSubmit() {
  if (
    submitRegisterID("#usernameInput") &&
    submitRegisterPass("#passwordInput")
  )
    $("#loginForm").submit();
  else alert("אחד או יותר מהשדות שהוזנו אינם תקינים");
}

function loader() {
  $('html, body').css('overflowY', 'hidden'); 
  setTimeout(function () {
    $("#rightHand").addClass("rh-animation");
    $("#leftHand").addClass("lh-animation");
  }, 800);

  setTimeout(function () {
    $("#screenLoader").addClass("hidden");
    $('html, body').css('overflowY', 'visible'); 
  }, 3600);

}



$(document).ready(function () {
  loader();
  //Animate Charts
  animateElements();
  $(window).scroll(animateElements);

  //Clear Modals
  $(".modal").on("hidden.bs.modal", function () {
    $(this).find("input,textarea,select").val("").end();
    $(this).find("input,textarea,select").removeClass("is-invalid");
    $(this).find("input,textarea,select").removeClass("is-valid");
  });

  $("#registerID").keyup(function () {
    submitRegisterID(this);
  });

  $("#phone").keyup(function () {
    submitPhone(this);
  });

  $("#mail").keyup(function () {
    submitMail(this);
  });

  $("select[name=usertype]").change(function () {
    submitUserType(this);
  });

  $("#registerPass").keyup(function () {
    submitRegisterPass(this);
  });

  $("#fullName").keyup(function () {
    submitFullName(this);
  });

  $("#usernameInput").keyup(function () {
    submitRegisterID(this);
  });

  $("#passwordInput").keyup(function () {
    submitRegisterPass(this);
  });
});
