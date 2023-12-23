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
});