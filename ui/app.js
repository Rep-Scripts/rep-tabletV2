let clickCount = 0;

$(function() {
    $.getJSON('http://ip-api.com/json', function(data) {
        var timezone = data.timezone;
        var city = data.city;
        $.getJSON('http://worldtimeapi.org/api/timezone/' + timezone, function(timeData) {
            var datetime = new Date(timeData.datetime);
            
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
        
            $('.ipad__timer').text(timeString24);
            $('.ipad__lockScreen--timeContent').text(timeString24);
            $('.ipad__lockScreen--leftTimer').text(timeString24WithAmPm);
            $('.ipad__date').text(dateShort);
            $('.ipad__lockScreen--dateContent').text(dateFull);
            $('.ipad__lockScreen--weekMonthLeft').text(weekMonthLeft);
            $('.ipad__lockScreen--dateLeft').text(dateLeft);
            $('.ipad__lockScreen--leftYourLocation').text(city);
        });
    });

    $(".ipad__lockScreen").on("click", function(e) {
        if (!$(e.target).is('.ipad__homeIndicator')) { 
            clickCount++;
            if (clickCount == 2) {
                $(this).addClass("custom-zoomOut");
        
                $(this).one('animationend', function(){
                    $(".ipad__lockScreen").removeClass("custom-zoomOut").hide();
                    $(".ipad__mainScreen").addClass("custom-fadeIn").show();
                });
        
                clickCount = 0;
            }
        }
    });
    
    $(".ipad__homeIndicator").on("click", function() {
        $(".ipad__lockScreen").addClass("custom-fadeOutUp");
        
        $(".ipad__lockScreen").one('animationend', function(){
            $(".ipad__lockScreen").removeClass("custom-fadeOutUp").hide();
            $(".ipad__mainScreen").addClass("custom-fadeIn").show();
        });
    });

});
