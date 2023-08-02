var isAppOpen = false;

$(function () {  
    let tl = gsap.timeline({ paused: true });
    tl.fromTo('.fadeText', { clipPath: 'polygon(50% 0%, 50% 100%, 50% 100%, 50% 0%)' }, { clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)', duration: 1.5, ease: 'power4.out' })

    $('.ipad__lockScreen').mouseenter(function() {
        tl.restart();
    }).mouseleave(function() {
        tl.reverse();
    });

    $(".appIcon-wrapper").click(function(e) {
        if(isAppOpen) return;
    
        var $appIconWrapper = $(this);
        var $appIcon = $appIconWrapper.find('.apps__icon'); 
        
        var $appScreen = $("#" + $appIcon.attr('id') + "App");
    
        // Set up the app screen
        $appScreen.css({
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: `50% 50%`,
            transform: "scale(0)",
            width: "100%",
            height: "100%",
            borderRadius: "0" // Initial borderRadius
        });
    
        $appScreen.show();
    
        // Create the timeline animation
        var tl = gsap.timeline({
            onComplete: REP.Tablet.Functions.startLoadingAnimation // Start loading animation when the opening animation is complete
        });
    
        // Animate the app icon enlargement
        tl.to($appIconWrapper, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" });
    
        // And then, expand the app screen
        tl.to($appScreen, {
            scale: 1.1,
            borderRadius: "0", // Animate the borderRadius
            duration: 0.1, // This duration is longer than the icon's duration
            ease: "elastic.inOut(1, 0.5)",
        }, "-=0.3"); // Synchronized with the icon animation
    
        tl.to($appScreen, {
            scale: 1,
            duration: 0,
            delay: 0.5
        });
    
        isAppOpen = true;
    });
    
    $(".ipad__jobCenter--container").dblclick(function(e) {
        if(!isAppOpen) return; 
    
        var $appIconWrapper = $('#jobCenter').parent('.appIcon-wrapper');
        
        var $appScreen = $("#jobCenterApp");
        var $appWrapper = $(".ipad__jobCenter--wrapper");
        var $appIcon = $("#jobCenter-app");
    
        $appWrapper.addClass("animate__zoomOut");
    
        var tl = gsap.timeline();
    
        // Animate the app icon down-scaling
        tl.to($appIconWrapper, { scale: 1.0, duration: 0.9, ease: "back.out(1.7)" });
    
        setTimeout(function(){
            $appScreen.hide();
            $appWrapper.removeClass("animate__zoomOut");
            isAppOpen = false;
        }, 500);
    });

    REP.Tablet.Functions.startLoadingAnimation = () => {
        var timeline = gsap.timeline();
    
        // Display the elements
        gsap.to(["#logoLoading", ".ipad__jobCenter--loadingName"], { opacity: 1, duration: 0 });
    
        timeline.fromTo(
            "#logoLoading",
            { x: 0 },
            { x: -98, duration: 2 },
            "+=2.25"
        )
        .fromTo(
            ".ipad__jobCenter--loadingName",
            { x: 0, opacity: 0 },
            { x: 98, opacity: 1, duration: 2 },
            "<"
        )
        .to(
            ".ipad__jobCenter--loading",
            { scale: 1.5, opacity: 0, filter: "blur(10px)", duration: 1 },
            "+=1"
        )
        .fromTo(
            ['.ipad__jobCenter--getStarted--content', '.ipad__jobCenter--getStarted--button'],
            { x: '-100%', opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.5 },
            "+=0.25"
        ); 
    }; 

});