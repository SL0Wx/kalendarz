let layouts = document.getElementById("layout-list").querySelectorAll("li");
let calendars = document.getElementById("calendars").querySelectorAll("li");
window.wydarzenia = new Array();
window.zadania = new Array();
window.wszystkie = new Array();
window.users = new Array();
window.user = "";
allHeights = new Array();

//przełączanie pomiędzy widokami w kalendarzu
document.getElementById("layout-list").addEventListener("click",function(e) {
    let selected = e.target;
    for (var i = 0, len = layouts.length; i < len; i++) {
        if (selected.tagName == "LI") {
            if(selected && selected == layouts[i]) {
                layouts[i].style.color = "white";
                if (selected.classList.contains('rok')){
                    rokLayout(date);
                }
                else if (selected.classList.contains('miesiac')){
                    miesiacLayout(date);
                }
                else if (selected.classList.contains('tydzien')){
                    tydzienLayout(date);
                }
                else if (selected.classList.contains('dzien')){
                    dzienLayout(date);
                }
            }
            else {
                layouts[i].style.color = "#00FF94";
            }
        }
    }
});

//wyświetlanie poprzedniej daty
function previousDate() {
    let value = document.getElementsByClassName("previous")[0].value;
    switch (value){
        case '1':
            date.setFullYear(date.getFullYear()-1);
            rokLayout(date);
            break;
        case '2':
            date.setDate(1);
            date.setMonth(date.getMonth()-1);
            miesiacLayout(date);
            break;
        case '3':
            date.setDate(date.getDate()-7);
            tydzienLayout(date);
            break;
        case '4':
            date.setDate(date.getDate()-1);
            dzienLayout(date);
            break;
    }
}

//wyświetlanie następnej daty
function nextDate() {
    let value = document.getElementsByClassName("next")[0].value;
    switch (value){
        case '1':
            date.setFullYear(date.getFullYear()+1);
            rokLayout(date);
            break;
        case '2':
            date.setDate(1);
            date.setMonth(date.getMonth()+1);
            miesiacLayout(date);
            break;
        case '3':
            date.setDate(date.getDate()+7);
            tydzienLayout(date);
            break;
        case '4':
            date.setDate(date.getDate()+1);
            dzienLayout(date);
            break;
    }
}

//wyświetlanie wieku
function getCentury(century) {
    century = Math.ceil(century / 100);
    return century;
}

//widok roku z podziałem na miesiące
function rokLayout(date){
    document.getElementsByClassName('calendar')[0].setAttribute("id","rok");
    var currentYear = document.querySelector("#labelA");
    var currentCentury = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    let month = today.getMonth();
    var labelA = date.toLocaleDateString("pl-PL", {year:'numeric'}).toString();
    currentYear.innerHTML = "<button class='previous' onclick='previousDate()' value='1'><</button><p style='width: 160px;'> Rok " + labelA + " </p><button class='next' onclick='nextDate()' value='1'>></button>";
    currentCentury.innerHTML = "<ol id='wiek' type='I'><li value='"+getCentury(labelA)+"'>Wiek</li></ol>";
    today.setHours(0,0,0,0);
    calendarDays.innerHTML = "";
    let months = ["STY","LUT","MAR","KWI","MAJ","CZE","LIP","SIE","WRZ","PAŹ","LIS","GRU"]
    for (let i = 0; i < months.length; i++){
        if (month == i && today.getFullYear() == date.getFullYear()) {
            calendarDays.innerHTML += `<div class='item-rok' id="selected" onClick="showMonth(${i})">${months[i]}</div>`;
        }
        else {
            calendarDays.innerHTML += `<div class='item-rok' onClick="showMonth(${i})">${months[i]}</div>`;
        }      
    }
    upDate();
}

//widok miesiąca z podziałem na dni
function miesiacLayout(date){
    document.getElementsByClassName('calendar')[0].setAttribute("id","miesiac");
    var currentMonth = document.querySelector("#labelA");
    var currentYear = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    var labelA = date.toLocaleDateString("pl-PL", {month:'long'}).toString();
    currentMonth.innerHTML = "<button class='previous' onclick='previousDate()' value='2'><</button> <p style='width: 200px;'>" + labelA[0].toUpperCase() + labelA.substring(1) + "</p> <button class='next' onclick='nextDate()' value='2'>></button>";
    currentYear.innerHTML = date.toLocaleDateString("pl-PL", {year:'numeric'}).toString();
    today.setHours(0,0,0,0);
    calendarDays.innerHTML = "";
    const prevLastDay = new Date(date.getFullYear(),date.getMonth(),0).getDate();
    const totalMonthDay = new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
    const startWeekDay = new Date(date.getFullYear(),date.getMonth(),-1).getDay();
    let currentday = new Date();
    let totalCalendarDay = 6 * 7;
    let week = ["PN","WT","ŚR","CZ","PT","SO","N"]
    for (let i = 0; i < week.length; i++){
        calendarDays.innerHTML += `<div class='item-miesiac-header'>${week[i]}</div>`;
    }
    for (let i = 0; i < totalCalendarDay; i++) {
        let day = i-startWeekDay;
        if(i <= startWeekDay){
            //dodawanie dni z poprzedniego miesiąca
            calendarDays.innerHTML += `<div class='item-miesiac-other' onClick='showMonthDay(${day})'>${prevLastDay+i-startWeekDay}</div>`;
        }else if(i <= startWeekDay+totalMonthDay){
            //dodawanie dni z obecnego miesiąca
            currentday.setDate(day);
            let dayClass = currentday.getTime()===today.getTime() ? 'current-day' : 'month-day';
            if (today.getDate() == day && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()){
                calendarDays.innerHTML += `<div class='item-miesiac' id='selected' onClick='showMonthDay(${day})'>${day}</div>`;
            }
            else{
                let tick = 0;
                let count = 0;
                for (j = 0; j < window.wszystkie.length; j++){
                    let dataWyd = new Date(window.wszystkie[j][3]);
                    dzienWyd = dataWyd.getDate();
                    if (day == dzienWyd && date.getMonth() == dataWyd.getMonth() && date.getFullYear() == dataWyd.getFullYear()){
                        count += 1;
                        if (count <= 1){
                            if (window.wszystkie[j][8] == null){
                                calendarDays.innerHTML += `<div class='item-miesiac' style='border-color: ${window.wszystkie[j][5]}; color: ${window.wszystkie[j][5]}' onClick='showMonthDay(${day})'>${day}</div>`;
                            }
                            else {
                                calendarDays.innerHTML += `<div class='item-miesiac' style='border-color: ${window.wszystkie[j][6]}; color: ${window.wszystkie[j][6]}' onClick='showMonthDay(${day})'>${day}</div>`;
                            }             
                        }                    
                        tick = 1;
                    }  
                }
                if (tick == 0){
                    calendarDays.innerHTML += `<div class='item-miesiac' onClick='showMonthDay(${day})'>${day}</div>`;
                }
                else {
                    tick = 0;
                }
            }
        }else{
            //dodawanie dni z przyszłego miesiąca
            calendarDays.innerHTML += `<div class='item-miesiac-other' onClick='showMonthDay(${day})'>${day-totalMonthDay}</div>`;
        }    
    }
    upDate();
}

//widok tygodnia z podziałem na dni
function tydzienLayout(date){
    document.getElementsByClassName('calendar')[0].setAttribute("id","tydzien");
    var currentWeek = document.querySelector("#labelA");
    var currentMonth = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    var weekdays = new Date(date);
    //var dayNum = weekdays.getDay() || 7;
    weekdays.setDate(date.getDate() - 1);
    var yearStart = new Date(date.getFullYear(),0,1);
    var labelA = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
    currentWeek.innerHTML = "<button class='previous' onclick='previousDate()' value='3'><</button><p style='width: 190px;'> Tydzień " + labelA + " </p><button class='next' onclick='nextDate()' value='3'>></button>";
    var labelB = date.toLocaleDateString("pl-PL", {month:'long'}).toString();
    currentMonth.innerHTML = labelB[0].toUpperCase() + labelB.substring(1);
    weekdays.setHours(0,0,0,0);
    calendarDays.innerHTML = "";
    let weekDays = dates(weekdays,'1');
    let week = ["PONIEDZIAŁEK","WTOREK","ŚRODA","CZWARTEK","PIĄTEK","SOBOTA","NIEDZIELA"];
    for (i = 0; i < week.length; i++){
        if (weekDays[i].getDate() == today.getDate() && weekDays[i].getMonth() == today.getMonth() && weekDays[i].getFullYear() == today.getFullYear()){
            calendarDays.innerHTML += `<div class='item-tydzien' id='selected' onClick='showWeekDay(${weekDays[i].getDate()},${weekDays[i].getMonth()})'><span class='tydzien-number' id='selected'>${weekDays[i].getDate()}</span><span class='tydzien-name'>${week[i]}</span></div>`;
        }
        else{
            let tick = 0;
            let count = 0;
            for (j = 0; j < window.wszystkie.length; j++){
                let dataWyd = new Date(window.wszystkie[j][3]);
                dzienWyd = dataWyd.getDate();
                if (weekDays[i].getDate() == dzienWyd && weekDays[i].getMonth() == dataWyd.getMonth() && date.getFullYear() == dataWyd.getFullYear()){
                    count += 1;
                    if (count <= 1){
                        if (window.wszystkie[j][8] == null){
                            calendarDays.innerHTML += `<div class='item-tydzien' style='background: ${window.wszystkie[j][5]}' onClick='showWeekDay(${weekDays[i].getDate()},${weekDays[i].getMonth()})'><span class='tydzien-number'>${weekDays[i].getDate()}</span><span class='tydzien-name'>${week[i]}</span></div>`;
                        }
                        else {
                            calendarDays.innerHTML += `<div class='item-tydzien' style='background: ${window.wszystkie[j][6]}' onClick='showWeekDay(${weekDays[i].getDate()},${weekDays[i].getMonth()})'><span class='tydzien-number'>${weekDays[i].getDate()}</span><span class='tydzien-name'>${week[i]}</span></div>`;
                        }
                    }                    
                    tick = 1;
                }  
            }
            if (tick == 0){
                calendarDays.innerHTML += `<div class='item-tydzien' onClick='showWeekDay(${weekDays[i].getDate()},${weekDays[i].getMonth()})'><span class='tydzien-number'>${weekDays[i].getDate()}</span><span class='tydzien-name'>${week[i]}</span></div>`;
            }
            else {
                tick = 0;
            }
        }
    }
    upDate();
}

//widok dnia ze zdarzeniami
function dzienLayout(date){
    document.getElementsByClassName('calendar')[0].setAttribute("id","dzien");
    var currentDay = document.querySelector("#labelA");
    var currentMonth = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    document.getElementsByClassName("rok")[0].style.color = "#00FF94";
    document.getElementsByClassName("miesiac")[0].style.color = "#00FF94";
    document.getElementsByClassName("tydzien")[0].style.color = "#00FF94";
    var today = new Date();
    var day = date;
    currentDay.innerHTML = "<button class='previous' onclick='previousDate()' value='4'><</button><p style='width: 150px;'> Dzień " + day.getDate() + " </p><button class='next' onclick='nextDate()' value='4'>></button>";
    var labelB = day.toLocaleDateString("pl-PL", {month:'long'}).toString();
    currentMonth.innerHTML = labelB[0].toUpperCase() + labelB.substring(1);
    day.setHours(0,0,0,0);
    var dayNum = day.getUTCDay() || 7;
    calendarDays.innerHTML = "";
    calendarDays.innerHTML += `<div class='item-dzien'>`;
    let weekDays = dates(day,'2');
    let week = ["PONIEDZIAŁEK","WTOREK","ŚRODA","CZWARTEK","PIĄTEK","SOBOTA","NIEDZIELA"];
    for (i = 0; i < week.length; i++){
        if (weekDays[i].getDate() == day.getDate()) {
            document.getElementsByClassName("item-dzien")[0].innerHTML += `<div class="item-dzien-header">${week[i]}</div><div class="wyd-wrap"><div id="wyd-items"></div><div class="btn-wrap"><button class="day-button" onClick='showEventWindow(2)'>NOWE WYDARZENIE</button></div></div>`;
        }
    }
    for (i = 0; i < window.wszystkie.length; i++){
        dataWyd = new Date(window.wszystkie[i][3]);
        dzienWyd = dataWyd.getDate();
        miesiacWyd = dataWyd.getMonth();
        rokWyd = dataWyd.getFullYear();
        if (dzienWyd == date.getDate() && miesiacWyd == date.getMonth() && rokWyd == date.getFullYear()){
            if (window.wszystkie[i][8] == null){
                if (window.wszystkie[i][6] != window.user){
                    let author = "";
                    for (let j = 0; j < window.users.length; j++){
                        if (window.users[j][0] == window.wszystkie[i][6]){
                            author = window.users[j][2].toUpperCase();
                        }
                    }
                    document.getElementById("wyd-items").innerHTML += `<div class="zad-item" id="${window.wszystkie[i][0]}"><div class="wyd-color" style="background: ${window.wszystkie[i][5]}; border-radius: 10px;"><i class="fa-solid fa-u"></i></div><div class="wyd-detail"><div class="wyd-attr"><p id="zad-wyd-time"><i class="fa-solid fa-clock"></i>${window.wszystkie[i][4].slice(0, -3)}</p><p id="zad-wyd-time"><i class="fa-solid fa-user"></i>${author}</p></div><h2>${window.wszystkie[i][1]}</h2><p>${window.wszystkie[i][2]}</p></div><div class="wyd-modify"><button id="zad-edit" style="background: rgba(0, 255, 148, 0.4);" disabled>EDYTUJ</button><button id="zad-share" style="background: rgba(0, 255, 148, 0.4);" disabled><i class="fa-solid fa-share"></i></button><button id="zad-delete" onClick="deleteShareTask(${window.wszystkie[i][0]})"><i class="fa-solid fa-x"></i></button></div></div>`;
                }
                else {
                    document.getElementById("wyd-items").innerHTML += `<div class="zad-item" id="${window.wszystkie[i][0]}"><div class="wyd-color" style="background: ${window.wszystkie[i][5]}; border-radius: 10px;"><i class="fa-solid fa-z"></i></div><div class="wyd-detail"><p id="zad-wyd-time"><i class="fa-solid fa-clock"></i>${window.wszystkie[i][4].slice(0, -3)}</p><h2>${window.wszystkie[i][1]}</h2><p>${window.wszystkie[i][2]}</p></div><div class="wyd-modify"><button id="zad-edit" onClick="showEditWindow(${window.wszystkie[i][0]},this.id)">EDYTUJ</button><button id="zad-share" onClick="showShareWindow(${window.wszystkie[i][0]},this.id)"><i class="fa-solid fa-share"></i></button><button id="zad-delete" onClick="deleteTask(${window.wszystkie[i][0]})"><i class="fa-solid fa-x"></i></button></div></div>`;
                }
            }
            else {
                if (window.wszystkie[i][8] != window.user){
                    let author = "";
                    for (let j = 0; j < window.users.length; j++){
                        if (window.users[j][0] == window.wszystkie[i][8]){
                            author = window.users[j][2].toUpperCase();
                        }
                    }
                    document.getElementById("wyd-items").innerHTML += `<div class="wyd-item" id="${window.wszystkie[i][0]}"><div class="wyd-color" style="background: ${window.wszystkie[i][6]};"><i class="fa-solid fa-u"></i></div><div class="wyd-detail"><div class="wyd-attr"><p id="zad-wyd-time"><i class="fa-solid fa-clock"></i>${window.wszystkie[i][4].slice(0, -3)} - ${window.wszystkie[i][5].slice(0, -3)}</p><p id="zad-wyd-time"><i class="fa-solid fa-user"></i>${author}</p></div><h2>${window.wszystkie[i][1]}</h2><p>${window.wszystkie[i][2]}</p></div><div class="wyd-modify"><button id="wyd-edit" style="background: rgba(0, 255, 148, 0.4);" disabled>EDYTUJ</button><button id="wyd-share" style="background: rgba(0, 255, 148, 0.4);" disabled><i class="fa-solid fa-share"></i></button><button id="wyd-delete" onClick="deleteShareEvent(${window.wszystkie[i][0]})"><i class="fa-solid fa-x"></i></button></div></div>`;
                    document.getElementById('"'+window.wszystkie[i][0]+'"').getElementsByClassName("wyd-modify")[0].getElementById("wyd-edit").disabled = true;
                }
                else {
                    document.getElementById("wyd-items").innerHTML += `<div class="wyd-item" id="${window.wszystkie[i][0]}"><div class="wyd-color" style="background: ${window.wszystkie[i][6]};"><i class="fa-solid fa-w"></i></div><div class="wyd-detail"><p id="zad-wyd-time"><i class="fa-solid fa-clock"></i>${window.wszystkie[i][4].slice(0, -3)} - ${window.wszystkie[i][5].slice(0, -3)}</p><h2>${window.wszystkie[i][1]}</h2><p>${window.wszystkie[i][2]}</p></div><div class="wyd-modify"><button id="wyd-edit" onClick="showEditWindow(${window.wszystkie[i][0]},this.id)">EDYTUJ</button><button id="wyd-share" onClick="showShareWindow(${window.wszystkie[i][0]},this.id)"><i class="fa-solid fa-share"></i></button><button id="wyd-delete" onClick="deleteEvent(${window.wszystkie[i][0]})"><i class="fa-solid fa-x"></i></button></div></div>`;
                }
            }
        }
    }
    if (window.user == null){
        disableSwitch(1);
    }
    document.getElementById("wyd-items").innerHTML += `<div class="gradientBox"></div>`;
    upDate();
}

//Wyświetlanie dni dla danego tygodnia
function dates(current,type) {
    switch (type) {
        case '1':
            var week = new Array(); 
            test = new Date(current);
            test.setDate((current.getDate() - current.getDay() +1));
            for (var i = 0; i < 7; i++) {
                week.push(
                    new Date(test)
                ); 
                test.setDate(test.getDate() +1);
            }
            return week; 
            break;
        case '2':
            var week = new Array(); 
            test = new Date(current);
            test.setDate(current.getDate()-1);
            test.setDate((test.getDate() - test.getDay() +1));
            for (var i = 0; i < 7; i++) {
                week.push(
                    new Date(test)
                ); 
                test.setDate(test.getDate() +1);
            }
            return week; 
            break;
    }
}

//zmiana koloru nagłówków widoków
function showMonth(value){
    document.getElementById('layout-list').getElementsByTagName('li')[0].style.color = "#00FF94";
    document.getElementById('layout-list').getElementsByTagName('li')[1].style.color = "white";
    date.setMonth(value);
    miesiacLayout(date);
}

function showMonthDay(value){
    document.getElementById('layout-list').getElementsByTagName('li')[1].style.color = "#00FF94";
    document.getElementById('layout-list').getElementsByTagName('li')[3].style.color = "white";
    date.setDate(value);
    dzienLayout(date);
}

function showWeekDay(value, month){
    hideEventWindow();
    document.getElementById('layout-list').getElementsByTagName('li')[2].style.color = "#00FF94";
    document.getElementById('layout-list').getElementsByTagName('li')[3].style.color = "white";
    date.setMonth(month);
    date.setDate(value);
    dzienLayout(date);
}

//aktualizacja daty
function upDate() {
    document.getElementById("curDate").innerHTML = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
}

//wyświetlanie okna edycji wydarzeń i zadań
function showEditWindow(x,id){
    $("#EventWindow").fadeIn(250);
    document.getElementById("EventsWindow").style.display = "none";
    document.getElementById("EventWindow").style.display = "flex";
    document.getElementById("update-wydarzenie-form").style.display = "none";
    document.getElementById("update-zadanie-form").style.display = "none";
    document.getElementById("wydarzenie-form").style.display = "none";
    document.getElementById("zadanie-form").style.display = "none";
    document.getElementById("udostepnij-form").style.display = "none";
    document.getElementById("create-calendar").style.display = "none";
    document.getElementById("delete-calendar").style.display = "none";
    if (id == "wyd-edit"){
        document.getElementById("update-wydarzenie-form").style.display = "block";
        for (let i = 0; i < window.wydarzenia.length;i++){
            if (window.wydarzenia[i][0] == x){  
                if (window.user != window.wydarzenia[i][8]){
                    for (let j = 0; j < window.users.length; j++){
                        if (window.users[j][0] == window.wydarzenia[i][8]){
                            document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">EDYTUJ WYDARZENIE ` + window.users[j][2].toUpperCase() + `</span>`;
                        }
                    }
                }
                else {
                    document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">EDYTUJ WYDARZENIE</span>`;
                }
                document.getElementById("EventId").value = window.wydarzenia[i][0];
                document.getElementById("EventAuthor").value = window.wydarzenia[i][8];
                document.getElementById("Ugodz-roz").value = window.wydarzenia[i][4];
                document.getElementById("Udata").value = window.wydarzenia[i][3];
                document.getElementById("Ugodz-zak").value = window.wydarzenia[i][5];
                document.getElementById("Utytul").value = window.wydarzenia[i][1];
                document.getElementById("Uopis").value = window.wydarzenia[i][2];
                let kolory = document.querySelectorAll('input[name="updateKolor-wyd"]');
                kolory.forEach(kolor => {
                    if (kolor.value == window.wydarzenia[i][6]){
                        kolor.checked = true;
                    }
                });
                for (let j = 0; j < calendars.length; j++){
                    if (calendars[j].id == window.wydarzenia[i][9]){
                        document.getElementById("calendarSelectE").options.selectedIndex = j;
                    }
                }
                let x = wydarzenia[i][7];
                switch (x){
                    case '1':
                        disableCycle(2);
                        document.getElementById("Unie").checked = true;
                        break;
                    case '2':
                        disableCycle(2);
                        document.getElementById("Unie").checked = true;
                        break;
                    case '3':
                        enableCycle(2);
                        document.getElementById("Unie").checked = false;
                        document.getElementById("Utak").checked = true;
                        document.getElementById("Umiesiac").checked = true;
                        break;
                    case '4':
                        enableCycle(2);
                        document.getElementById("Unie").checked = false;
                        document.getElementById("Utak").checked = true;
                        document.getElementById("Urok").checked = true;
                        break;
                }
            }
        }
    }
    else if (id == "zad-edit"){
        document.getElementById("update-zadanie-form").style.display = "block";
        document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">EDYTUJ ZADANIE</span>`;
        for (let i = 0; i < window.zadania.length;i++){
            if (window.zadania[i][0] == x){
                document.getElementById("UTaskId").value = window.zadania[i][0];
                document.getElementById("UZgodz").value = window.zadania[i][4];
                document.getElementById("UZdata").value = window.zadania[i][3];
                document.getElementById("UZtytul").value = window.zadania[i][1];
                document.getElementById("UZopis").value = window.zadania[i][2];
                let kolory = document.querySelectorAll('input[name="updateKolor-zad"]');
                kolory.forEach(kolor => {
                    if (kolor.value == window.zadania[i][5]){
                        kolor.checked = true;
                    }
                });
                for (let j = 0; j < calendars.length; j++){
                    if (calendars[j].id == window.zadania[i][7]){
                        document.getElementById("calendarSelectT").options.selectedIndex = j;
                    }
                }
            }
        }
    }
    document.getElementById("eventLabel").style.textAlign = "left";
    document.getElementById("event-label-first").style.marginRight = "0px";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

//wyświetlanie okna udostępniania wydarzeń i zadań
function showShareWindow(x,id){
    $("#EventWindow").fadeIn(250);
    document.getElementById("share_error").innerHTML = "";
    document.getElementById("EventsWindow").style.display = "none";
    document.getElementById("EventWindow").style.display = "flex";
    document.getElementById("update-wydarzenie-form").style.display = "none";
    document.getElementById("update-zadanie-form").style.display = "none";
    document.getElementById("wydarzenie-form").style.display = "none";
    document.getElementById("zadanie-form").style.display = "none";
    document.getElementById("udostepnij-form").style.display = "flex";
    document.getElementById("eventLabel").style.textAlign = "center";
    document.getElementById("create-calendar").style.display = "none";
    document.getElementById("delete-calendar").style.display = "none";
    if (id == "wyd-share"){
        for (let i = 0; i < window.wydarzenia.length;i++){
            if (window.wydarzenia[i][0] == x){  
                document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">UDOSTĘPNIJ DO</span>`;
                document.getElementById("event-label-first").style.marginRight = "-40px";
                document.getElementById("shareEventId").value = window.wydarzenia[i][0];
            }
        }
    }
    else if (id == "zad-share"){
        for (let i = 0; i < window.zadania.length;i++){
            if (window.zadania[i][0] == x){
                document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">UDOSTĘPNIJ DO</span>`;
                document.getElementById("event-label-first").style.marginRight = "-40px";
                document.getElementById("shareTaskId").value = window.zadania[i][0];
            }
        }
    }
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

//usuwanie wybranego wydarzenia, zadania i udostępnionych
function deleteEvent(x){
    document.getElementById("deleteEventId").value = x;
    let confirmation = confirm("Czy na pewno chcesz usunąć to wydarzenie?");
    if (confirmation) {
        alert("Pomyślnie usunięto wydarzenie");
        document.getElementById('deleteEventForm').submit();
    } 
    else {
        alert("Usuwanie zostało anulowane");
    }
}

function deleteTask(x){
    document.getElementById("deleteTaskId").value = x;
    let confirmation = confirm("Czy na pewno chcesz usunąć to zadanie?");
    if (confirmation) {
        alert("Pomyślnie usunięto zadanie");
        document.getElementById('deleteTaskForm').submit();
    } 
    else {
        alert("Usuwanie zostało anulowane");
    }
}

function deleteShareEvent(x){
    document.getElementById("deleteShareEventId").value = x;
    let confirmation = confirm("Czy na pewno chcesz usunąć to wydarzenie?");
    if (confirmation) {
        alert("Pomyślnie usunięto udostępnione wydarzenie");
        document.getElementById('deleteShareEventForm').submit();
    } 
    else {
        alert("Usuwanie zostało anulowane");
    }
}

function deleteShareTask(x){
    document.getElementById("deleteShareTaskId").value = x;
    let confirmation = confirm("Czy na pewno chcesz usunąć to wydarzenie?");
    if (confirmation) {
        alert("Pomyślnie usunięto udostępnione wydarzenie");
        document.getElementById('deleteShareTaskForm').submit();
    } 
    else {
        alert("Usuwanie zostało anulowane");
    }
}

//wyświetlanie okna tworzenia lub usuwania kalendarza
function showCalendars(x){
    $("#EventWindow").fadeIn(250);
    document.getElementById("EventWindow").style.display = "flex";
    document.getElementById("EventsWindow").style.display = "none";
    document.getElementById("wydarzenie-form").style.display = "none";
    document.getElementById("update-wydarzenie-form").style.display = "none";
    document.getElementById("update-zadanie-form").style.display = "none";
    document.getElementById("zadanie-form").style.display = "none";
    document.getElementById("udostepnij-form").style.display = "none";
    document.getElementById("eventLabel").style.textAlign = "left";
    if (x == 1){
        document.getElementById("delete-calendar").style.display = "none";
        document.getElementById("create-calendar").style.display = "block";
        document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">NOWY KALENDARZ</span>`;
    }
    else if (x == 2){
        document.getElementById("create-calendar").style.display = "none";
        document.getElementById("delete-calendar").style.display = "block";
        document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">USUŃ KALENDARZ</span>`;
    }
}

//przełączanie pomiędzy kalendarzami
document.getElementById("calendars").addEventListener("click",function(e) {
    let selected = e.target;
    for (var i = 0, len = calendars.length; i < len; i++) {
        if (selected.tagName == "LI" && selected.id != "+" && selected.id != "-") {
            if(selected && selected == calendars[i]) {
                calendars[i].style.background = "white";
                showCalendar(selected.id, selected.getAttribute("name"));
            }
            else {
                calendars[i].style.background = "#00FF94";
            }
        }
    }
});

//wyświetlanie okna tworzenia nowych wydarzeń i zadań
function showEventWindow(x) {
    $("#EventWindow").fadeIn(250);
    document.getElementById("EventsWindow").style.display = "none";
    document.getElementById("wydarzenie-form").style.display = "block";
    document.getElementById("update-wydarzenie-form").style.display = "none";
    document.getElementById("update-zadanie-form").style.display = "none";
    document.getElementById("zadanie-form").style.display = "none";
    document.getElementById("udostepnij-form").style.display = "none";
    document.getElementById("create-calendar").style.display = "none";
    document.getElementById("delete-calendar").style.display = "none";
    document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">NOWE WYDARZENIE</span> / <span id="event-label-second" onClick="displayOtherForm(1)">ZADANIE</span>`;
    if (x == 1){
        document.getElementById("data").value = "";
        document.getElementById("EventWindow").style.display = "flex";
    }
    else if (x == 2) {
        document.getElementById("eventLabel").innerHTML = `<span id="event-label-first">NOWE WYDARZENIE</span> / <span id="event-label-second" onClick="displayOtherForm(2)">ZADANIE</span>`;
        let EventYear = date.getFullYear();
        let EventMonth = (date.getMonth()+1)
        let EventDay = date.getDate();
        if (EventMonth < 10){
            EventMonth = "0" + EventMonth;
        }
        if (EventDay < 10){
            EventDay = "0" + EventDay;
        }  
        document.getElementById("data").value = EventYear  + "-" + EventMonth + "-" + EventDay;
    }
    document.getElementById("eventLabel").style.textAlign = "left";
    document.getElementById("event-label-first").style.marginRight = "0px";
    document.getElementById("EventWindow").style.display = "flex";
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

//ukrywanie okna zdarzeń
function hideEventWindow() {
    $("#EventWindow").fadeOut(250);
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
    document.getElementsByClassName("EventPanel")[0].getElementsByClassName("gradientBox")[0].style.display = "none";
}

//włączenie cykliczności wydarzenia
function enableCycle(x) {
    if (x == '1'){
        document.getElementById("tydzien").disabled = false;
        document.getElementById("miesiac").disabled = false;
        document.getElementById("rok").disabled = false; 
        document.getElementById("miesiac").checked = true;
        document.getElementById("tydzien-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("miesiac-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("rok-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("tydzien-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("miesiac-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("rok-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("tydzien-label").style.cursor = "pointer";
        document.getElementById("miesiac-label").style.cursor = "pointer";
        document.getElementById("rok-label").style.cursor = "pointer";
        document.getElementById("cycleCount").value = "";
        document.getElementById("cycleCount").disabled = false;


    }
    if (x == '2'){
        document.getElementById("Utydzien").disabled = false;
        document.getElementById("Umiesiac").disabled = false;
        document.getElementById("Urok").disabled = false; 
        document.getElementById("Umiesiac").checked = true;
        document.getElementById("Utydzien-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("Umiesiac-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("Urok-label").style.borderColor = "rgba(0, 255, 148, 1)";
        document.getElementById("Utydzien-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("Umiesiac-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("Urok-label").style.color = "rgba(0, 0, 0, 1)";
        document.getElementById("Utydzien-label").style.cursor = "pointer";
        document.getElementById("Umiesiac-label").style.cursor = "pointer";
        document.getElementById("Urok-label").style.cursor = "pointer";
    }
    
}

//wyłączenie cykliczności wydarzenia
function disableCycle(x) {
    if (x == '1'){
        document.getElementById("cycleCount").value = "0";
        document.getElementById("cycleCount").disabled = true;
        document.getElementById("tydzien").disabled = true;
        document.getElementById("miesiac").disabled = true;
        document.getElementById("rok").disabled = true; 
        document.getElementById("tydzien").checked = false;
        document.getElementById("miesiac").checked = false;
        document.getElementById("rok").checked = false;
        document.getElementById("tydzien-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("miesiac-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("rok-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("tydzien-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("miesiac-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("rok-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("tydzien-label").style.cursor = "default";
        document.getElementById("miesiac-label").style.cursor = "default";
        document.getElementById("rok-label").style.cursor = "default";
    }
    if (x == '2'){
        document.getElementById("Utydzien").disabled = true;
        document.getElementById("Umiesiac").disabled = true;
        document.getElementById("Urok").disabled = true; 
        document.getElementById("Utydzien").checked = false;
        document.getElementById("Umiesiac").checked = false;
        document.getElementById("Urok").checked = false;
        document.getElementById("Utydzien-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("Umiesiac-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("Urok-label").style.borderColor = "rgba(0, 255, 148, 0.3)";
        document.getElementById("Utydzien-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("Umiesiac-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("Urok-label").style.color = "rgba(0, 0, 0, 0.3)";
        document.getElementById("Utydzien-label").style.cursor = "default";
        document.getElementById("Umiesiac-label").style.cursor = "default";
        document.getElementById("Urok-label").style.cursor = "default";
    } 
}

//przełączenie pomiędzy formularzem tworzenia wydarzeń i zadań
function displayOtherForm(num) {
    var x = document.getElementById("zadanie-form");
    var y = document.getElementById("wydarzenie-form");
    if (x.style.display == "none") {
        y.style.display = "none";
        x.style.display = "block";
        document.getElementById("event-label-first").innerHTML = "NOWE ZADANIE";
        document.getElementById("event-label-second").innerHTML = "WYDARZENIE";
        if (num == 1){
            document.forms["zadanie-form"]["taskDate"].value = "";
        }
        else if (num == 2){
            let TaskYear = date.getFullYear();
            let TaskMonth = (date.getMonth()+1)
            let TaskDay = date.getDate();
            if (TaskMonth < 10){
                TaskMonth = "0" + TaskMonth;
            }
            if (TaskDay < 10){
                TaskDay = "0" + TaskDay;
            }  
            document.forms["zadanie-form"]["taskDate"].value = TaskYear  + "-" + TaskMonth + "-" + TaskDay;
        }
    } 
    else {
        x.style.display = "none";
        y.style.display = "block";
        document.getElementById("event-label-first").innerHTML = "NOWE WYDARZENIE";
        document.getElementById("event-label-second").innerHTML = "ZADANIE";
    }
}

//wyświetlanie lub ukrywanie okna twórców strony (tj. Karola Maciejskiego i Jakuba Szafryka)
function showAuthorsWindow() {
    $(".authorsWindow").fadeIn(250);
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
}

function hideAuthorsWindow() {
    $(".authorsWindow").fadeOut(250);
    document.getElementsByTagName("body")[0].style.overflowY = "scroll";
}

//wyświetlanie okna wszystkich zdarzeń danego kalendarza
function showAllWindow(){
    $("#EventWindow").fadeIn(250);
    document.getElementById("EventsWindow").scrollTo(0,0); 
    document.getElementsByClassName("EventPanel")[0].getElementsByClassName("gradientBox")[0].style.display = "block";
    document.getElementById("allWydarzenia").innerHTML = "";
    document.getElementById("allZadania").innerHTML = "";
    document.getElementById("allUdostepnione").innerHTML = "";
    document.getElementById("eventLabel").innerHTML = "WSZYSTKIE <span id='event-details' class='allSpan' style='border-color: #00FF94; border-radius: 50px;' onClick='allScroll(1)'>ㅤ</span><span id='event-details' class='allSpan' style='border-color: black; border-radius: 10px;' onClick='allScroll(2)'>ㅤ</span><span id='event-details' class='allSpan' style='background: black; border-color: black; border-radius: 50px;' onClick='allScroll(3)'>ㅤ</span><span id='event-details' class='allSpan' style='background: black; border-color: black; border-radius: 10px;' onClick='allScroll(3)'>ㅤ</span>";
    document.getElementById("EventWindow").style.display = "flex";
    document.getElementById("zadanie-form").style.display = "none";
    document.getElementById("wydarzenie-form").style.display = "none";  
    document.getElementById("update-wydarzenie-form").style.display = "none";
    document.getElementById("update-zadanie-form").style.display = "none";
    document.getElementById("udostepnij-form").style.display = "none";
    document.getElementById("create-calendar").style.display = "none";
    document.getElementById("delete-calendar").style.display = "none";
    document.getElementById("EventsWindow").style.display = "flex";
    document.getElementById("eventLabel").style.textAlign = "left";
    let udostepnione = new Array();
    if (window.wydarzenia.length != 0){
        for (let i = 0; i < window.wydarzenia.length;i++){
            if (window.wydarzenia[i][8] == window.user){
                dataWyd = new Date(window.wydarzenia[i][3]);
                dzienWyd = dataWyd.getDate();
                miesiacWyd = dataWyd.toLocaleDateString("pl-PL", {month:'long'}).toString();
                miesiacWyd = miesiacWyd[0].toUpperCase() + miesiacWyd.substring(1);
                rokWyd = dataWyd.getFullYear();
                okres = dataWyd - new Date();
                if (okres < 0){
                    document.getElementById("allWydarzenia").innerHTML += "<div class='itemAllE' style='opacity: 30%;' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)'><span id='event-details' style='border-color: "+window.wydarzenia[i][6]+";'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+window.wydarzenia[i][1]+"</span><span id='eventDesc'>"+window.wydarzenia[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+window.wydarzenia[i][6]+";'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+window.wydarzenia[i][6]+";'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO WYDARZENIA</p></div></div>";
                }
                else {
                    document.getElementById("allWydarzenia").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)'><span id='event-details' style='border-color: "+window.wydarzenia[i][6]+";'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+window.wydarzenia[i][1]+"</span><span id='eventDesc'>"+window.wydarzenia[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+window.wydarzenia[i][6]+";'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+window.wydarzenia[i][6]+";'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO WYDARZENIA</p></div></div>";
                }
            }
            else {
                udostepnione.push(window.wydarzenia[i]);
            }
        }
    }
    else {
        document.getElementById("allWydarzenia").innerHTML += "<div class='itemAllE' style='background: #00FF94;'>Brak wydarzeń</div>";
    }

    if (window.zadania.length != 0){
        for (let i = 0; i < window.zadania.length;i++){
            if (window.user == window.zadania[i][6]){
                dataWyd = new Date(window.zadania[i][3] + " " + window.zadania[i][4]);
                dzienWyd = dataWyd.getDate();
                miesiacWyd = dataWyd.toLocaleDateString("pl-PL", {month:'long'}).toString();
                miesiacWyd = miesiacWyd[0].toUpperCase() + miesiacWyd.substring(1);
                rokWyd = dataWyd.getFullYear();
                okres = dataWyd - new Date();
                if (okres < 0){
                    document.getElementById("allZadania").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-radius: 10px; border-color: #4da6ff; opacity: 30%;'><span id='event-details' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+window.zadania[i][1]+"</span><span id='eventDesc'>"+window.zadania[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO ZADANIA</p></div></div>";
                }
                else {
                    document.getElementById("allZadania").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-radius: 10px; border-color: #4da6ff;'><span id='event-details' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+window.zadania[i][1]+"</span><span id='eventDesc'>"+window.zadania[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+window.zadania[i][5]+"; border-radius: 10px;'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO ZADANIA</p></div></div>";
                }
            }
            else {
                udostepnione.push(window.zadania[i]);
            }
            
        }
    }
    else {
        document.getElementById("allZadania").innerHTML += "<div class='itemAllE' style='background: #00FF94;'>Brak zadań</div>";
    }

    udostepnione.sort(function(a, b)
    {
        return new Date(a[3]+" "+a[4]) - new Date(b[3]+" "+b[4]);
    });

    if (udostepnione.length != 0){
        for (let i = 0; i < udostepnione.length;i++){
            dataWyd = new Date(udostepnione[i][3]);
            dzienWyd = dataWyd.getDate();
            miesiacWyd = dataWyd.toLocaleDateString("pl-PL", {month:'long'}).toString();
            miesiacWyd = miesiacWyd[0].toUpperCase() + miesiacWyd.substring(1);
            rokWyd = dataWyd.getFullYear();
            okres = dataWyd - new Date();
            if (udostepnione[i][8] == null){
                if (okres < 0){
                    document.getElementById("allUdostepnione").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-color: #ff4d4d; border-radius: 10px; opacity: 30%;'><span id='event-details' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+udostepnione[i][1]+"</span><span id='eventDesc'>"+udostepnione[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+rokWyd+"</span></div><div id='event-overlay' style='border-radius: 0px;'><p>KLIKNIJ, ABY PRZEJŚĆ DO UDOSTĘPNIONEGO ZADANIA</p></div></div>";
                }
                else {
                    document.getElementById("allUdostepnione").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-color: #ff4d4d; border-radius: 10px;'><span id='event-details' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+udostepnione[i][1]+"</span><span id='eventDesc'>"+udostepnione[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+udostepnione[i][5]+"; background: "+udostepnione[i][5]+"; border-radius: 10px;'>"+rokWyd+"</span></div><div id='event-overlay' style='border-radius: 0px;'><p>KLIKNIJ, ABY PRZEJŚĆ DO UDOSTĘPNIONEGO ZADANIA</p></div></div>";
                }
                
            }
            else {
                if (okres < 0){
                    document.getElementById("allUdostepnione").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-color: #ff4d4d; opacity: 30%;'><span id='event-details' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+"; '>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+udostepnione[i][1]+"</span><span id='eventDesc'>"+udostepnione[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+";'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+";'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO UDOSTĘPNIONEGO WYDARZENIA</p></div></div>";
                }
                else {
                    document.getElementById("allUdostepnione").innerHTML += "<div class='itemAllE' onClick='showWeekDay(`"+dzienWyd+"`,`"+dataWyd.getMonth()+"`)' style='border-color: #ff4d4d;'><span id='event-details' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+";'>"+dzienWyd+"</span><div class='all-details'><span id='eventTitle'>"+udostepnione[i][1]+"</span><span id='eventDesc'>"+udostepnione[i][2]+"</span></div><div id='allEventDetails'><span id='miesiac-detail' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+";'>"+miesiacWyd+"</span><span id='rok-detail' style='border-color: "+udostepnione[i][6]+"; background: "+udostepnione[i][6]+";'>"+rokWyd+"</span></div><div id='event-overlay'><p>KLIKNIJ, ABY PRZEJŚĆ DO UDOSTĘPNIONEGO WYDARZENIA</p></div></div>";
                }
            }
        }
        document.getElementById("allUdostepnione").innerHTML += "<div class='all-bottom'></div>";
    }
    else {
        document.getElementById("allUdostepnione").innerHTML += "<div class='itemAllE' style='background: #00FF94;'>Brak udostępnionych</div>";
    }
    document.getElementsByTagName("body")[0].style.overflowY = "hidden";
    allHeights.push(document.getElementById('zadAll').getBoundingClientRect().top,document.getElementById('udosAll').getBoundingClientRect().top);
}

const date = new Date();

//przełączenie ikonek w oknie wszystkich zdarzeń
function allScroll(x){
    switch (x){
        case 1:
            document.getElementById("EventsWindow").scrollTop = 0;
            break; 
        case 2:
            document.getElementById("EventsWindow").scrollTop = (allHeights[0]-74);
            break;
        case 3:
            document.getElementById("EventsWindow").scrollTop = (allHeights[1]-74);
            break;
    }
}

const divA = document.getElementById("udosAll");
const divB = document.getElementById("zadAll");

function onScrollHandler() {
    if (divB.getBoundingClientRect().top == 74 && divA.getBoundingClientRect().top != 74){
        document.getElementsByTagName('span')[0].style.borderColor = "black";
        document.getElementsByTagName('span')[1].style.borderColor = "#0085FF";
        document.getElementsByTagName('span')[2].style.borderColor = "black";
        document.getElementsByTagName('span')[3].style.borderColor = "black";
        document.getElementsByTagName('span')[2].style.background= "black";
        document.getElementsByTagName('span')[3].style.background = "black";
    }
    else if (divA.getBoundingClientRect().top == 74){
        document.getElementsByTagName('span')[0].style.borderColor = "black";
        document.getElementsByTagName('span')[1].style.borderColor = "black";
        document.getElementsByTagName('span')[2].style.borderColor = "#ff4d4d";
        document.getElementsByTagName('span')[3].style.borderColor = "#ff4d4d";
        document.getElementsByTagName('span')[2].style.background= "#ff4d4d";
        document.getElementsByTagName('span')[3].style.background = "#ff4d4d";
    }
    else {
        document.getElementsByTagName('span')[0].style.borderColor = "#00FF94";
        document.getElementsByTagName('span')[1].style.borderColor = "black";
        document.getElementsByTagName('span')[2].style.borderColor = "black";
        document.getElementsByTagName('span')[3].style.borderColor = "black";
        document.getElementsByTagName('span')[2].style.background= "black";
        document.getElementsByTagName('span')[3].style.background = "black";
    }
}

document.getElementById("EventsWindow").addEventListener('scroll', onScrollHandler);

//wyświetlanie nadchodzących wydarzeń dla danego użytkownika
function showWydarzenia(user){
    document.getElementById("event-list").innerHTML = "";
    let dataWyd;
    let ilosc = 0;
    window.wydarzenia.sort(function(a, b)
    {
        return new Date(a[3]+" "+a[4]) - new Date(b[3]+" "+b[4]);
    });
    window.zadania.sort(function(a, b)
    {
        return new Date(a[3]+" "+a[4]) - new Date(b[3]+" "+b[4]);
    });
    window.wszystkie = window.wydarzenia.concat(window.zadania);
    window.wszystkie.sort(function(a, b)
    {
         return new Date(a[3]+" "+a[4]) - new Date(b[3]+" "+b[4]);
    });
    rokLayout(new Date());
    for (let i = 0; i < window.wszystkie.length;i++){
        dataWyd = new Date(window.wszystkie[i][3]+" "+window.wszystkie[i][4]);
        dzienWyd = dataWyd.getDate();
        rokWyd = dataWyd.getFullYear();
        miesiacWyd = dataWyd.toLocaleDateString("pl-PL", {month:'long'}).toString();
        miesiacWyd = miesiacWyd[0].toUpperCase() + miesiacWyd.substring(1);
        okres = dataWyd - new Date();
        if (rokWyd == date.getFullYear() && ilosc < 3 && okres >= 0){
            if (window.wszystkie[i][8] == null){
                if (user == window.wszystkie[i][6]){
                    document.getElementById("event-list").innerHTML += "<p><span id='event-details' style='border-color: "+window.wszystkie[i][5]+"; border-radius: 10px;'>"+dzienWyd+"</span>"+miesiacWyd+" - "+window.wszystkie[i][1]+"<span id='event-hour' style='float: right;'>"+window.wszystkie[i][4].slice(0, -3)+"</span></p>";
                }
                else {
                    document.getElementById("event-list").innerHTML += "<p><span id='event-details' style='border-color: "+window.wszystkie[i][5]+"; border-radius: 10px; background: "+window.wszystkie[i][5]+";'>"+dzienWyd+"</span>"+miesiacWyd+" - "+window.wszystkie[i][1]+"<span id='event-hour' style='float: right;'>"+window.wszystkie[i][4].slice(0, -3)+"</span></p>";
                }
            }
            else {
                if (user == window.wszystkie[i][8]){
                    document.getElementById("event-list").innerHTML += "<p><span id='event-details' style='border-color: "+window.wszystkie[i][6]+";'>"+dzienWyd+"</span>"+miesiacWyd+" - "+window.wszystkie[i][1]+"<span id='event-hour' style='float: right;'>"+window.wszystkie[i][4].slice(0, -3)+"</span></p>";
                }
                else {
                    document.getElementById("event-list").innerHTML += "<p><span id='event-details' style='border-color: "+window.wszystkie[i][6]+"; background: "+window.wszystkie[i][6]+";'>"+dzienWyd+"</span>"+miesiacWyd+" - "+window.wszystkie[i][1]+"<span id='event-hour' style='float: right;'>"+window.wszystkie[i][4].slice(0, -3)+"</span></p>";
                }
            }
            ilosc += 1;
        }
        else if (rokWyd == date.getFullYear() && ilosc >= 3){
            ilosc += 1;
        }
    }
    if (ilosc > 3){
        document.getElementById("event-list").innerHTML += "<p style='background: #00FF94; margin: 5px 0 15px 0; padding: 10px; border-radius: 50px;'>+ "+(ilosc-3)+" Wydarzenia / Zadania</p>";
    }
    else if (ilosc == 0){
        document.getElementById("event-list").innerHTML += "<p style='background: #00FF94; margin: 5px 0 15px 0; padding: 10px; border-radius: 50px;'> Brak wydarzeń / zadań</p>";
    }
}

//wyłączenie przycisków, gdy użytkownik nie jest zalogowany
function disableSwitch(x) {
    if (x == 0){
        $(':button').prop('disabled', false);
        document.getElementsByClassName('calendarList')[0].style.display = "flex";
    }
    else if (x == 1){
        $(':button').prop('disabled', true);
        document.getElementsByClassName('calendarList')[0].style.display = "none";
        $('button[class^="previous"]').prop('disabled', false);
        $('button[class^="next"]').prop('disabled', false);
        $('button[id^="authors"]').prop('disabled', false);
        $('button[id^="x"]').prop('disabled', false);
    }
    
}

//zapisywanie strony do pliku pdf (brak możliwości dodania styli i kodowania UTF-8)
var doc = new jsPDF();

 function saveDiv() {
 doc.fromHTML(`<html><head ><title>Kalendarz</title><link href="lib/style.css" rel="stylesheet" type="text/css" ></head><body>` + document.getElementsByClassName("calendar")[0].innerHTML + `</body></html>`);
 doc.save('kalendarz.pdf');
 doc = new jsPDF();
}

window.onload = rokLayout(new Date());