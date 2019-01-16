startTime();

function startTime() {
    var today = new Date();
    var military = true;
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var fullDate = getFullDate();

    h = formatDateTime(h,military);
    m = formatDateTime(m);
    s = formatDateTime(s);

    document.getElementById('myClock').textContent =
    h + ":" + m + ":" + s + "\n" + fullDate;
    //Timeout(...): Wait 500 then call startTime()
    var t = setTimeout(startTime, 500);
}



function formatDateTime(i) {
     // add zero in front of numbers < 10
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function militaryTime(h, milit) {
    //Takes the hour (h) and a bool (milit) and returns the formatted hour
    if (milit==true){
        if (h>12){
            return h+12;
        }
        return "0"+h;
    } else {
        return "0"+h;
    }

}

function getFullDate() {
    //Gets the mm/dd/yyyy
    var today = new Date();
    var mm = today.getMonth()+1; //January is 0
    var dd = today.getDate();
    var yyyy = today.getFullYear()-2000;
    dd = formatDateTime(dd);
    mm = formatDateTime(mm);

    today = mm + '/' + dd + '/' + yyyy;
    return today;
}
