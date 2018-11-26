
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

var dropdownlistOfRead = ["#book_class", "#book_status"];
var autoCompleteRead = ["#book_name", "#book_keeper"];
var inputListOfRead = ["book_name", "book_keeper"];

$(window).load(function () {
    setReadDropDownList();

    // Set the search window
    $("#read_window").kendoWindow({
        width: "210px",
        title: "查詢書籍",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: function () {
            // clear input when closed the window
            clearSearch();
        }
    }).data("kendoWindow").center();

    // Close the popup window when clicking outside
    $(document).on("click", ".k-overlay", function () {
        $("#read_window").data("kendoWindow").close();
        clearSearch();
    });

    // Open read window when clicked button
    $("#btn_read_window").on("click", function (e) {
        e.preventDefault();
        $("#read_window").data("kendoWindow").open();
        $("#read_window").data("kendoWindow").center();
    });

    // Set the auto complete attribute of input textboxes
    for (let i = 0, max = autoCompleteRead.length; i < max; i++) {
        $(autoCompleteRead[i]).kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "/Book/GetAutoComplete/" + $(autoCompleteRead[i]).attr("id"),
                        type: "GET",
                        dataType: "json"
                    }
                }
            }
        });
    }

    // Check if input too long
    $("#read_window").kendoValidator({
        messages: {
            input_length: "輸入過長"
        },
        rules: {
            input_length: function (input) {
                var inputLength = [400, 202];
                for (let i = 0, max = inputListOfRead.length; i < max; i++) {
                    if (input.is("[name=" + inputListOfRead[i] + "]") && $("#" + inputListOfRead[i]).val().length > inputLength[i]) {
                        return false;
                    }
                }
                return true;
            }
        }
    });

    // When click the search button
    $("#btn_search_book").click(function () {
        if (!$("#read_window").data("kendoValidator").validate()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "/Book/Read",
            dataType: "json",
            data: {
                bookName: $("#book_name").val(),
                bookClass: $("#book_class").val(),
                bookKeeper: $("#book_keeper").val(),
                bookStatus: $("#book_status").val()
            },
            success: function (response) {
                var dataSource = new kendo.data.DataSource({ data: response, pageSize: 20 });
                // Update dataSource of grid
                $("#book_grid").data("kendoGrid").setDataSource(dataSource);
            }, error: function (error) {
                alert(error.Message);
            }
        });
        // Close the window when button clicked
        $("#read_window").data("kendoWindow").close();
        // Clear the value of inputs
        clearSearch();
    });

    $("#btn_clear_search").click(function () {
        clearSearch();
    });
})

// Set dropdownlist options from server
function setReadDropDownList() {
    for (let i = 0, max = dropdownlistOfRead.length; i < max; i++) {
        $(dropdownlistOfRead[i]).kendoDropDownList({
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: {
                transport: {
                    read: {
                        url: "/Book/GetDropDownList/" + $(dropdownlistOfRead[i]).attr("id"),
                        type: "GET",
                        dataType: "json"
                    }
                }
            }
        });
    }
}

// clear inputs
function clearSearch() {
    $("#book_name").val("");
    $("#book_keeper").val("");
    for (let i = 0, max = dropdownlistOfRead.length; i < max; i++) {
        $(dropdownlistOfRead[i]).data("kendoDropDownList").value("");
    }
}