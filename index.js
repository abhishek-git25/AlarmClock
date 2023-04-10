var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var setTime = document.getElementById('alarmtime');
var getMessage = document.getElementById('alarmmessage');
var ring = document.getElementById("ringtime");
var alarmListContainer = document.getElementById('alarm-list');
let alarmList = [];
var element = document.querySelectorAll('alarms')
// var turnOfAlarm = document.getElementById('turnofAlarm');
var showAlarm = document.getElementById('showAlarm');
var music = new Audio('alarm_clock_old.mp3');
var alarmDisplay = document.getElementById('alarm-display');
var messageDisplay = document.getElementById('display-message');
var alarmid = document.getElementById('alarm-id');
var alarmStatus = true;
var currentTime = new Date();




// console.log(getCurrentTime());


ctx.strokeStyle = '#00ffff';
ctx.lineWidth = 5;
ctx.shadowBlur = 10;
ctx.shadowColor = '#00ffff'

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

function renderTime() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);
    //Background
    gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 300);
    gradient.addColorStop(1, "#03303a");
    gradient.addColorStop(0, "black");
    ctx.fillStyle = gradient;
    ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
    ctx.fillRect(0, 0, 500, 500);
    //Hours
    ctx.beginPath();
    ctx.arc(250, 250, 200, degToRad(270), degToRad((hrs * 30) - 90));
    ctx.stroke();
    //Minutes
    ctx.beginPath();
    ctx.arc(250, 250, 170, degToRad(270), degToRad((smoothmin * 6) - 90));
    ctx.stroke();
    //Seconds
    ctx.beginPath();
    ctx.arc(250, 250, 140, degToRad(270), degToRad((smoothsec * 6) - 90));
    ctx.stroke();
    //Date
    ctx.font = "25px Helvetica";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    ctx.fillText(today, 175, 250);
    //Time
    ctx.font = "25px Helvetica Bold";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)';
    ctx.fillText(time, 175, 280);

}
setInterval(renderTime, 40);

function audioPlay() {
    music.play();
}



function stopAlarm() {
    alarmList.map((item) => {
        console.log(item.id);
        if (item.id == alarmid.value) {
            deleteAlarm(alarmid.value)
            music.pause()
            modal2.style.display = "none";
        }
    })
}

function getCurrentTime() {
    let hours = currentTime.getHours();
    let mins = currentTime.getMinutes()
    let time;
    if (mins < 10) {
        time = hours + ":"+ "0" + mins;
    } else {
        time = hours + ":" + mins;
    }
    return time;
}






// console.log(getCurrentTime());

function addAlarms(alarms) {
    const li = document.createElement('li');
    li.innerHTML = `<div id="${alarms.id}" class="alarms">
    <span style ="color : white">${alarms.time}</span>
    <span style="margin : 4px 0 5px 10px" class="delete" onclick = "deleteAlarm(${alarms.id})"><i class="fa fa-trash" style="font-size: 18px;color: #00ffff;"></i></span><br/>
    <span style = "color : white">${alarms.message}</span>
    </div>`
    alarmListContainer.append(li);
    li.style.textAlign = "center"
    li.style.marginRight = "24px";
    // console.log(element);
}

function ringAlarm() {
    let d = new Date(); // for now
    d = d.getHours() + ":" + d.getMinutes();

    alarmList.map(function (item) {

        if (d === item.time) {
            console.log(item.id);

            audioPlay();
            showAlarm.style.display = 'block';
            alarmDisplay.innerHTML = item.time;
            messageDisplay.innerHTML = item.message;
            alarmid.value = item.id;
        }
    })
}



function deleteAlarm(id) {
    const newAlarm = alarmList.filter(function (alarms) {
        return alarms.id != id;
    })
    alarmList = newAlarm;
    renderAlarms();
}



function renderAlarms() {
    alarmListContainer.innerHTML = " ";
    for (let i = 0; i < alarmList.length; i++) {
        addAlarms(alarmList[i]);
    }
}



var modal = document.getElementById("myModal");
// Get the button that opens the modal
var setAlarm = document.getElementById("setalarm");
// Get the <span> element that closes the modal
var closebtn = document.getElementById("closemodal");

var closeBtn2 = document.getElementById('closemodal2')

var modal2 = document.getElementById('showAlarm');
// When the user clicks the button, open the modal 
setAlarm.onclick = function () {
    modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
closebtn.onclick = function () {
    modal.style.display = "none";
}

closeBtn2.onclick = function () {
    modal2.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



function handleAlarm() {
    if (!setTime.value) {
        alert("Please enter alarm time first");
        return;
    }
    let id = Date.now();
    let alarmDetails = {
        time: setTime.value,
        message: getMessage.value,
        id: id
    }
    alarmList.push(alarmDetails)


    modal.style.display = "none";
    renderAlarms();
}




// turnOfAlarm.addEventListener('click' ,function(){ 
//     music.pause();
//     alarmStatus = false;
// })


document.getElementById('alarmtime').addEventListener('change' , function(event){
    console.log(event.target.value);
    if(event.target.value < getCurrentTime()){
        alert("Invalid Time")
        event.target.value = "";
    }
})

console.log(getCurrentTime());

setInterval(() => {
    if (alarmList.length > 0) {
        ringAlarm();
    }
}, 1000)

// clearInterval(() => {
//     if (alarmList.length < 1) {
//         ringAlarm();
//     }
// })
    // if(alarmList.length < 1){
    //     clearInterval(interval)
    // }


//  document.addEventListener('load' , interval)



// ringAlarm()






