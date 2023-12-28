$(function() {
    $('.create__btn').on('click', function() {
        REP.Tablet.Functions.managePreloadScreen(true, "Creating Your Group", "Create Successfully!", () => {
            $(".ipad__yourGroup--wrapper").fadeIn("100");
        });
    });
    
    $(".filter__idle--btn").on("click", function(e) {
        e.preventDefault();
        REP.Tablet.Functions.togglePopup("#filterPopupIdle", $(this));
    });
    
    $(".filter__busy--btn").on("click", function(e) {
        e.preventDefault();
        REP.Tablet.Functions.togglePopup("#filterPopupBusy", $(this));
    });    

    $(".filter__reset").on("click", function(e) {
        e.preventDefault();
        $(this).closest(".filter__popup--overlay").find("input[type='checkbox']").prop('checked', false);
    });

    $(".disband__btn").on("click", function(e) {
        e.preventDefault();
        REP.Tablet.Functions.openModal("You want to <span class='disband__text'>disband</span> the group?", "sad2");
    })

    $(".invite__leader").on("click", function(e) {
        e.preventDefault();
        let test = "Hwan Handsome";
        REP.Tablet.Functions.openModal(`Invite <span class="request__name">${test}</span> to be the leader?`, "love");
    });
    
    $(".remove__group").on("click", function(e) {  
        e.preventDefault();
        let test = "Hwan Handsome";
        REP.Tablet.Functions.openModal(`Want to remove <span class="request__name">${test}</span> from the group?`, "sad");
    });
    
    $(".request__cancel").on("click", function(e) {
        e.preventDefault();
        REP.Tablet.Functions.closeModal();
    });

    $(document).on("click", ".ready__btn", function(e) {
        e.preventDefault();
        $(".ready__btn").addClass("active");
        $(".ready__btn span").text("waiting for job");
        $(".spinner").removeClass("bxs-briefcase").addClass("bx-loader-alt spin");
    
        if (!$(".notReady__btn").length) {
            $(".ipad__yourGroup--actionWrapper .hihi").append(`
                <div class="ipad__groups--actionBtn notReady__btn animate__animated animate__fadeInUp">
                    <span>not ready</span>
                    <i class='bx bx-stop-circle'></i>
                </div>
                `
            );
        };
    
        transitionTimeout = setTimeout(() => {
            $(".ipad__yourGroup--wrapper").fadeOut("100");
            setTimeout(() => {
                $(".ipad__yourGroupTasks--wrapper").fadeIn("100");
            }, 500);
        }, 4000);
    });
    

    $(document).on("click", ".notReady__btn", function(e) {
        e.preventDefault();
        var $notReadyBtn = $(this);
    
        $(".ready__btn").removeClass("active");
        $(".ready__btn span").text("ready for work");
        $(".spinner").removeClass("bx-loader-alt spin").addClass("bxs-briefcase");
    
        clearTimeout(transitionTimeout);
    
        $notReadyBtn.addClass("animate__fadeOutDown animate__faster");
    
        $notReadyBtn.on('animationend', function() {
            $notReadyBtn.remove();
            notReadyButtonAdded = false;
        });
    });      

    $(document).on("click", ".text__extend", function() {
        const taskDescription = $(this).closest('.ipad__yourGroupTasks--left').find('.ipad__yourGroupTasks--content').text();
        REP.Tablet.Functions.openModal(taskDescription);
    });
    
});