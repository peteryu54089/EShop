﻿
// Created by GSS
// User: Peter-Yu
// Date: 2018/07/05

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
        $("#h_book_name").text(response[0].BookName);
        $("#span_book_class").text(response[0].BookClass);
        $("#span_book_bought_date").text(response[0].BookBoughtDate);
        $("#span_book_status").text(response[0].BookStatus);
        $("#span_book_keeper").text(response[0].BookKeeper);
    }, error: function (error) {
        alert(error.Message);
    }
});

$(document).ready(function () {

    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listMonth'
        },
        defaultDate: '2018-03-12',
        navLinks: true, // can click day/week names to navigate views
        businessHours: true, // display business hours
        editable: true,
        events: [
          {
              title: 'Business Lunch',
              start: '2018-03-03T13:00:00',
              constraint: 'businessHours'
          },
          {
              title: 'Meeting',
              start: '2018-03-13T11:00:00',
              constraint: 'availableForMeeting', // defined below
              color: '#257e4a'
          },
          {
              title: 'Conference',
              start: '2018-03-18',
              end: '2018-03-20'
          },
          {
              title: 'Party',
              start: '2018-03-29T20:00:00'
          },

          // areas where "Meeting" must be dropped
          {
              id: 'availableForMeeting',
              start: '2018-03-11T10:00:00',
              end: '2018-03-11T16:00:00',
              rendering: 'background'
          },
          {
              id: 'availableForMeeting',
              start: '2018-03-13T10:00:00',
              end: '2018-03-13T16:00:00',
              rendering: 'background'
          },

          // red areas where no events can be dropped
          {
              start: '2018-03-24',
              end: '2018-03-28',
              overlap: false,
              rendering: 'background',
              color: '#ff9f89'
          },
          {
              start: '2018-03-06',
              end: '2018-03-08',
              overlap: false,
              rendering: 'background',
              color: '#ff9f89'
          }
        ]
    });

});