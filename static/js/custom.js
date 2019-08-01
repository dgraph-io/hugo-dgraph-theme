// Kitchen Sink of interactive features on the page.

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

var intermediateValNotFunc = function () {
  var FLAG_COOKIE = 'noGithubEngage';
  var NUM_DAYS_COOKIE = 'disableGithubCounterDays';

  function gaEvent(cat, action, label, value) {
    if (!window.ga) {
      console.warn('no ga', arguments)
      return
    }
    window.ga('send', 'event', cat, action, label, value);
  }

  var $githubPopup = $('.github-engage');

  function showGithubEngage() {
    if (!getCookie(FLAG_COOKIE)) {
      $githubPopup.addClass('open');
      gaEvent('Blog', 'github-widget-show');
    }
  }
  function closeGithubEngage(daysToShutUp, addClass) {
    $githubPopup.removeClass('open');
    addClass && $githubPopup.addClass(addClass);

    setCookie(FLAG_COOKIE, 'value', daysToShutUp);
    gaEvent('Blog', 'github-widget-setdisable', 'days', daysToShutUp);
  }
  $('.github-engage .github-close').click(function() {
    // Nag user again in 2, 14, 98,... days.
    // Restart after two years.
    var curDisableDays = getCookie(NUM_DAYS_COOKIE) || 2;
    setCookie(NUM_DAYS_COOKIE, curDisableDays * 7, 365 * 2);
    gaEvent('Blog', 'github-widget-declined');

    closeGithubEngage(curDisableDays, 'dismissAnimation');
  });

  document.getElementById('star-us-wrapper').addEventListener('click', function() {
    gaEvent('Blog', 'github-widget-converted');
    setTimeout(function() {
      Visibility.onVisible(function() {
        closeGithubEngage(365 * 5, 'love');
        $('.heart-wrapper').addClass('active');
      });
    }, 500);
  }, /* capture = */ true);

  // Wait 60 seconds as long as page is visible.
  var visibilityCountdown = 60;
  gaEvent('Blog', 'github-widget-start-timer');
  var visibilityId = Visibility.every(1000, function () {
    visibilityCountdown--;
    if (visibilityCountdown < 0) {
      Visibility.stop(visibilityId);
      showGithubEngage();
    }
  });
};

intermediateValNotFunc()
