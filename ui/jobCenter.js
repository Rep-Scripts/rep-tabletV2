let jobCenterList = [
    {
        icon: "towing",
        label: "Towing",
        subtitle: "Towing",
        salary: "High",
        mem: 1,
        count: 0,
        event: "jobEvent1"
    },
    {
        icon: "taxi",
        label: "Taxi",
        subtitle: "Taxi",
        salary: "Medium",
        mem: 1,
        count: 0,
        event: "jobEvent2"
    },
    {
        icon: "thefthouse",
        label: "House Robbery",
        subtitle: "Theft",
        salary: "Medium",
        mem: 6,
        count: 0,
        event: "jobEvent3"
    },
    {   
        icon: "oxyrun",
        label: "Oxy Run",
        subtitle: "Oxy Run",
        salary: "Medium",
        mem: 1,
        count: 0,
        event: "jobEvent4"
    },
    {   
        icon: "theftcar",
        label: "Chop Shop",
        subtitle: "Theft",
        salary: "Medium",
        mem: 1,
        count: 0,
        event: "jobEvent5"
    },
    {   
        icon: "postop",
        label: "PostOp Worker",
        subtitle: "PostOp",
        salary: "Medium",
        mem: 2,
        count: 0,
        event: "jobEvent6"
    },
    {   
        icon: "sani",
        label: "Sani. Worker",
        subtitle: "Sanitaion",
        salary: "Low",
        mem: 4,
        count: 0,
        event: "jobEvent7"
    },
    {   
        icon: "taco",
        label: "Taco Shop",
        subtitle: "Taco",
        salary: "Medium",
        mem: 1,
        count: 0,
        event: "jobEvent8"
    },
];

$(function() {
    var items = $('.ipad__jobCenter--mainItem').get();

    REP.Tablet.Functions.createMessageElements = () => {
        $(".ipad__jobCenter--mainList").append('<p id="noJobMessage" style="display: none;">No job exists...</p>');
        $(".ipad__jobCenter--mainList").append('<p id="noFavJobMessage" style="display: none;">No job is favorited...</p>');
    };    

    REP.Tablet.Functions.shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
    
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
    
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
    
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
    
        return array;
    };
    
    REP.Tablet.Functions.attachEventHandlers = () => {
        $("#searchJobs").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            var jobFound = false;
        
            $(".ipad__jobCenter--mainItem").each(function() {
                var title = $(this).find(".jobCenter__mainHeader--title").text().toLowerCase();
                
                if (title.indexOf(value) > -1) {
                    $(this).show();
                    $(this).removeClass('animate__fadeInUp');
                    void this.offsetWidth;
                    $(this).addClass('animate__fadeInUp');
                    jobFound = true;
                } else {
                    $(this).hide();
                }
            });
        
            if (!jobFound) {
                $(".fadeBottom").hide();
                $("#noJobMessage").fadeIn("100");
            } else {
                $(".fadeBottom").show();
                $("#noJobMessage").fadeOut("100");
            }
        });
    
        $(document).on('click', '#favoriteBtn', function (e) {
            e.preventDefault();
            $(this).toggleClass('favorite');
        });   
    
        $(document).on('click', '.favorite__btn', function (e) {
            e.preventDefault();
            // Toggle view mode
            if ($(this).hasClass('show-favorites')) {
                $(this).removeClass('show-favorites');
                $('.ipad__jobCenter--mainItem').each(function() {
                    $(this).show();
                    $(this).removeClass('animate__fadeInUp');
                    void this.offsetWidth;
                    $(this).addClass('animate__fadeInUp');
                });
                $("#noFavJobMessage").fadeOut("100");
            } else {
                $(this).addClass('show-favorites');
                // Hide all jobs
                $('.ipad__jobCenter--mainItem').hide();
                // Show favorited jobs
                var favoriteJobFound = false;
                $('.ipad__jobCenter--mainItem').filter(function() {
                    if ($(this).find('#favoriteBtn').hasClass('favorite')) {
                        favoriteJobFound = true;
                        return true;
                    }
                    return false;
                }).each(function() {
                    $(this).show();
                    $(this).removeClass('animate__fadeInUp');
                    void this.offsetWidth;
                    $(this).addClass('animate__fadeInUp');
                });
        
                if (!favoriteJobFound) {
                    $(".fadeBottom").hide();
                    $("#noFavJobMessage").fadeIn("100");
                } else {
                    $(".fadeBottom").show();
                    $("#noFavJobMessage").fadeOut("100");
                }
            }
        });

        $(document).on('click', '.refresh__btn', function () {
            // Get the current data (assuming it's stored in a variable called 'items')
            items = $(".ipad__jobCenter--mainItem").toArray();
            items = REP.Tablet.Functions.shuffle(items);
            
            // Clean the list
            $(".ipad__jobCenter--mainList").empty();
            
            // Append items back to the list in new order
            for (var i = 0; i < items.length; i++) {
                // Use jQuery's .clone() method to make a copy of the item
                var itemClone = $(items[i]).clone();
        
                // Append the clone to the list
                $(".ipad__jobCenter--mainList").append(itemClone);
                
                // Reset and reapply the fade in animation
                itemClone.removeClass('animate__fadeInUp');
                void itemClone[0].offsetWidth;
                itemClone.addClass('animate__fadeInUp');
                
                // Reset and apply a delay
                var delay = i;  // Adjust this as needed
                itemClone.css('animation-delay', delay + 's');
            }
        
            // Reinitialize Scrollbar
            scrollbar1.destroyAll();
            scrollbar1 = Scrollbar.init(document.querySelector('#myScroolbar'), options);
        });
                
    };

    REP.Tablet.Functions.updateJobCenter = (data) => {
        scrollbar1.destroy();
        $(".ipad__jobCenter--mainList").empty();
        REP.Tablet.Functions.createMessageElements();
        for (let i = 0; i < data.length; i++) {
            const v = data[i];
            let newJobItem = 
            `<div class="ipad__jobCenter--mainItem mainItem-${i+1} animate__animated animate__fadeInUp animate__delay-${i}s">
                <div class="jobCenter__getLocation--btn" id="get-location" data-event="${v.event}">
                    <p>get</p>
                    <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="jobCenter__mainHeader">
                    <div class="jobCenter__mainIcon">
                        <img src="./imgs/jobIcons/${v.icon}.png" alt="">
                    </div>
                    <div class="jobCenter__mainHeader--content">
                        <div class="jobCenter__mainHeader--title">${v.label}</div>
                        <div class="jobCenter__mainHeader--subTitle">Rep ${v.subtitle}</div>
                    </div>
                </div>
                <div class="jobCenter__mainBadge--list">
                    <div class="jobCenter__mainBadge">
                        <i class="fa-solid fa-coins"></i>
                        <p class="salary__content">${v.salary}</p>
                    </div>
                    <div class="jobCenter__mainBadge">
                        <i class="fa-regular fa-clock"></i>
                        <p class="salary__content">Fulltime</p>
                    </div>
                </div>
                <div class="jobCenter__mainFooter--wrapper">
                    <div class="jobCenter__mainFooter--left">
                        <div class="jobCenter__mainFooter--maxPlayer">
                            <i class="fa-solid fa-user"></i>
                            <p class="mainCount__content">${v.mem}</p>
                        </div>
                        <div class="jobCenter__mainFooter--countPlayer">
                            <i class="fa-solid fa-users"></i>
                            <p class="mainCount__content">${v.count}</p>
                        </div>
                    </div>
                    <div class="jobCenter__mainFooter--favorite">
                        <p>Favorite?</p>
                        <i class="fa-solid fa-heart" id="favoriteBtn"></i>
                    </div>
                </div>
            </div>`;
            $(".ipad__jobCenter--mainList").append(newJobItem);
        };

        scrollbar1 = Scrollbar.init(document.querySelector('#myScroolbar'), options);
    
        scrollbar1.addListener(function (status) {
            var scrollTop = status.offset.y;
            var scrollHeight = status.limit.y;
            var opacityTop = scrollTop / scrollHeight;
            var opacityBottom = 1 - opacityTop;
    
            $('.fadeBottom').css({
                'opacity': opacityBottom,
                'pointer-events': "none"
            });
        });

        REP.Tablet.Functions.attachEventHandlers();
    };

    REP.Tablet.Functions.updateJobCenter(jobCenterList); 

    $(document).on("click", "#get-location", function (e) {  
        e.preventDefault();
        var event = $(this).attr("data-event");
        $.post("https://rep-tabletV2/CreateBlip", JSON.stringify({ event: event }));

        REP.Tablet.Functions.managePreloadScreen(true, "Fetching Groups Data", "Fetching Groups Successfully!!!", () => {
            $(".ipad__jobCenter--groupWrapper").fadeIn("100");
        });
        
    });

    window.addEventListener('message', function(e) {
        
    });
})