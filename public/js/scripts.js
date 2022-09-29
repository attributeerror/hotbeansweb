/*!
  * Start Bootstrap - Freelancer v6.0.5 (https://startbootstrap.com/theme/freelancer)
  * Copyright 2013-2020 Start Bootstrap
  * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
  * 
  * Many changes made by Paul Reffell - this is quite different from the default file.
*/
function scrollIntoViewAndError(elem) {
  elem.scrollintoview({
    duration: "fast",
    direction: "vertical",
    complete: function() {
      elem.focus();

      elem.addClass("is-invalid");
      if(elem.is("select")) {
        elem.one("change", function() {
          elem.removeClass("is-invalid");
        });
      } else {
        elem.one("keyup", function() {
          elem.removeClass("is-invalid");
        });
      }
    }
  });
}
function setHelpDisplay(elem, message) {
  var $this = elem,
    $controlGroup = $this.parents(".control-group").first(),
    $helpBlock = $controlGroup.find(".help-block").first();

  $helpBlock.html("<ul role='alert'><li>" + message + "</li></ul>");
  if($this.is("select")) {
    $this.one("change", function() {
      $helpBlock.html("");
    });
  } else {
    $this.one("keyup", function() {
      $helpBlock.html("");
    });
  }
}

(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 71)
        }, 1000, "easeInOutExpo");
        
        //remove hash from URL
        window.history.pushState("", document.title, window.location.pathname + window.location.search);

        //cancel click event
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).on("scroll", function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  new bootstrap.ScrollSpy(document.body, {
    target: "#mainNav",
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  
  // page load stuffs
  var i = 0;
  var subheading = document.getElementsByClassName("masthead-subheading")[0];
  var slogan = subheading.innerHTML;
  subheading.innerHTML = "";
  function typeWriter() {
    if(i < slogan.length) {
      document.getElementsByClassName("masthead-subheading")[0].innerHTML += slogan.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  setTimeout(typeWriter, 500);
  
  // contact form stuffs
  function contactReset() {
    $("#contact-resetfields").html("Reset fields"); //reset to default text
    $("input[id^=contact-], textarea[id^=contact-]").val(""); //empty fields
    $("[id^=contact-], textarea[id^=contact-]").each(function(index, el) {
      var elem = $(el);
      if(elem.css("border") === "1px solid rgb(255, 0, 0)") {
        elem.css({ "border": "" });
      }
      elem.toggleClass("is-invalid", false);
      elem.parents(".control-group").first().find(".help-block").first().html("");
    }); //reset border to default
    
    $("input[id^=contact-][maxlength], textarea[id^=contact-][maxlength]").each(function(index, el) {
      var elem = $(el);
      var helper = elem.next(".form-text").children("#charLimit");
      helper.text(elem.attr("maxlength") + " characters remaining.");
      helper.removeClass("text-warning");
      helper.removeClass("text-danger");
      helper.addClass("text-muted");
    });
  }

  var confirmingContactReset = false;
  $("#contact-resetfields").click(function() {
    if(!confirmingContactReset) {
      $("#contact-resetfields").html("Are you sure?"); //confirm choice
      confirmingContactReset = true;
    } else {
      contactReset();
      confirmingContactReset = false;
    }
  });
  $("#contact-submit").click(function() {
    var email = $("#contact-email"),
      name = $("#contact-name"),
      message = $("#contact-message");
    if(email.val() === "") {
      scrollIntoViewAndError(email);
      setHelpDisplay(email, "This field is required.");
      return false;
    } else {
      if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email.val()))) {
        scrollIntoViewAndError(email);
        setHelpDisplay(email, "You must enter a valid email address.");
        return false;
      }
    }

    if(name.val() === "") {
      scrollIntoViewAndError(name);
      setHelpDisplay(name, "This field is required.");
      return false;
    }

    if(message.val() === "") {
      scrollIntoViewAndError(message);
      setHelpDisplay(message, "This field is required.");
      return false;
    } else {
      if(message.val().length > 2000) {
        scrollIntoViewAndError(message);
        setHelpDisplay(message, "You can only use 2000 characters in this field.");
        return false;
      }
    }

    alert("Your message has been sent off! You'll hear back from us shortly.");
    contactReset();
  });

  // application form stuffs
  function applyReset() {
    $("#apply-resetfields").html("Reset fields"); //reset to default text 
    $("input[id^=apply-], textarea[id^=apply-]").val(""); //empty fields
    $("select[id^=apply-]").val("none"); //reset all dropdowns 
    $("[id^=apply-], textarea[id^=apply-], select[id^=apply-]").each(function(index, el) {
      var elem = $(el);
      if(elem.css("border") === "1px solid rgb(255, 0, 0)") {
        elem.css({ "border": "" });
      }
      elem.toggleClass("is-invalid", false);
      elem.parents(".control-group").first().find(".help-block").first().html("");
    }); // reset border to default

    $("input[id^=apply-][maxlength], textarea[id^=apply-][maxlength]").each(function(index, el) {
      var elem = $(el);
      var helper = elem.next(".form-text").children("#charLimit");
      helper.text(elem.attr("maxlength") + " characters remaining.");
      helper.removeClass("text-warning");
      helper.removeClass("text-danger");
      helper.addClass("text-muted");
    });
  }

  $("#applyform select").each(function(index, el) {
    var elem = $(el);
    elem.find("option[default]").attr("selected", "").attr("disabled", "");
  });

  var confirmingApplyReset = false;
  $("#apply-resetfields").click(function() {
    if(!confirmingApplyReset) {
      $("#apply-resetfields").html("Are you sure?"); //confirm choice
      confirmingApplyReset = true;
    } else {
      applyReset();
      confirmingApplyReset = false;
    }
  });
  $("#apply-submit").click(function() {
    var email = $("#apply-email"),
      name = $("#apply-name"),
      courses = $("#apply-courses"),
      position = $("#apply-position"),
      experience = $("#apply-experience"),
      skills = $("#apply-skills"),
      teamwork = $("#apply-teamwork"),
      versioncontrol = $("#apply-versioncontrol");
    
    if(email.val() === "") {
      scrollIntoViewAndError(email);
      setHelpDisplay(email, "You must fill out the email field.");
      return false;
    } else {
      if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email.val()))) {
        scrollIntoViewAndError(email);
        setHelpDisplay(email, "You must enter a valid email address.");
        return false;
      }
    }

    if(name.val() === "") {
      scrollIntoViewAndError(name);
      setHelpDisplay(name, "You must fill out the name field.");
      return false;
    }

    if(courses.val() === "") {
      scrollIntoViewAndError(courses);
      setHelpDisplay(courses, "You must fill out the courses field.");
      return false;
    } else {
      if(courses.val().length > 2000) {
        scrollIntoViewAndError(courses);
        setHelpDisplay(courses, "You can only use 2000 characters in the courses field.");
        return false;
      }
    }

    if(position.find("option:selected").val() === "none") {
      scrollIntoViewAndError(position);
      setHelpDisplay(position, "You must select one of options for the positions field.");
      return false;
    }

    if(experience.val() === "") {
      scrollIntoViewAndError(experience);
      setHelpDisplay(experience, "You must fill out the experience field.");
      return false;
    } else {
      if(experience.val().length > 2000) {
        scrollIntoViewAndError(experience);
        setHelpDisplay(experience, "You can only use 2000 characters in the experience field.");
        return false;
      }
    }

    if(skills.val() === "") {
      scrollIntoViewAndError(skills);
      setHelpDisplay(skills, "You must fill out the skills filed.");
      return false;
    } else {
      if(skills.val().length > 2000) {
        scrollIntoViewAndError(skills);
        setHelpDisplay(skills, "You can only use 2000 characters in the skills field.");
        return false;
      }
    }

    if(teamwork.find("option:selected").val() === "none") {
      scrollIntoViewAndError(teamwork);
      setHelpDisplay(teamwork, "You must select one of the options for the teamwork field.");
      return false;
    }

    if(versioncontrol.find("option:selected").val() === "none") {
      scrollIntoViewAndError(versioncontrol);
      setHelpDisplay(versioncontrol, "You must select one of the options for the version control field.");
      return false;
    }

    alert("Your application has been sent! You'll hear back from us shortly.");
    applyReset();
  });

  // courses form stuffs 
  function coursesReset() {
    $("#courses-resetfields").html("Reset fields"); //reset to default text 
    $("input[id^=courses-]").val(""); //empty text fields 
    $("select[id^=courses-]").val("none"); //reset options 
    $("input[id^=courses-], select[id^=courses-]").each(function(index, el) {
      var elem = $(el);
      if(elem.css("border") === "1px solid rgb(255, 0, 0)") {
        elem.css({ "border": "" });
      }
      elem.toggleClass("is-invalid", false);
      elem.parents(".control-group").first().find(".help-block").first().html("");
    }); //reset border to default

    $("#courses-whichHelp").find("#price").html("£0.00"); //reset price calculation
  }

  var confirmingCourseReset = false;
  $("#courses-resetfields").click(function() {
    if(!confirmingCourseReset) {
      $("#courses-resetfields").html("Are you sure?"); //confirm choice 
      confirmingCourseReset = true;
    } else {
      coursesReset();
      confirmingCourseReset = false;
    }
  });
  $("#courses-submit").click(function() {
    var email = $("#courses-email"),
      name = $("#courses-name"),
      courses = $("#courses-which");
    
      if(email.val() === "") {
        scrollIntoViewAndError(email);
        setHelpDisplay(email, "You must fill out the email field.");
        return false;
      } else {
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(email.val()))) {
          scrollIntoViewAndError(email);
          setHelpDisplay(email, "You must enter a valid email address.");
          return false;
        }
      }

      if(name.val() === "") {
        scrollIntoViewAndError(name);
        setHelpDisplay(name, "You must fill out the name field.");
        return false;
      }

      if(!courses.find("option:selected").length) {
        scrollIntoViewAndError(courses);
        setHelpDisplay(courses, "You must choose at least one course.");
        return false;
      }

      alert("Your request to partake in these courses has been received! You will hear from us shortly.");
      coursesReset();
  });

  // price calculator 
  $("#courses-which").change(function() {
    var price = Array.from($("#courses-which").find("option:selected").map((index, el) => {
      var elem = $(el);
      return elem.data("price");
    })).reduce(function(prev, current) {
      return prev + current;
    }, 0);
    
    $("#courses-whichHelp").find("#price").html(price.toLocaleString("en-GB", { style: "currency", currency: "GBP" }));
  });

  // dynamic characters remaining
  $("input[maxlength], textarea[maxlength]").keyup(function() {
    var max = $(this).attr("maxlength");
    var length = $(this).val().length;
    var counter = max-length;

    var helper = $(this).parent().next(".form-text").children("#charLimit");

    if(counter !== 1) helper.text(counter + " characters remaining.");
    else helper.text(counter + " character remaining.");

    if(counter <= 0) {
      helper.removeClass("text-warning");
      helper.removeClass("text-muted");
      helper.addClass("text-danger");
    } else if(counter <= 25) {
      helper.removeClass("text-danger");
      helper.removeClass("text-muted");
      helper.addClass("text-warning");
    } else {
      helper.removeClass("text-danger");
      helper.removeClass("text-warning");
      helper.addClass("text-muted");
    }
  });
})(jQuery); // End of use strict
  