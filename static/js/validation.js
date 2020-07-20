function validName(id) {
    var regex = "^[\u0590-\u05FF ']+$";
    var cnt = 0;
    var flag = 0;
    var fullName = $(id).val();
    var fullNameLen = fullName.length;
  
    if (fullName.charAt(0) == " " || fullName.charAt(fullNameLen - 1) == " ")
      return false;
  
    for (let i = 0; i < fullNameLen; i++) {
      if (fullName.charAt(i) == " ") {
        cnt++;
        flag = 1;
      }
      if (i + 1 != fullNameLen) {
        if (flag && fullName.charAt(i + 1) == " ") {
          return false;
        }
        flag = 0;
      }
    }
    if (fullName.match(regex) && cnt > 0) return true;
    return false;
  }
  function validMail(id) {
    var mail = $(id).val();
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mail.match(regex)) return true;
    return false;
  }
  function validID(id) {
    var item = $(id).val();
    var regexB = /^\d{9}$/;
    if (item.match(regexB)) return true;
    return false;
  }
  function validPhone(id) {
    var item = $(id).val();
    var regexB = /^\d{10}$/;
    if (item.match(regexB)) return true;
    return false;
  }
  function validType(id) {
    var age = $(id).val();
    if (age != null) return true;
    else return false;
  }
  function validPassword(id) {
    var item = $(id).val();
    var len = item.length;
    if (len >= 4 && len <= 12) return true;
    return false;
  }
  function maxStudent(id) {
    var item = $(id).val();
    var regexB = /^[0-9]+$/;
    if (item.match(regexB))
      return true;
    return false;
  }
  function validTextArea(id) {
    var item = $(id).val();
    var len = item.length;
    if (len >= 10 && len <= 200) return true;
    return false;
  }
  
  function submitRegisterID(id) {
    if (validID(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitPhone(id) {
    if (validPhone(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitMail(id) {
    if (validMail(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitUserType(id) {
    if (validType(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitRegisterPass(id) {
    if (validPassword(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitFullName(id) {
    if (validName(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitTextArea(id) {
    if (validTextArea(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }
  function submitMaxStudents(id)
  {
    if (maxStudent(id)) {
      if ($(id).hasClass("is-invalid")) $(id).removeClass("is-invalid");
  
      if (!$(id).hasClass("is-valid")) $(id).addClass("is-valid");
      return true;
    } else {
      if ($(id).hasClass("is-valid")) $(id).removeClass("is-valid");
  
      if (!$(id).hasClass("is-invalid")) $(id).addClass("is-invalid");
      return false;
    }
  }