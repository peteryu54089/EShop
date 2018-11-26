
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

var panelbarClick = "";
var isPanelbarHide = true;

var bookList;
var bookCategoryList;
var barList = ["book_class", "book_keeper", "book_status"];
var chartText;

var viewModel = kendo.observable({
    selectedDate: new Date(),
    isVisible: true
});

kendo.bind($("#read_calendar"), viewModel);

$(".k-pager-nav").attr("title", "");
$(".k-i-arrow-w, .k-i-arrow-e").text("");
$(".k-i-seek-w").text("最前頁");
$(".k-i-seek-e").text("最後頁");

$("#panelbar").kendoPanelBar({
    select: selectPanelbar
});

$(".nav-toggle").on("click", controlPanelbar);

function controlPanelbar() {
    $(".sg-ap-nav-new").toggleClass("sg-state--open");
    if (isPanelbarHide) {
        $("#panelbar").css("display", "block");
        isPanelbarHide = false;
    } else {
        $("#panelbar").css("display", "none");
        isPanelbarHide = true;
    }
}

function selectPanelbar(e) {
    for (let i = 0, max = barList.length; i < max; i++) {
        if ($(e.item).find("> .k-link").text() === barList[i]) {
            createChart();
            controlPanelbar();
            $(".sg-paragraphs").css("display", "none");
            $("#book_grid").css("display", "none");
            $("#chart_block").css("display", "block");
            $("#second_layout").css("display", "none");
            $("#calendar").css("display", "none");
            break;
        }
    }
    if ($(e.item).find("> .k-link").text() === "行事曆") {
        controlPanelbar();
        $(".sg-paragraphs").css("display", "none");
        $("#book_grid").css("display", "none");
        $("#chart_block").css("display", "none");
        $("#second_layout").css("display", "none");
        $("#calendar").css("display", "block");
    }
}

$("li#li_book_class, li#li_book_keeper, li#li_book_status").on("click", function () {
    chartText = $(this).attr("id");
    for (let i = 0, max = barList.length; i < max; i++) {
        if (chartText === "li_" + barList[i]) {
            $.ajax({
                type: "GET",
                url: "/Book/GetDropDownList/" + barList[i],
                dataType: "json",
                success: function (response) {
                    bookCategoryList = response;
                }, error: function (error) {
                    alert("System Error");
                }
            });
            break;
        }
    }
});