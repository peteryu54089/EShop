
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

function createChart() {
    $("#book_chart").kendoChart({
        title: {
            text: chartText.split("_")[2]
        },
        legend: {
            visible: false
        },
        seriesDefaults: {
            type: "bar"
        },
        series: [{
            name: "數量",
            data: initSeriesData()
        }],
        valueAxis: {
            line: {
                visible: false
            },
            minorGridLines: {
                visible: true
            },
            labels: {
                rotation: "auto"
            }
        },
        categoryAxis: {
            categories: setCategories(),
            majorGridLines: {
                visible: false
            }
        },
        tooltip: {
            visible: true,
            template: "#= series.name #: #= value #"
        }
    });
}

$(document).bind("kendo:skinChange", createChart);

$(function () {
    $.ajax({
        type: "GET",
        url: "/Book/GetBookGrid",
        dataType: "json",
        success: function (response) {
            bookList = response;
        }, error: function (error) {
            alert(error.Message);
        }
    });
});

// Store book categories
function setCategories() {
    var categories = [];
    for (let i = 0, max = barList.length; i < max; i++) {
        if (chartText === "li_" + barList[i]) {
            for (let j = 0, max = bookCategoryList.length; j < max; j++) {
                categories.push(JSON.stringify(Object.values(bookCategoryList[j])).split(",")[3]);
            }
            break;
        }
    }
    return categories;
}

// Find total count of each category
function setSeriesData(seriesData, categories) {
    for (let i = 0, max = barList.length; i < max; i++) {
        if (chartText === "li_" + barList[i]) {
            for (let j = 0, max = bookList.length; j < max; j++) {
                for (let k = 0, max = categories.length; k < max; k++) {
                    if (JSON.stringify(bookList[j].BookClass) === categories[k]) {
                        seriesData[k]++;
                    } else if (JSON.stringify(bookList[j].BookKeeper) === categories[k]) {
                        seriesData[k]++;
                    } else if (JSON.stringify(bookList[j].BookStatus) === categories[k]) {
                        seriesData[k]++;
                    }
                }
            }
            break;
        }
    }
    return seriesData;
}

// Update the data in an existing chart
function initSeriesData() {
    var seriesData = [];
    var categories = setCategories();
    for (let i = 0, max = categories.length; i < max; i++) {
        seriesData.push(0);
    }
    return setSeriesData(seriesData, categories);
}