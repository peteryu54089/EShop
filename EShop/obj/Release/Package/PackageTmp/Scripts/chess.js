
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

$("#chess_board div").hover(
    function (e) {
        var div = $(e.currentTarget);
        kendo.fx(div.find(".description").css("display", "block")).tile("left", div.find(".icon")).play();
    },

    function (e) {
        var div = $(e.currentTarget);
        kendo.fx(div.find(".description")).tile("left", div.find(".icon")).reverse();
    }
);

// Open read window when clicked button
$(".king").on("click", function (e) {
    e.preventDefault();
    $("#read_window").data("kendoWindow").open();
    $("#read_window").data("kendoWindow").center();
    
});

// Open update window when clicked button
$(".queen").on("click", function (e) {
    e.preventDefault();
    $("#create_window").data("kendoWindow").open();
    $("#create_window").data("kendoWindow").center();
});