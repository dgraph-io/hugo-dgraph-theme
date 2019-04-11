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

(function() {
  // This code sets visibility: hidden for images outside the user's viewport.
  // It adds a listener for scroll events to perform realtime update of the images state.
  var allImages = $('.article-content img')
  if (allImages.length < 10) {
    return;
  }

  function onScroll() {
    allImages.each(function(i, img) {
      img = $(img)
      var h = img.height()
      var top = img.offset().top
      var bottom = top + h

      var viewBegin = document.scrollingElement.scrollTop
      var viewEnd = viewBegin + window.outerHeight
      viewBegin -= 100
      viewEnd += 100
      var isVisible = top > viewBegin && top < viewEnd
          || bottom > viewBegin && bottom < viewEnd
          || top <= viewBegin && bottom >= viewEnd;

      var oldVisibility = img.css('visibility');
      var newVisibility = isVisible ? 'visible' : 'hidden';
      if (oldVisibility != newVisibility) {
        img.css('visibility', newVisibility)
      }
    })
  }
  $(onScroll);

  window.addEventListener(
      'scroll',
      _.throttle(onScroll, 80, {leading: false, trailing: true}),
  );
})()
