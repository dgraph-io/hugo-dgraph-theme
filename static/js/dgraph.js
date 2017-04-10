(function() {
    // clipboard
    var clipInit = false;
    $("pre code:not(.no-copy)").each(function() {
        var code = $(this), text = code.text();

        if (text.length > 5) {
            if (!clipInit) {
                var text;
                var clip = new Clipboard(".copy-btn", {
                    text: function(trigger) {
                        text = $(trigger).prev("code").text();
                        return text.replace(/^\$\s/gm, "");
                    }
                });

                clip.on("success", function(e) {
                    e.clearSelection();
                    $(e.trigger)
                        .text("Copied to clipboard!")
                        .addClass("copied");

                    window.setTimeout(
                        function() {
                            $(e.trigger).text("Copy").removeClass("copied");
                        },
                        2000
                    );
                });

                clip.on("error", function(e) {
                    e.clearSelection();
                    $(e.trigger).text("Error copying");

                    window.setTimeout(
                        function() {
                            $(e.trigger).text("Copy");
                        },
                        2000
                    );
                });

                clipInit = true;
            }

            code.after('<span class="copy-btn">Copy</span>');
        }
    });

    // code collapse
    var pres = document.getElementsByTagName("pre");
    Array.prototype.forEach.call(pres, function(pre) {
        if (pre.clientHeight > 330) {
            pre.className += " collapsed";

            var showMore = document.createElement("div");
            showMore.className = "showmore";
            showMore.innerHTML = "<span>Show all</span>";
            showMore.addEventListener("click", function() {
                pre.className = "";
                showMore.parentNode.removeChild(showMore);
            });

            pre.appendChild(showMore);
        }
    });

    // syncWithOriginalRunnable syncs the code change in the runnable modal with
    // the original runnable
    // @params modalRunnableEl - HTML element for modal runable
    // @params text - text to sync
    function syncWithOriginalRunnable(modalRunnableEl, text) {
        var checksum = $(modalRunnableEl).closest(".runnable").data("checksum");
        var $otherRunnable = $(
            '.runnable[data-checksum="' + checksum + '"]'
        ).not("#runnable-modal .runnable");

        $otherRunnable.find(".query-editable").text(text);
    }

    // setupRunnableClipboard configures clipboard buttons for runnable
    // @params runnableEl {HTMLElement} - HTML Element for runnable
    function setupRunnableClipboard(runnableEl) {
        // Set up clipboard
        var codeClipEl = $(runnableEl).find(
            '.code-btn[data-action="copy-code"]'
        )[0];
        var codeClip = new Clipboard(codeClipEl, {
            text: function(trigger) {
                var $runnable = $(trigger).closest(".runnable");
                var text = $runnable.find(".runnable-code").text().trim();
                return text.replace(/^\$\s/gm, "");
            }
        });

        codeClip.on("success", function(e) {
            e.clearSelection();
            $(e.trigger).text("Copied").addClass("copied");

            window.setTimeout(
                function() {
                    $(e.trigger).text("Copy").removeClass("copied");
                },
                2000
            );
        });

        codeClip.on("error", function(e) {
            e.clearSelection();
            $(e.trigger).text("Error copying");

            window.setTimeout(
                function() {
                    $(e.trigger).text("Copy");
                },
                2000
            );
        });

        var outputClipEl = $(runnableEl).find(
            '.code-btn[data-action="copy-output"]'
        )[0];
        var outputClip = new Clipboard(outputClipEl, {
            text: function(trigger) {
                var $runnable = $(trigger).closest(".runnable");
                var $output = $runnable.find(".output");

                var text = $output.text().trim() || " ";
                return text;
            }
        });

        outputClip.on("success", function(e) {
            e.clearSelection();
            $(e.trigger).text("Copied").addClass("copied");

            window.setTimeout(
                function() {
                    $(e.trigger).text("Copy").removeClass("copied");
                },
                2000
            );
        });

        outputClip.on("error", function(e) {
            e.clearSelection();
            $(e.trigger).text("Error copying");

            window.setTimeout(
                function() {
                    $(e.trigger).text("Copy");
                },
                2000
            );
        });
    }

    // launchRunnableModal launches a runnable in a modal and configures the
    // clipboard buttons
    // @params runnabelEl {HTMLElement} - a runnable element
    function launchRunnableModal(runnabelEl) {
        var $runnable = $(runnabelEl);
        var $modal = $("#runnable-modal");
        var $modalBody = $modal.find(".modal-body");

        // set inner html as runnable
        var str = $runnable.prop("outerHTML");
        $modalBody.html(str);

        // show modal
        $modal.modal({
            keyboard: true
        });

        var runnableEl = $modal.find(".runnable");
        setupRunnableClipboard(runnableEl);
    }

    $(document).on("input", "#runnable-modal .query-editable", function(e) {
        syncWithOriginalRunnable(this, e.target.innerText);
    });

    // Running code
    $(document).on("click", '.runnable [data-action="run"]', function(e) {
        e.preventDefault();

        // there can be at most two instances of a same runnable because users can
        // launch a runnable as a modal. they share the same checksum
        var checksum = $(this).closest(".runnable").data("checksum");
        var $currentRunnable = $(this).closest(".runnable");
        var $runnables = $('.runnable[data-checksum="' + checksum + '"]');
        var codeEl = $runnables.find(".output");
        var isModal = $currentRunnable.parents("#runnable-modal").length > 0;
        var query = $(this).closest(".runnable").find(".query-editable").text();

        $runnables.find(".output-container").removeClass("empty error");
        codeEl.text("Waiting for the server response...");

        $.post({
            url: "https://play.dgraph.io/query",
            data: query,
            dataType: "json"
        })
            .done(function(res) {
                var resText = JSON.stringify(res, null, 2);

                codeEl.text(resText);
                for (var i = 0; i < codeEl.length; i++) {
                    hljs.highlightBlock(codeEl[i]);
                }

                if (!isModal) {
                    var currentRunnableEl = $currentRunnable[0];
                    launchRunnableModal(currentRunnableEl);
                }
            })
            .fail(function(xhr, status, error) {
                $runnables.find(".output-container").addClass("error");

                codeEl.text(xhr.responseText || error);
            });
    });

    // Refresh code
    $(document).on("click", '.runnable [data-action="reset"]', function(e) {
        e.preventDefault();

        var $runnable = $(this).closest(".runnable");
        var initialQuery = $runnable.data("initial");

        $runnable.find(".query-editable").text("");

        var isModal = $runnable.parents("#runnable-modal").length > 0;
        if (isModal) {
            syncWithOriginalRunnable($runnable[0], initialQuery);
        }

        window.setTimeout(
            function() {
                $runnable.find(".query-editable").text(initialQuery);
            },
            80
        );
    });

    $(document).on("click", '.runnable [data-action="expand"]', function(e) {
        e.preventDefault();

        var $runnable = $(this).closest(".runnable");
        var runnableEl = $runnable[0];
        launchRunnableModal(runnableEl);
    });

    // Focus editable parts when code is clicked
    $(document).on("click", ".runnable-code", function() {
        $(this).find(".query-editable").focus();
    });

    // Runnable modal event hooks
    $("#runnable-modal").on("hidden.bs.modal", function(e) {
        $(this).find(".modal-body").html("");
    });

    $(".runnable").each(function() {
        setupRunnableClipboard(this);
    });

    /********** Config **/

    // Get clipboard.js to work inside bootstrap modal
    // http://stackoverflow.com/questions/38398070/bootstrap-modal-does-not-work-with-clipboard-js-on-firefox
    $.fn.modal.Constructor.prototype._enforceFocus = function() {};
})();
