let layouts = document.querySelectorAll("li");

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

function rokLayout(date){
    var currentYear = document.querySelector("#labelA");
    var currentCentury = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    let month = today.getMonth();
    var labelA = date.toLocaleDateString("pl-PL", {year:'numeric'}).toString();
    currentYear.innerHTML = "<button class='previous' onclick='previousDate()' value='1'><</button> Rok " + labelA + " <button class='next' onclick='nextDate()' value='1'>></button>";
    currentCentury.innerHTML = "XXI wiek";
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

function miesiacLayout(date){
    var currentMonth = document.querySelector("#labelA");
    var currentYear = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    var labelA = date.toLocaleDateString("pl-PL", {month:'long'}).toString();
    currentMonth.innerHTML = "<button class='previous' onclick='previousDate()' value='2'><</button> " + labelA[0].toUpperCase() + labelA.substring(1) + " <button class='next' onclick='nextDate()' value='2'>></button>";
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
            calendarDays.innerHTML += `<div class='item-miesiac-other' onClick='showMonthDay(${day})'>${prevLastDay+i-startWeekDay}</div>`;
        }else if(i <= startWeekDay+totalMonthDay){
            // adding this month days
            currentday.setDate(day);
            let dayClass = currentday.getTime()===today.getTime() ? 'current-day' : 'month-day';
            if (today.getDate() == day && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()){
                calendarDays.innerHTML += `<div class='item-miesiac' id='selected' onClick='showMonthDay(${day})'>${day}</div>`;
            }
            else{
                calendarDays.innerHTML += `<div class='item-miesiac' onClick='showMonthDay(${day})'>${day}</div>`;
            }
        }else{
            // adding next month days
            calendarDays.innerHTML += `<div class='item-miesiac-other' onClick='showMonthDay(${day})'>${day-totalMonthDay}</div>`;
        }    
    }
    upDate();
}

function tydzienLayout(date){
    var currentWeek = document.querySelector("#labelA");
    var currentMonth = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    var weekdays = new Date(date);
    //var dayNum = weekdays.getDay() || 7;
    weekdays.setDate(date.getDate() - 1);
    var yearStart = new Date(date.getFullYear(),0,1);
    var labelA = Math.ceil((((date - yearStart) / 86400000) + 1)/7);
    currentWeek.innerHTML = "<button class='previous' onclick='previousDate()' value='3'><</button> Tydzień " + labelA + " <button class='next' onclick='nextDate()' value='3'>></button>";
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
            calendarDays.innerHTML += `<div class='item-tydzien' onClick='showWeekDay(${weekDays[i].getDate()},${weekDays[i].getMonth()})'><span class='tydzien-number'>${weekDays[i].getDate()}</span><span class='tydzien-name'>${week[i]}</span></div>`;
        }
    }
    upDate();
}

function dzienLayout(date){
    var currentDay = document.querySelector("#labelA");
    var currentMonth = document.querySelector("#labelB");
    var calendarDays = document.querySelector(".grid");
    var today = new Date();
    var day = date;
    currentDay.innerHTML = "<button class='previous' onclick='previousDate()' value='4'><</button> Dzień " + day.getDate() + " <button class='next' onclick='nextDate()' value='4'>></button>";
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
            document.getElementsByClassName("item-dzien")[0].innerHTML += `<div class="item-dzien-header">${week[i]}</div><div class="wyd-wrap"><div id="wyd-items"><div class="wyd-item"><div class="wyd-color"></div><p>Wizyta u lekarza - 14:00</p></div></div><div class="btn-wrap"><button onClick='showEventWindow()'>NOWE WYDARZENIE</button></div></div>`;
        }
    }
    for (i = 0; i < wydarzenia.length; i++){
        dataWyd = new Date(wydarzenia[i].data_roz);
        dzienWyd = dataWyd.getDate();
        if (wydarzenia[i].dzienWyd = date.getDate()){
            document.getElementById("wyd-items").innerHTML += "";
        }
    }
    upDate();
}

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

function showMonth(value){
    document.getElementsByTagName('li')[0].style.color = "#00FF94";
    document.getElementsByTagName('li')[1].style.color = "white";
    date.setMonth(value);
    miesiacLayout(date);
}

function showMonthDay(value){
    document.getElementsByTagName('li')[1].style.color = "#00FF94";
    document.getElementsByTagName('li')[3].style.color = "white";
    date.setDate(value);
    dzienLayout(date);
}

function showWeekDay(value, month){
    document.getElementsByTagName('li')[2].style.color = "#00FF94";
    document.getElementsByTagName('li')[3].style.color = "white";
    date.setMonth(month);
    date.setDate(value);
    dzienLayout(date);
}

function upDate() {
    document.getElementById("curDate").innerHTML = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
}

function showEventWindow() {
    document.getElementById("EventWindow").style.display = "flex";
}

function hideEventWindow() {
    document.getElementById("EventWindow").style.display = "none";
}

function enableCycle() {
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
}

function disableCycle() {
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

function displayOtherForm() {
    var x = document.getElementById("zadanie-form");
    var y = document.getElementById("wydarzenie-form");
    if (x.style.display == "none") {
        y.style.display = "none";
        x.style.display = "block";
        document.getElementById("event-label-first").innerHTML = "NOWE ZADANIE";
        document.getElementById("event-label-second").innerHTML = "WYDARZENIE";
    } 
    else {
        x.style.display = "none";
        y.style.display = "block";
        document.getElementById("event-label-first").innerHTML = "NOWE WYDARZENIE";
        document.getElementById("event-label-second").innerHTML = "ZADANIE";
    }
}

const date = new Date();
const wydarzenia = new Array();

window.addEventListener('load', rokLayout(new Date()));

class Wydarzenie {
    constructor(godz_roz, data, godz_zak, tytul, opis, kolor, cyklicznosc){
        this.godz_roz = godz_roz;
        this.data = data;
        this.godz_zak = godz_zak;
        this.tytul = tytul;
        this.opis = opis;
        this.kolor = kolor;
        this.cyklicznosc = cyklicznosc;
    }
    WypiszDane(){

    }
}

function newWydarzenie() {
    let godz_roz = document.getElementById("godz-roz").value;
    let data = document.getElementById("data").value;
    let godz_zak = document.getElementById("godz-zak").value;
    let tytul = document.getElementById("tytul").value;
    let opis = document.getElementById("opis").value;
    let kolor = document.querySelector('input[name="kolor-wyd"]:checked').value;
    let cyklicznosc;

    if (document.querySelector('input[name="cyklicznosc"]:checked').value == "0"){
        cyklicznosc = document.querySelector('input[name="czestotliwosc"]:checked').value;
        
    }
    else {
        cyklicznosc = document.querySelector('input[name="cyklicznosc"]:checked').value;
    }

    let wydarzenie = new Wydarzenie(godz_roz,data,godz_zak,tytul,opis,kolor,cyklicznosc);
    wydarzenia.push(wydarzenie);
    showWydarzenia();
    console.log(wydarzenia[0]);
}

function showWydarzenia(){
    let dataWyd;
    document.getElementById("event-list").innerHTML = "";
    for (let i = 0; i < wydarzenia.length;i++){
        dataWyd = new Date(wydarzenia[i].data_roz);
        dzienWyd = dataWyd.getDate();
        miesiacWyd = dataWyd.toLocaleDateString("pl-PL", {month:'long'}).toString();
        miesiacWyd = miesiacWyd[0].toUpperCase() + miesiacWyd.substring(1);
        document.getElementById("event-list").innerHTML += "<p><span style='border-color: "+wydarzenia[i].kolor+"'>"+dzienWyd+"</span>"+miesiacWyd+" - "+wydarzenia[i].tytul+"</p>";
    }
}
