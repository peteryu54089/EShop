
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

$(function () {
    setTimeout(showPage, 2000);
});

// Set book grid attribute
if ($("#book_grid").data("kendoGrid") == undefined) {
    $("#book_grid").kendoGrid({
        dataSource: {
            transport: {
                read: {
                    url: "/Book/GetBookGrid",
                    type: "GET",
                    dataType: "json"
                }
            },
            pageSize: 20
        },
        height: 550,
        // groupable: true,
        sortable: true,
        selectable: true,
        pageable: {
            // refresh: true,
            // pageSizes: true,
            buttonCount: 5
        },
        columns: setBookGridColumns()
    });
}

// Set update window attribute
$("#update_window").kendoWindow({
    width: "210px",
    title: "修改書籍",
    visible: false,
    modal: true,
    actions: [
        "Close"
    ],
    close: function () {
        clearUpdate();
    }
}).data("kendoWindow").center();

// Close the popup window when clicking outside
$(document).on("click", ".k-overlay", function () {
    $("#update_window").data("kendoWindow").close();
    clearUpdate();
});

var grid = $("#book_grid").data("kendoGrid");
var dropdownlistOfUpdate = ["#update_class", "#update_status", "#update_keeper"];
var autoCompleteUpdate = ["#update_name", "#update_author", "#update_publisher", "#update_note"];
var inputListOfUpdate = ["update_name", "update_author", "update_publisher", "update_note", "update_bought_date", "update_class", "update_status", "update_keeper"];

// Set auto complete attribute of textbox
for (let i = 0, max = autoCompleteUpdate.length; i < max; i++) {
    $(autoCompleteUpdate[i]).kendoAutoComplete({
        dataSource: {
            transport: {
                read: {
                    url: "/Book/GetAutoComplete/" + $(autoCompleteUpdate[i]).attr("id"),
                    type: "GET",
                    dataType: "json"
                }
            }
        }
    });
}

// Set dropdownlist options from server
for (let i = 0, max = dropdownlistOfUpdate.length; i < max; i++) {
    $(dropdownlistOfUpdate[i]).kendoDropDownList({
        dataTextField: "Text",
        dataValueField: "Value",
        dataSource: {
            transport: {
                read: {
                    url: "/Book/GetDropDownList/" + $(dropdownlistOfUpdate[i]).attr("id"),
                    type: "GET",
                    dataType: "json"
                }
            }
        },
        change: checkStatus
    });
}

// Check input
$("#update_window").kendoValidator({
    messages: {
        input_empty: "不能為空",
        input_length: "輸入過長"
    },
    rules: {
        input_empty: function (input) {
            for (let i = 0, max = inputListOfUpdate.length; i < max; i++) {
                if (input.is("[name=" + inputListOfUpdate[i] + "]") && $("#" + inputListOfUpdate[i]).val().trim().length === 0) {
                    return false;
                }
            }
            return true;
        },
        input_length: function (input) {
            var inputLength = [400, 60, 40, 2400, 10, 120, 1, 24];
            for (let i = 0, max = inputListOfUpdate.length; i < max; i++) {
                if (input.is("[name=" + inputListOfUpdate[i] + "]") && $("#" + inputListOfUpdate[i]).val().length > inputLength[i]) {
                    return false;
                }
            }
            return true;
        }
    }
});

// Save book when save button clicked
$("#btn_save_update").click(function () {
    if (!$("#update_window").data("kendoValidator").validate()) {
        return;
    }
    $.ajax({
        type: "POST",
        url: "/Book/SaveUpdate",
        dataType: "json",
        data: {
            bookId: getBookId(),
            bookName: $("#update_name").val(),
            bookAuthor: $("#update_author").val(),
            bookPublisher: $("#update_publisher").val(),
            bookNote: $("#update_note").val(),
            bookBoughtDate: $("#update_bought_date").val(),
            bookClass: $("#update_class").val(),
            bookStatus: $("#update_status").val(),
            bookKeeper: $("#update_keeper").val()
        },
        success: function (response) {
            // Show success message
            $("#popup_notification").kendoNotification().data("kendoNotification").show("修改成功", "info");
            // Close update window
            $("#update_window").data("kendoWindow").close();
            // Clear inputs
            clearUpdate();
            // Update book grid
            grid.dataSource.read();
        }, error: function (error) {
            alert(error.Message);
        }
    });
});

// Delete book when delete button clicked
$("#btn_delete_book").click(function (e) {
    if (confirm('確定刪除此書?')) {
        $.ajax({
            type: "POST",
            url: "/Book/Delete",
            data: "bookId=" + getBookId(),
            dataType: "json",
            success: function (response) {
                if (response.delete == "false") {
                    alert("這本書已借出，目前無法刪除");
                } else {
                    // Show success message
                    $("#popup_notification").kendoNotification().data("kendoNotification").show("刪除成功", "error");
                    // Close update window
                    $("#update_window").data("kendoWindow").close();
                    // Clear inputs of update window
                    clearUpdate();
                    $("#book_grid").data("kendoGrid").dataSource.read();
                }
            }, error: function (error) {
                alert("系統發生錯誤");
            }
        });
    }
});

// Store current book keeper value into local storage
storeBookKeeper(false);
var bookKeeper = $("#update_keeper").data("kendoDropDownList");
function checkStatus() {
    if ($("#update_status").val() === "A" || $("#update_status").val() === "U") {
        bookKeeper.enable(false);
        // Store current book keeper value into local storage
        storeBookKeeper(false);
        // clear text of current selected option
        bookKeeper.text("");
    }
    if (($("#update_status").val() === "B" || $("#update_status").val() === "C") && getBookKeeper() != null) {
        bookKeeper.enable(true);
        // Set text of book keeper from local storage
        bookKeeper.text(getBookKeeper());
        // clear book keeper value in local storage
        storeBookKeeper(true);
    }
}

function setBookGridColumns() {
    return [
        { field: "BookClass", title: "圖書類別", width: "20%" },
        { field: "BookName", title: "書名", width: "20%" },
        { field: "BookBoughtDate", title: "購書日期", width: "12%" },
        { field: "BookStatus", title: "借閱狀態", width: "13%" },
        { field: "BookKeeper", title: "借閱人", width: "15%" },
        { command: { text: "編輯", click: updateBook }, title: " ", width: "10%" },
        { command: { text: "刪除", click: deleteBook }, title: " ", width: "10%" }
    ];
}

// Set default value of update window when edit button clicked
function updateBook(e) {
    // Get current selected book id by table tr
    var bookId = grid.dataItem($(e.currentTarget).closest("tr")).BookId;
    // Store book id into local storage
    storeBookId(bookId);
    $.ajax({
        type: "POST",
        url: "/Book/GetBookForUpdate/" + bookId,
        dataType: "json",
        success: function (response) {
            $("#update_name").val(response.BookName);
            $("#update_author").val(response.BookAuthor);
            $("#update_publisher").val(response.BookPublisher);
            $("#update_note").val(response.BookNote);
            $("#update_bought_date").val(response.BookBoughtDate);
            $("#update_class").data("kendoDropDownList").value(response.BookClass);
            $("#update_status").data("kendoDropDownList").value(response.BookStatus);
            if (response.BookStatus === 'A' || response.BookStatus === 'U') {
                $("#update_keeper").data("kendoDropDownList").enable(false);
            } else {
                $("#update_keeper").data("kendoDropDownList").value(response.BookKeeper);
            }
        }, error: function () {
            alert("目前系統異常或忙碌中，請稍後再試。");
        }
    });
    e.preventDefault();
    $("#update_window").data("kendoWindow").open();
    $("#update_window").data("kendoWindow").center();
}

// Post book id to server for delete when delete button clicked
function deleteBook(e) {
    e.preventDefault();
    // Get current selected
    var target = $(e.currentTarget).closest("tr");
    var dataItem = grid.dataItem(target);
    if (confirm('確定刪除此書?')) {
        $.ajax({
            type: "POST",
            url: "/Book/Delete",
            data: "bookId=" + dataItem.BookId,
            dataType: "json",
            success: function (response) {
                if (response.delete == "false") {
                    alert("這本書已借出，目前無法刪除");
                } else {
                    // Delete the book from row
                    grid.removeRow(target);
                    // Show success message
                    $("#popup_notification").kendoNotification().data("kendoNotification").show("刪除成功", "error");
                    // Close update window
                    $("#update_window").data("kendoWindow").close();
                    // Clear inputs of update window
                    clearUpdate();
                }
            }, error: function (error) {
                alert("系統發生錯誤");
            }
        });
    }
}

function storeBookId(bookId) {
    localStorage.setItem("bookId", JSON.stringify(bookId));
}

function getBookId() {
    return JSON.parse(localStorage.getItem("bookId"));
}

// Clear textbox and dropdownlist
function clearUpdate() {
    for (let i = 0, max = autoCompleteUpdate.length; i < max; i++) {
        $(autoCompleteUpdate[i]).val("");
    }
    for (let i = 0, max = dropdownlistOfUpdate.length; i < max; i++) {
        $(dropdownlistOfUpdate[i]).data("kendoDropDownList").value("");
    }
}

function storeBookKeeper(init) {
    if (init) {
        localStorage.setItem("keeperText", JSON.stringify(null));
    } else {
        localStorage.setItem("keeperText", JSON.stringify($("#update_keeper option:selected").text()));
    }
}

function getBookKeeper() {
    return JSON.parse(localStorage.getItem("keeperText"));
}

function showPage() {
    $("#read_window").css("display", "block");
    $("#create_window").css("display", "block");
    $("#update_window").css("display", "block");
    $("#chart_block").css("display", "none");
    $("#second_layout").css("display", "none");
    $("#calendar").css("display", "none");
}