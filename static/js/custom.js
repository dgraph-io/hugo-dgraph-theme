$(document).ready(function() {
  var height = $("#page-header").height()
  $("a.internal").click(function(e) {
      e.preventDefault();
      var href = $(this).attr("href");
       $('html, body').animate({
        scrollTop: $(href).offset().top - height
       }, 0);
  });
});

// Community selector
$(document).on("click", ".community-cta", function(e) {
  e.stopPropagation();
  e.preventDefault();
  $(this).closest(".community-cta-wrapper").toggleClass("open");
});

$(document).on("click", ".community-link", function(e) {
  e.stopPropagation();
  $(this).closest(".community-cta-wrapper").toggleClass("open");
});

$(document).click(function() {
  $(".community-cta-wrapper").removeClass("open");
});

// Fix scroll position after every click on an anchor element.
// Doesn't work when currently targeted anchor is clicked, but good enough
// since this implementation is less likely to break
window.addEventListener("hashchange", function(e) {
  var url = e.newURL || ""
  var idx = url.lastIndexOf('#')
  if (idx > 0) {
    var el = document.getElementById(url.substring(idx + 1))
    if (el) {
      var offsetTop = 0
      while (el) {
        offsetTop += el.offsetTop
        el = el.offsetParent
      }
      document.scrollingElement.scrollTop = offsetTop - 100
    }
  }
}, false);
