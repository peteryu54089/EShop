
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

var autoCompleteCreate = ["#create_name", "#create_author", "#create_publisher", "#create_note"];
var inputListOfCreate = ["create_name", "create_author", "create_publisher", "create_note", "create_bought_date", "create_class"];

$(window).load(function () {
    setCreateDropDownList();

    // Set create window
    $("#create_window").kendoWindow({
        width: "210px",
        title: "新增書籍",
        visible: false,
        modal: true,
        actions: [
            "Close"
        ],
        close: function () {
            clearCreate();
        }
    }).data("kendoWindow").center();

    // Close the popup window when clicking outside
    $(document).on("click", ".k-overlay", function () {
        $("#create_window").data("kendoWindow").close();
        clearCreate();
    });

    // open create window when clicked the button
    $("#btn_create_window").on("click", function (e) {
        e.preventDefault();
        $("#create_window").data("kendoWindow").open();
        $("#create_window").data("kendoWindow").center();
    });

    // Set the auto complete attribute of the input textbox
    for (let i = 0, max = autoCompleteCreate.length; i < max; i++) {
        $(autoCompleteCreate[i]).kendoAutoComplete({
            dataSource: {
                transport: {
                    read: {
                        url: "/Book/GetAutoComplete/" + $(autoCompleteCreate[i]).attr("id"),
                        type: "GET",
                        dataType: "json"
                    }
                }
            }
        });
    }

    // Check input
    $("#create_window").kendoValidator({
        messages: {
            input_empty: "不能為空",
            input_length: "輸入過長"
        },
        rules: {
            input_empty: function (input) {
                for (let i = 0, max = inputListOfCreate.length; i < max; i++) {
                    if (input.is("[name=" + inputListOfCreate[i] + "]") && $("#" + inputListOfCreate[i]).val().trim().length === 0) {
                        return false;
                    }
                }
                return true;
            },
            input_length: function (input) {
                var inputLength = [400, 60, 40, 2400, 10, 120];
                for (let i = 0, max = inputListOfCreate.length; i < max; i++) {
                    if (input.is("[name=" + inputListOfCreate[i] + "]") && $("#" + inputListOfCreate[i]).val().length > inputLength[i]) {
                        return false;
                    }
                }
                return true;
            }
        }
    });

    // Create book success
    $("#btn_save_create").click(function () {
        if (!$("#create_window").data("kendoValidator").validate()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "/Book/Create",
            dataType: "json",
            data: {
                bookName: $("#create_name").val(),
                bookAuthor: $("#create_author").val(),
                bookPublisher: $("#create_publisher").val(),
                bookNote: $("#create_note").val(),
                bookBoughtDate: $("#create_bought_date").val(),
                bookClass: $("#create_class").val()
            },
            success: function (response) {
                // Show success message
                $("#popup_notification").kendoNotification().data("kendoNotification").show("新增成功", "upload-success");
                // Close create window
                $("#create_window").data("kendoWindow").close();
                // clear input of window
                clearCreate();
                // Update the book grid
                $("#book_grid").data("kendoGrid").dataSource.read();
                location.reload();
            }, error: function (error) {
                alert(error.Message);
            }
        });
    });
})

// Set dropdownlist options
function setCreateDropDownList() {
    $("#create_bought_date").attr("value", new Date().toISOString().substring(0, 10));
    $("#create_class").kendoDropDownList({
        dataTextField: "Text",
        dataValueField: "Value",
        dataSource: {
            transport: {
                read: {
                    url: "/Book/GetDropDownList/" + $("#create_class").attr("id"),
                    type: "GET",
                    dataType: "json"
                }
            }
        }
    });
}

// Clear input when create success
function clearCreate() {
    for (let i = 0, max = autoCompleteCreate.length; i < max; i++) {
        $(autoCompleteCreate[i]).val("");
    }
    $("#create_class").data("kendoDropDownList").value("");
}