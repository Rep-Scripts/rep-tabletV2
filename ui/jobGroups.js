$(function() {
    $('.create__btn').on('click', function() {
        REP.Tablet.Functions.managePreloadScreen(true, "Creating Your Group", "Create Successfully!", () => {
            $(".ipad__yourGroup--wrapper").fadeIn("100");
        });
    });
    
});