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
