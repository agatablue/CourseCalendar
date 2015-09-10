


var Calendar = function () {
    var calendarDomElement = $('.calendar');
    var coursesField = $('.coursesField');
    var coursesColors = ['#884d46','#5c6d7d', '#6fa9e3', '#287f49', '#d3a66c'];

    var date = new Date();
    var localDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1
    }

    /* Get days of month
     @return number
     */
    function getDaysOfMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }

    /* Get name of day of month
     @return string
     */
    function getNameDayOfMonth(month, year) {
        return  new Date(year, month, 0).toLocaleString("pl", { month: "long" });
    }

    /* Create calendar Dom element, append to div with class "calendar"
     */
    function createCalendar(month, year, nameOfMonth) {
        resetCalendar();
        var headerCalendar = '<h3>'+ nameOfMonth + '</h3>';
        var calendarDom = headerCalendar;
        var calendarDays = '';


        calendarDom += '<table id="courses-calendar" data-month="' + month + '">';
        calendarDom += '<tr><th class="courses"> ' +
            '<span class="course" data-coursename="frontend-day" data-startcourse="1" data-endcourse="14">Front-end</span>' +
            '<span class="course" data-coursename="frontend-day" data-startcourse="6" data-endcourse="30">Back-end</span>'+
            '<span class="course" data-coursename="frontend-day" data-startcourse="2" data-endcourse="30">Back-end</span>'
        calendarDom +='</th>';

        for (var i = 0; i < getDaysOfMonth(month, year); i++){
            calendarDom += '<td></td>';
            calendarDays += '<td>'+ (i+1) +'</td>';
        }
        calendarDom += '</tr>';

        calendarDom += '<tr><th></th>' + calendarDays + '</tr>';

        calendarDom += '</table>'
        calendarDomElement.append(calendarDom);
    }


    /* Create array with courses object and for ever course draw line
     */
    function setCoursesLine() {
        var courses = [];
        calendarDomElement.find('.course').each(function(index, element) {
            var course = {
                name: $(element).data('coursename'),
                startCourse: $(element).data('startcourse'),
                endCourse: $(element).data('endcourse'),
            }
            drawCourseLine(course, element, index);
        });
    }

    function getTdWidth() {
        return calendarDomElement.find('td').outerWidth();
    }

    function drawCourseLine(course, element, i) {
        var line1 = $('<div class="line"></div>');
        var startDay = course.startCourse;
        var endDay = course.endCourse;
        var topLine = $(element).position().top + $(element).outerHeight()/2 ;
        var dayWidth =  getTdWidth();
        var leftOffset = $('.courses').outerWidth() + startDay * dayWidth - dayWidth;

        $('.courses').prepend(line1);

        line1.css({
            width:  endDay  * dayWidth - startDay * dayWidth + dayWidth,
            left: leftOffset,
            top: topLine,
            backgroundColor: coursesColors[i]
        })
    }

    function resetCalendar() {
        calendarDomElement.empty();
    }


    function changeCalendar(direction) {
        localDate.month += (direction === "right") ? 1 : -1

        if(localDate.month > 12 ) {
            localDate.month = 1;
            localDate.year += 1;
        }

        if(localDate.month < 1 ) {
            localDate.month = 12;
            localDate.year -= 1;
        }
        drawCalendar();
    }

    function drawCalendar() {
        var nameOfMonth = getNameDayOfMonth(localDate.month, localDate.year);
        createCalendar(localDate.month, localDate.year, nameOfMonth);
        setCoursesLine();
    }

   return {
      init: function() {
          drawCalendar();

          $('.changeCal').on('click', function(event) {
              changeCalendar($(this).data('direction'));
          })
      }
   }

}

$(document).ready(function() {
    var calendar = new Calendar();
    calendar.init();
})


