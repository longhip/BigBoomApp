angular.module('BigBoomApp').directive('sidebar', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'tpl/sidebar.html',
        link: function(scope, element, attrs) {
            element.find(".navigation").find("li.active").parents("li").addClass("active"),
                // element.find(".navigation").find("li.active").has("ul").children("ul").removeClass("hidden-ul"),
                // element.find(".navigation").find("li").not(".active, .category-title").has("ul").children("ul").addClass("hidden-ul"),
                element.find(".navigation").find("li").has("ul").children("a").addClass("has-ul"),
                element.find(".dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu").has("li.active").addClass("active").parents(".navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)").addClass("active"),
                element.find(".navigation-main > .navigation-header > i").tooltip({
                    placement: "right",
                    container: "body"
                }),
                element.find(".navigation-main").find("li").has("ul").children("a").on("click", function(e) {
                    e.preventDefault(), element.find(this).parent("li").not(".disabled").not(element.find(".sidebar-xs").not(".sidebar-xs-indicator").find(".navigation-main").children("li")).toggleClass("active").children("ul").slideToggle(250),
                        element.find(".navigation-main").hasClass("navigation-accordion") && element.find(this).parent("li").not(".disabled").not(element.find(".sidebar-xs").not(".sidebar-xs-indicator").find(".navigation-main").children("li")).siblings(":has(.has-ul)").removeClass("active").children("ul").slideUp(250)
                }),

                element.find(".navigation-alt").find("li").has("ul").children("a").on("click", function(e) {
                    e.preventDefault(), element.find(this).parent("li").not(".disabled").toggleClass("active").children("ul").slideToggle(200), element.find(".navigation-alt").hasClass("navigation-accordion") && element.find(this).parent("li").not(".disabled").siblings(":has(.has-ul)").removeClass("active").children("ul").slideUp(200)
                }),

                element.find(document).on("click", ".navigation .disabled a", function(e) {
                    e.preventDefault()
                }),

                element.find(document).on("click", ".sidebar-control", function(a) {
                    e()
                }),

                element.find(document).on("click", ".sidebar-secondary-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-secondary-hidden")
                }),

                element.find(document).on("click", ".sidebar-detached-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-detached-hidden")
                }),

                element.find(document).on("click", ".sidebar-all-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-all-hidden")
                }),

                element.find(document).on("click", ".sidebar-opposite-toggle", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-opposite-visible"), element.find("body").hasClass("sidebar-opposite-visible") ? (element.find("body").addClass("sidebar-xs"), element.find(".navigation-main").children("li").children("ul").css("display", "")) : element.find("body").removeClass("sidebar-xs")
                }),

                element.find(document).on("click", ".sidebar-opposite-main-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-opposite-visible"), element.find("body").hasClass("sidebar-opposite-visible") ? element.find("body").addClass("sidebar-main-hidden") : element.find("body").removeClass("sidebar-main-hidden")
                }),

                element.find(document).on("click", ".sidebar-opposite-secondary-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-opposite-visible"), element.find("body").hasClass("sidebar-opposite-visible") ? element.find("body").addClass("sidebar-secondary-hidden") : element.find("body").removeClass("sidebar-secondary-hidden")
                }),

                element.find(document).on("click", ".sidebar-opposite-hide", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-all-hidden"), element.find("body").hasClass("sidebar-all-hidden") ? (element.find("body").addClass("sidebar-opposite-visible"), element.find(".navigation-main").children("li").children("ul").css("display", "")) : element.find("body").removeClass("sidebar-opposite-visible")
                }),

                element.find(document).on("click", ".sidebar-opposite-fix", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-opposite-visible")
                }),
                element.find(window).on("resize", function() {
                    setTimeout(function() {
                        e(), element.find(window).width() <= 768 ? (element.find("body").addClass("sidebar-xs-indicator"), element.find(".sidebar-opposite").insertBefore(".content-wrapper"), element.find(".sidebar-detached").insertBefore(".content-wrapper")) : (element.find("body").removeClass("sidebar-xs-indicator"), element.find(".sidebar-opposite").insertAfter(".content-wrapper"), element.find("body").removeClass("sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached sidebar-mobile-opposite"), element.find("body").hasClass("has-detached-left") ? element.find(".sidebar-detached").insertBefore(".container-detached") : element.find("body").hasClass("has-detached-right") && element.find(".sidebar-detached").insertAfter(".container-detached"))
                    }, 100)
                }).resize(), element.find('[data-popup="popover"]').popover(), element.find('[data-popup="tooltip"]').tooltip()
        }
    };
});

angular.module('BigBoomApp').directive('header', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'tpl/header.html',
        link: function(scope, element, attrs) {
            element.find(".sidebar-main-toggle").on("click", function(e) {
                    e.preventDefault(), $("body").toggleClass("sidebar-xs")
                }),
                element.find(".sidebar-mobile-main-toggle").on("click", function(e) {
                    e.preventDefault(), element.find("body").toggleClass("sidebar-mobile-main").removeClass("sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached");
                }),
                element.find(".sidebar-mobile-main-toggle").on("click", function(e) {
                    e.preventDefault(), $("body").toggleClass("sidebar-mobile-main").removeClass("sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached");
                }),
                element.find(".sidebar-mobile-secondary-toggle").on("click", function(e) {
                    e.preventDefault(), $("body").toggleClass("sidebar-mobile-secondary").removeClass("sidebar-mobile-main sidebar-mobile-opposite sidebar-mobile-detached");
                }),
                element.find(".sidebar-mobile-opposite-toggle").on("click", function(e) {
                    e.preventDefault(), $("body").toggleClass("sidebar-mobile-opposite").removeClass("sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached");
                }),
                element.find(".sidebar-mobile-detached-toggle").on("click", function(e) {
                    e.preventDefault(), $("body").toggleClass("sidebar-mobile-detached").removeClass("sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-opposite");
                })
        }
    };
});
angular.module('BigBoomApp').directive('app', function($window, $rootScope) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            var page = angular.element($window);
            var e = page.height() - element.find("body > .navbar").outerHeight() - element.find("body > .navbar-fixed-top:not(.navbar)").outerHeight() - element.find("body > .navbar-fixed-bottom:not(.navbar)").outerHeight() - element.find("body > .navbar + .navbar").outerHeight() - element.find("body > .navbar + .navbar-collapse").outerHeight();
            element.find(".page-container").css("min-height", e + "px");
            $rootScope.$on('$stateChangeSuccess', function(event, toState) {

            });
        }
    };
});

angular.module('BigBoomApp').directive('disableButton', function($timeout) {
    return {
        restrict: 'A',
        replace: true,
        link: function(scope, element, attrs) {
            element.click(function() {
                element.attr('disabled', '');
                $timeout(function() {
                    element.removeAttr('disabled', '');
                }, 2000);
            });
        }
    };
});
angular.module('BigBoomApp').directive('backImg', function($rootScope, $timeout) {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            url: '='
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                var url = scope.url;
                element.css({
                    'background-image': 'url(' + $rootScope.serverUrl + url + ')',
                    'background-size': 'cover'
                });
            }, 500);
        }
    };
});
