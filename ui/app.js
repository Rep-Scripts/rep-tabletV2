REP = {};
REP.Tablet = {};
REP.Tablet.Functions = {};
REP.Tablet.Animations = {};
REP.Tablet.Notifications = {};
REP.Tablet.Notifications.Custom = {};

let clickCount = 0;
let isAppOpen = false;
let notReadyButtonAdded = false;
let transitionTimeout;

$(function() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    $(".ipad__jobCenter--mainBody").hide();
    $("#email, #password").prop('readonly', true);
    $.getJSON('http://ip-api.com/json', function(data) {
        $.getJSON('http://worldtimeapi.org/api/timezone/' + data.timezone, function(timeData) {
            var datetime = new Date(timeData.datetime);
            
            // Time processing
            var ampm = datetime.getHours() >= 12 ? 'PM' : 'AM';
            var hours24 = datetime.getHours();
            var timeString24 = hours24 + ":" + ("0" + datetime.getMinutes()).slice(-2);
            var timeString24WithAmPm = timeString24 + ' ' + ampm;
            
            var daysOfWeekShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            var daysOfWeekFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var monthsFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            var dateShort = daysOfWeekShort[datetime.getDay()] + ' ' + monthsShort[datetime.getMonth()] + ' ' + datetime.getDate();
            var dateFull = daysOfWeekFull[datetime.getDay()] + ', ' + monthsFull[datetime.getMonth()] + ' ' + datetime.getDate();
            var weekMonthLeft = daysOfWeekShort[datetime.getDay()] + ' ' + monthsShort[datetime.getMonth()];
            var dateLeft = datetime.getDate();
            
            // DOM updates
            $('.ipad__timer').text(timeString24);
            $('.ipad__lockScreen--timeContent').text(timeString24);
            $('.ipad__lockScreen--leftTimer').text(timeString24WithAmPm);
            $('.ipad__date').text(dateShort);
            $('.ipad__lockScreen--dateContent').text(dateFull);
            $('.ipad__lockScreen--weekMonthLeft').text(weekMonthLeft);
            $('.ipad__lockScreen--dateLeft').text(dateLeft);
            $('.ipad__lockScreen--leftYourLocation').text(data.city);
        });
    });


    $(".ipad__jobCenter--getStarted--button").click(function(e) {
        e.preventDefault();
        var $button = $(this);
        var $content = $button.find(".ipad__jobCenter--getStarted--btn-content, img");
        var $loader = $button.find(".loader");
        var $getStartedScreen = $(".ipad__jobCenter--getStarted");
        var $loginScreen = $(".ipad__jobCenter--loginScreen");
    
        // Disable the button
        $button.css({cursor: "default"});
        $button.off("click");
    
        // Create the animation
        var tl = gsap.timeline();
        tl.to($button, {
            width: "12.5vh",
            duration: 0.6,
            ease: "power2.inOut",
        })
        .to($content, {
            opacity: 0,
            duration: 0.1,
            onComplete: function() {
                $content.hide();
                $loader.show();
            }
        }, 0);
    
        // Determine which button was clicked
        if ($button.attr('id') == 'getStarted-btn') {
            // Do something for login-btn
            tl.add(function() {
                $loader.hide();
                $loginScreen.show();
            
                gsap.to($getStartedScreen, {
                    x: "-100%",
                    duration: 0.75,
                    ease: "power4.inOut",
                });
            
                gsap.fromTo($loginScreen, {
                    x: "100%",
                }, {
                    x: "0",
                    duration: 0.75,
                    ease: "power4.inOut",
                });
    
                // animate the login content after 1 second delay
                setTimeout(function() {
                    gsap.to([".ipad__jobCenter--loginHeader", ".ipad__jobCenter--loginContent--item"], { opacity: 1, duration: 0 });

                    gsap.from(".ipad__jobCenter--loginHeader", {
                        y: 100, 
                        opacity: 0, 
                        ease: "power2.out", 
                        duration: 1,
                    });
        
                    gsap.from(".ipad__jobCenter--loginContent--item", {
                        y: 100, 
                        opacity: 0,
                        stagger: 0.2, 
                        ease: "power2.out", 
                        duration: 1,
                    });
                }, 500); // 1 second delay before animating the login content
            }, "+=4");
        } else if ($button.attr('id') == 'login-btn') {

        }
    });

    $("#login-btn").click(function(e) {
        e.preventDefault();
        let email = 'repscripts2023@gmail.com';
        let password = 'rpsc2023123456780';
        REP.Tablet.Functions.typeWriter(email, '#email', function() {
            REP.Tablet.Functions.typeWriter(password, '#password', function() {
                // Wait for 1 second after typing is done
                setTimeout(function() {
                    // animate the login header moving up and out of sight
                    gsap.to(".ipad__jobCenter--loginHeader", {
                        y: -100, 
                        autoAlpha: 0,
                        ease: "power2.out", 
                        duration: 1,
                    });
    
                    // animate the login content moving up and out of sight
                    gsap.to(".ipad__jobCenter--loginContent--item", {
                        y: -100, 
                        autoAlpha: 0,
                        stagger: 0.2, 
                        ease: "power2.out", 
                        duration: 1,
                        onComplete: function() {
                            gsap.to(".ipad__jobCenter--loginScreen", {
                                autoAlpha: 0, // fade out effect
                                ease: "power2.out", 
                                duration: .8,
                                onComplete: function() {
                                    const welcome = $(".ipad__jobCenter--mainWelcome");
                                    let textContent = "Welcome Back!";
                                    welcome.text(textContent);
                                    let splitText = textContent.split("").map(letter => `<span>${letter}</span>`).join("");
                                    welcome.html(splitText);                               
                                    $(".ipad__jobCenter--loginScreen").hide();
                                    gsap.to([".ipad__jobCenter--mainWelcome span"], { opacity: 1, duration: 0, textTransform: "capitalize" });
                                    gsap.from(".ipad__jobCenter--mainWelcome span", {
                                        y: -20,
                                        scale: 2,
                                        autoAlpha: 0,
                                        opacity: 1,
                                        stagger: 0.1,
                                        ease: "back.out(1.4)",
                                        onComplete: function() {
                                            gsap.to(".ipad__jobCenter--mainWelcome", { autoAlpha: 0, duration: 0.5, delay: 1.5,
                                                onComplete: function() {
                                                    $(".ipad__jobCenter--mainBody").show();
                                                }
                                            });
                                        }
                                    });
                                }                                
                            });
                        }
                    });
                }, 1000); // Delay for 1 second
            });
        });
    });

    // $(".ipad__jobCenter--mainBody").show();

    $(".ipad__lockScreen").on("click", function(e) {
        if (!$(e.target).is('#lockScreen__homeIndicator')) { 
            clickCount++;
            if (clickCount == 2) {
                $(this).addClass("custom-zoomOut");
        
                $(this).one('animationend', function(){
                    $(".ipad__lockScreen").removeClass("custom-zoomOut").hide();
                    $(".ipad__mainScreen").addClass("custom-fadeIn").show();
                     REP.Tablet.Functions.animateMainScreen();
                });
        
                clickCount = 0;
            }
        }
    });
    
    $("#lockScreen__homeIndicator").on("click", function() {
        $(".ipad__lockScreen").addClass("custom-fadeOutUp");
        
        $(".ipad__lockScreen").one('animationend', function(){
            $(".ipad__lockScreen").removeClass("custom-fadeOutUp").hide();
            $(".ipad__mainScreen").addClass("custom-fadeIn").show();
            REP.Tablet.Functions.animateMainScreen();
        });
    });

    $("#main__homeIndicator").on("click", function() {
        if(!isAppOpen) return; 
    
        var $appIconWrapper = $('#jobCenter').parent('.appIcon-wrapper');
        
        var $appScreen = $("#jobCenterApp");
        var $appWrapper = $(".ipad__jobCenter--wrapper");
        var $appIcon = $("#jobCenter-app");
    
        $appWrapper.addClass("animate__zoomOut");
        $("#main__homeIndicator").hide();
    
        var tl = gsap.timeline();
    
        // Animate the app icon down-scaling
        tl.to($appIconWrapper, { scale: 1.0, duration: 0.9, ease: "back.out(1.7)" });
    
        setTimeout(function(){
            $appScreen.hide();
            $appWrapper.removeClass("animate__zoomOut");
            isAppOpen = false;
        }, 500);
    });

    $(".ipad__header").on("click", function() {
        if (!$(".ipad__lockScreen").is(":visible")) {
            clickCount++;
            if (clickCount == 2) {
                $(".ipad__notifyScreen--wrapper").show().animate({top: '50%'}, 800);
                clickCount = 0;
            }
        }
    });

    $(".ipad__notifyScreen").on("dblclick", function() {
        $(".ipad__notifyScreen--wrapper").animate({top: '-100%'}, 800);
        setTimeout(() => {
            $(".ipad__notifyScreen--wrapper").hide();
        }, 800)
         REP.Tablet.Functions.animateMainScreen();
    });

    $('.appIcon-wrapper').on('mousedown', function() {
        $(this).children('.appIcon-overlay').css('opacity', '1');
    });
    
    $('.appIcon-wrapper').on('mouseup', function() {
        $(this).children('.appIcon-overlay').css('opacity', '0');
    });

    $('.appIcon-wrapper').on('mouseleave', function() {
        $(this).children('.appIcon-overlay').css('opacity', '0');
    });
    
    REP.Tablet.Functions.animateMainScreen = () => {
        var mainScreenElements = document.querySelector('.ipad__mainScreen--appsList');
        var dockWrapper = document.querySelector('.ipad__dockWrapper');
        gsap.set(mainScreenElements, { scale: 1.2 });
        gsap.to(mainScreenElements, { scale: 1, duration: 1, ease: "power2.out", stagger: 0.05 });
        gsap.from(dockWrapper, { y: '100%', duration: 1, ease: "power2.out" });
    };
    
    $(".btn-ripple").click(function(e) {
        let x_coord = e.clientX;
        let y_coord = e.clientY;
    
        let btn_top_pos = $(this).offset().top;
        let btn_left_pos = $(this).offset().left;
    
        let x = x_coord - btn_left_pos;
        let y = y_coord - btn_top_pos;
    
        let span = $("<span></span>").addClass("ripple").css({
          top: y + "px",
          left: x + "px",
        });
    
        $(this).append(span);
    
        setTimeout(() => {
          span.remove();
        }, 500);
    });
                          
    REP.Tablet.Functions.typeWriter = (text, elemId, callback) => {
        let i = 0;
        let $elem = $(elemId);
    
        $elem.css("border-bottom", ".1vh solid #1BB3F9");
    
        let interval = setInterval(function() {
            if (i < text.length) {
                $elem.val($elem.val() + text.charAt(i));
                i++;
            } else {
                clearInterval(interval);
    
                $elem.css("border-bottom", ".1vh solid var(--main-white-color)");
    
                if (callback) callback();
            }
        }, 60);
    };

    REP.Tablet.Functions.random = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    
    REP.Tablet.Functions.managePreloadScreen = (show, message, successMessage, afterSuccessAction) => {
        if (show) {
            $("#preload-screen").fadeIn("fast");
            $(".loading__content").text(message);
            $(".ipad__jobCenter--groupWrapper, .ipad__yourGroup--wrapper, .ipad__jobCenter--mainBody").fadeOut("fast");
            $(".loader, .ellipsis-loader").fadeIn("fast");
            $(".svg-container").hide();
    
            setTimeout(() => {
                $(".svg-container").fadeIn("fast");
                $(".loading__content").text(successMessage);
                $(".ellipsis-loader, .loader").hide();
    
                setTimeout(() => {
                    $("#preload-screen").fadeOut("fast");
                    if (afterSuccessAction) {
                        afterSuccessAction();
                    }
                }, REP.Tablet.Functions.random(2000, 3000));
            }, REP.Tablet.Functions.random(3500, 5000));
        } else {
            $("#preload-screen").fadeOut("fast");
        };
    };

    REP.Tablet.Functions.togglePopup = (popupSelector, button) => {
        if (button.hasClass("active")) {
            button.removeClass("active");
            $(popupSelector).fadeOut("100");
        } else {
            button.addClass("active");
            $(popupSelector).fadeIn("100");
        }
    };

    REP.Tablet.Functions.openModal = (text, type) => {
        $(".request__modal--header h2").html(text);
    
        const $overlay = $(".request__modal--overlay");
        const currentType = $overlay.data("type");

        if (currentType) {
            $overlay.removeClass(currentType);
        }

        $overlay.addClass(type).data("type", type);

        if (type) {
            $(".request__emoji").attr("src", `./imgs/icons/${type}.gif`).show();
            $(".request__modal--actionBtn.request__confirm").show();
            $(".request__modal--actionBtn.request__cancel").text('Cancel');
        } else {
            $(".request__emoji").hide();
            $(".request__modal--actionBtn.request__confirm").hide();
            $(".request__modal--actionBtn.request__cancel").text('Close');
        }
    
        $overlay.fadeIn("100")
            .find(".request__modal--wrapper")
            .removeClass("animate__zoomOut")
            .addClass("animate__zoomIn");
    };        

    REP.Tablet.Functions.closeModal = () => {
        $(".request__modal--wrapper").addClass("animate__zoomOut").removeClass("animate__zoomIn");
        setTimeout(() => {
            $(".request__modal--overlay").fadeOut("100");
        }, 250);
    };

    $("[id^='taskBarProgress']").each(function(index, element) {
        var progressBar = new ProgressBar.Circle(element, {
            strokeWidth: 7,
            duration: 2400,
            easing: 'bounce',
            color: "#F8CA48",
            trailColor: "#383838",
            trailWidth: 10,
            text: {
                value: "0 / 1",
                className: "",
                style: {
                    color: "#fff",
                    position: "absolute",
                    fontSize: "1.4vh",
                    left: "50%",
                    top: "50%",
                    padding: 0,
                    margin: 0,
                    // Note: transform cannot be nested in style, the correct format is below
                    transform: "translate(-50%, -50%)"
                },
            },
        });
    
        // Animate the progress bar to 50%
        progressBar.animate(0.5); // Number from 0.0 to 1.0
    });    
});

