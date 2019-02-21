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

(function () {
  var FLAG_COOKIE = 'noGithubEngage';
  var NUM_DAYS_COOKIE = 'disableGithubCounterDays';

  var $githubPopup = $('.github-engage');
  console.log('GH Engage', setCookie, getCookie, Visibility, $githubPopup);

  function showGithubEngage() {
    if (!getCookie(FLAG_COOKIE)) {
      $githubPopup.addClass('open')
    }
  }
  function closeGithubEngage(daysToShutUp, addClass) {
    $githubPopup.removeClass('open');
    addClass && $githubPopup.addClass(addClass);

    setCookie(FLAG_COOKIE, 'value', daysToShutUp);
  }
  $('.github-engage .github-close').click(function() {
    // Nag user again in 2, 14, 98,... days.
    // Restart after two years.
    var curDisableDays = getCookie(NUM_DAYS_COOKIE) || 2;
    setCookie(NUM_DAYS_COOKIE, curDisableDays * 7, 365 * 2);

    closeGithubEngage(curDisableDays, 'dismissAnimation');
  });

  document.getElementById('star-us-wrapper').addEventListener('click', function() {
    setTimeout(function() {
      Visibility.onVisible(function() {
        closeGithubEngage(365 * 5, 'love');
        $('.heart-wrapper').addClass('active');
      });
    }, 500);
  }, /* capture = */ true);

  // Wait 60 seconds as long as page is visible.
  var visibilityCountdown = 60;
  var visibilityId = Visibility.every(1000, function () {
    visibilityCountdown--;
    if (visibilityCountdown < 0) {
      Visibility.stop(visibilityId);
      showGithubEngage();
    }
  });
})();
