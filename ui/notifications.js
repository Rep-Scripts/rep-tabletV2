$(function() {
    REP.Tablet.Notifications.Custom.Add = function(icon, title, text, color, timeout, accept, deny) {
        $.post('https://rep-tabletV2/HasTablet', JSON.stringify({}), function(HasTablet) {
            if (HasTablet) {
                if (REP.Tablet.Notifications.Timeout !== undefined && REP.Tablet.Notifications.Timeout !== null) {
                    clearTimeout(REP.Tablet.Notifications.Timeout);
                }
                REP.Tablet.Notifications.Timeout = null;
                  
                if (timeout == null || timeout == undefined) {
                    timeout = 1500;
                }
                if (color != null && color != undefined) {
                    $(".notification-icon-new").css({"color": color});
                    $(".notification-title-new").css({"color":"#FFFFFF"});    
    
                } else if (color == "default" || color == null || color == undefined) {
                    $(".notification-icon-new").css({"color":"#FFFFFF"});
                    $(".notification-title-new").css({"color":"#FFFFFF"});
                }
                playSound("notify.ogg", "./sounds/", 0.6);
                REP.Tablet.Animations.TopSlideDown(".__tablet--notification-container-new", 600, 1);
                $(".notification-icon-new").html('<i class="'+icon+'"></i>');
                $(".notification-title-new").html(title);
                $(".notification-text-new").html(text);
                $(".notification-time-new").html("just now");
                if (accept != "NONE"){
                    $(".notification-accept").html('<i class="'+accept+'"></i>');
                }
                if (deny != "NONE"){ 
                    $(".notification-deny").html('<i class="'+deny+'"></i>');
                }
    
                if (timeout != "NONE"){
                    if (REP.Tablet.Notifications.Timeout !== undefined && REP.Tablet.Notifications.Timeout !== null) {
                        clearTimeout(REP.Tablet.Notifications.Timeout);
                    }
                    REP.Tablet.Notifications.Timeout = setTimeout(function(){
                        REP.Tablet.Animations.TopSlideUp(".__tablet--notification-container-new", 600, -10);
                        REP.Tablet.Notifications.Timeout = setTimeout(function(){
                        }, 500)
                        REP.Tablet.Notifications.Timeout = null;
                    }, timeout);
                };
            };
        });
    };

    REP.Tablet.Notifications.Add = function(icon, title, text, color, timeout) {
        $.post('https://rep-tabletV2/HasTablet', JSON.stringify({}), function(HasTablet) {
            if(HasTablet) {
                if (timeout == null && timeout == undefined) {
                    timeout = 1500;
                }
        
                if (REP.Tablet.Notifications.Timeout == undefined || REP.Tablet.Notifications.Timeout == null) {
                    if (color != null || color != undefined) {
                        $(".notification-icon").css({"color":color});
                        $(".notification-title").css({"color":color});
                    } else if (color == "default" || color == null || color == undefined) {
                        $(".notification-icon").css({"color":"#e74c3c"});
                        $(".notification-title").css({"color":"#e74c3c"});
                    }

                    REP.Tablet.Animations.TopSlideDown(".__tablet--notification-container", 600, 1);
                    $(".notification-icon").html('<i class="'+icon+'"></i>');
                    $(".notification-title").html(title);
                    $(".notification-text").html(text);
                    $(".notification-time").html("just now");
                    if (timeout != "NONE"){
                        if (REP.Tablet.Notifications.Timeout !== undefined || REP.Tablet.Notifications.Timeout !== null) {
                            clearTimeout(REP.Tablet.Notifications.Timeout);
                        }
                        REP.Tablet.Notifications.Timeout = setTimeout(function(){
                            REP.Tablet.Animations.TopSlideUp(".__tablet--notification-container", 600, -10);
    
                            REP.Tablet.Notifications.Timeout = setTimeout(function(){

                        }, 500)
                            REP.Tablet.Notifications.Timeout = null;
                        }, timeout);
                    }
                } else {
                    if (color != null || color != undefined) {
                        $(".notification-icon").css({"color":color});
                        $(".notification-title").css({"color":color});
                    } else {
                        $(".notification-icon").css({"color":"#e74c3c"});
                        $(".notification-title").css({"color":"#e74c3c"});
                    }

                    $(".notification-icon").html('<i class="'+icon+'"></i>');
                    $(".notification-title").html(title);
                    $(".notification-text").html(text);
                    $(".notification-time").html("just now");
                    if (timeout != "NONE"){
                        if (REP.Tablet.Notifications.Timeout !== undefined || REP.Tablet.Notifications.Timeout !== null) {
                            clearTimeout(REP.Tablet.Notifications.Timeout);
                        }
                        REP.Tablet.Notifications.Timeout = setTimeout(function(){
                            REP.Tablet.Animations.TopSlideUp(".__tablet--notification-container", 600, -10);
                            REP.Tablet.Notifications.Timeout = setTimeout(function(){

                            }, 500)
                            REP.Tablet.Notifications.Timeout = null;
                        }, timeout);
                    }
                }
            }
        });
    }

    $(document).on('click', ".__tablet--notification-container", function() {
        REP.Tablet.Animations.TopSlideUp(".__tablet--notification-container", 600, -10);
        REP.Tablet.Notifications.Timeout = null;
    })
    
    $(document).on('click', ".notification-accept", function() {
        $.post('https://rep-tabletV2/AcceptNotification', JSON.stringify({}));
        REP.Tablet.Animations.TopSlideUp(".__tablet--notification-container-new", 600, -10);
        REP.Tablet.Notifications.Timeout = null;
    });
});