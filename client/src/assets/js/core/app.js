$(function() {
    function e() {
        var e = $(window).height() - $("body > .navbar").outerHeight() - $("body > .navbar-fixed-top:not(.navbar)").outerHeight() - $("body > .navbar-fixed-bottom:not(.navbar)").outerHeight() - $("body > .navbar + .navbar").outerHeight() - $("body > .navbar + .navbar-collapse").outerHeight();
        $(".page-container").attr("style", "min-height:" + e + "px")
    }
    $(".panel-heading, .page-header-content, .panel-body").has("> .heading-elements").append('<a class="heading-elements-toggle"><i class="icon-menu"></i></a>'), $(".heading-elements-toggle").on("click", function() {
        $(this).parent().children(".heading-elements").toggleClass("visible")
    }), $(".breadcrumb-line").has(".breadcrumb-elements").append('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>'), $(".breadcrumb-elements-toggle").on("click", function() {
        $(this).parent().children(".breadcrumb-elements").toggleClass("visible")
    }), $(document).on("click", ".dropdown-content", function(e) {
        e.stopPropagation()
    }), $(".navbar-nav .disabled a").on("click", function(e) {
        e.preventDefault(), e.stopPropagation()
    }), $('.dropdown-content a[data-toggle="tab"]').on("click", function(e) {
        $(this).tab("show")
    }), $(".panel [data-action=reload]").click(function(e) {
        e.preventDefault();
        var a = $(this).parent().parent().parent().parent().parent();
        $(a).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: "#fff",
                opacity: .8,
                cursor: "wait",
                "box-shadow": "0 0 0 1px #ddd"
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: "none"
            }
        }), window.setTimeout(function() {
            $(a).unblock()
        }, 2e3)
    }), $(".category-title [data-action=reload]").click(function(e) {
        e.preventDefault();
        var a = $(this).parent().parent().parent().parent();
        $(a).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: "#000",
                opacity: .5,
                cursor: "wait",
                "box-shadow": "0 0 0 1px #000"
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: "none",
                color: "#fff"
            }
        }), window.setTimeout(function() {
            $(a).unblock()
        }, 2e3)
    }), $(".sidebar-default .category-title [data-action=reload]").click(function(e) {
        e.preventDefault();
        var a = $(this).parent().parent().parent().parent();
        $(a).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {
                backgroundColor: "#fff",
                opacity: .8,
                cursor: "wait",
                "box-shadow": "0 0 0 1px #ddd"
            },
            css: {
                border: 0,
                padding: 0,
                backgroundColor: "none"
            }
        }), window.setTimeout(function() {
            $(a).unblock()
        }, 2e3)
    }), $(".category-collapsed").children(".category-content").hide(), $(".category-collapsed").find("[data-action=collapse]").addClass("rotate-180"), $(".category-title [data-action=collapse]").click(function(a) {
        a.preventDefault();
        var i = $(this).parent().parent().parent().nextAll();
        $(this).parents(".category-title").toggleClass("category-collapsed"), $(this).toggleClass("rotate-180"), e(), i.slideToggle(150)
    }), $(".panel-collapsed").children(".panel-heading").nextAll().hide(), $(".panel-collapsed").find("[data-action=collapse]").children("i").addClass("rotate-180"), $(".panel [data-action=collapse]").click(function(a) {
        a.preventDefault();
        var i = $(this).parent().parent().parent().parent().nextAll();
        $(this).parents(".panel").toggleClass("panel-collapsed"), $(this).toggleClass("rotate-180"), e(), i.slideToggle(150)
    }), $(".panel [data-action=close]").click(function(a) {
        a.preventDefault();
        var i = $(this).parent().parent().parent().parent().parent();
        e(), i.slideUp(150, function() {
            $(this).remove()
        })
    }), $(".category-title [data-action=close]").click(function(a) {
        a.preventDefault();
        var i = $(this).parent().parent().parent().parent();
        e(), i.slideUp(150, function() {
            $(this).remove();
        });
    });
});
