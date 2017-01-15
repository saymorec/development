// Contact form handlers.... > JQUERY

var $contactForm = $('#contact-form');

$contactForm.submit(function(e) {
  e.preventDefault();
  var $submit = $('input:submit', $contactForm);
  var defaultSubmitText = $submit.val();

  $.ajax({
    url: '//formspree.io/saymorechifamba@gmail.com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      //$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
      $submit.attr('disabled', true).val('Sending message…');
    },
    success: function(data) {
      //$contactForm.append('<div class="alert alert--success">Message sent!</div>');
      $submit.val('Message sent!');
      setTimeout(function() {
        //$('.alert--success').remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      //$contactForm.find('.alert--loading').hide();
      //$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
      $submit.val('Ops, there was an error.');
      setTimeout(function() {
        //$('.alert--error').remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

// End of contact form handlers


// Collapsible menu button behavior...... >JQUERY


// $(function () { // Same as document.addEventListener("DOMContentLoaded"...
//
//   // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
//   $("#navbarToggle").blur(function (event) {
//     var screenWidth = window.innerWidth;
//     if (screenWidth < 768) {
//       $("#bs-example-navbar-collapse-1").collapse('hide');
//     }
//   });
//
//   // In Firefox and Safari, the click event doesn't retain the focus
//   // on the clicked button. Therefore, the blur event will not fire on
//   // user clicking somewhere else in the page and the blur event handler
//   // which is set up above will not be called.
//   // Refer to issue #28 in the repo.
//   // Solution: force focus on the element that the click event fired on
//   $("#navbarToggle").click(function (event) {
//     $(event.target).focus();
//   });
// });

$(document).on('click', '#bs-example-navbar-collapse-1.in a', function(e) {
$("#bs-example-navbar-collapse-1").removeClass("in");//.addClass("collapse");
});

//IIFE's
(function (global) {

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};


// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/loading_gif/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Remove the class 'active' from all menu buttons
var switchOffActive = function () {
  // Remove 'active' from all buttons

  var ids = [
    "#navHomeButton", "#navLearnButton", "#navProductsButton", "#navRepairsButton",
    "#navGalleryButton", "#navAboutUsButton", "#navWhyAluminiumButton",
    "#navTermsAndConditionsButton"];

  for (var i = 0; i < ids.length; i++) {
      var classes = document.querySelector(ids[i]).className;
      classes = classes.replace(new RegExp("active", "g"), "");
      document.querySelector(ids[i]).className = classes;
  }
};


var switchOnActive = function (id) {
    // switch on active for the given id
  switchOffActive ();
  classes = document.querySelector(id).className;
  classes += " active";
  document.querySelector(id).className = classes;
};

var dc = {};

var homeHtml = "snippets/home.html";
var aboutUsHtml = "snippets/about-us.html";
var galleryHtml = "snippets/gallery.html";
var productsHtml = "snippets/products.html";
var quotationHtml = "snippets/quotation.html";
var repairsHtml = "snippets/repairs.html";
var termsHtml = "snippets/terms-and-conditions.html";
var thanksHtml = "snippets/thanks.html";
var whyAluminiumHtml = "snippets/why-aluminium.html";


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
    switchOnActive("#navHomeButton");
  });
});



// Load the home view
dc.loadHome = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  });
};

// Load the quotation view
dc.loadQuotation = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  quotationHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
    switchOffActive();
  });
};

// Load the gallery view
dc.loadGallery = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  galleryHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  switchOnActive ("#navGalleryButton");
  });
};


// Load the repairs view
dc.loadRepairs = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  repairsHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  switchOnActive ("#navRepairsButton");
  });
};

// Load the product view
dc.loadProducts = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  productsHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  switchOnActive ("#navProductsButton");
  });
};

// Load the terms view
dc.loadTermsAndConditions = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  termsHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;

      var screenWidth = global.innerWidth;
      if (screenWidth < 768) {
        switchOnActive ("#navTermsAndConditionsButton");
      } else {
          switchOnActive ("#navLearnButton");
      }

  });
};

// Load why aluminium view
dc.loadWhyAluminium = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  whyAluminiumHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
      var screenWidth = global.innerWidth;
      if (screenWidth < 768) {
        switchOnActive ("#navWhyAluminiumButton");
      } else {
          switchOnActive ("#navLearnButton");
      }
  });
};

// Load about us view
dc.loadAboutUs = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
  aboutUsHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
      var screenWidth = global.innerWidth;
      if (screenWidth < 768) {
        switchOnActive ("#navAboutUsButton");
      } else {
          switchOnActive ("#navLearnButton");
      }
  });
};

global.$dc = dc;

})(window);
