"use strict";
function editable() {
    document.getElementById("editable").focus();
}

function codetext() {
    document.getElementById("command").innerHTML = "<p class='command'>usr@invited:~</p> $";
}

function giveninput(event) {
    if (event.which === 13 || event.keyCode === 13) {
        var topdata = document.getElementById("start").innerHTML + document.getElementById("command").innerHTML;
        var getresultfor = document.getElementById("editable").innerText;
        getresultfor = getresultfor.slice(0, -2);
        document.getElementById("editable").innerHTML = '';
        document.getElementById("start").innerHTML = topdata + getresultfor + "<br>";
        insertresult(getresultfor);
        editable();
        console.log('stop looking in the console bitch')
    }
}

function showresult(insertdata) {
    var topdata = document.getElementById("start").innerHTML;
    document.getElementById("start").innerHTML = topdata + insertdata;
}

function insertresult(result) {
    if(result === "") {
        return;
    }

    if(result === 'help') {
        showresult("This is an invitation to a secret murder mystery party. shhhh... Type 'accept' or 'decline'.<br>");
        return;
    }

    if(result === 'reset') {
        document.location.reload(); 
        return;
    }

    if(result.includes("what is this")) {
        showresult("This is an invitation to a secret murder mystery party. shhhh... Type 'accept' or 'decline'.<br>");
        return;
    }

    if(result === 'accept') {
        showresult("You have chosen to attend the secret murder mystery party. Please enter your email to confirm.<br>");
        return;
    }

    if (result.includes('@')) {
        sendEmail(result);
        showresult("Prepare yourself... Type 'details' to learn more.<br>");
        return;
    }
    
    if(result === 'decline') {
        showresult("We're sorry you can't make it. If you change your mind, type 'accept' to join the mystery.<br>");
        return;
    }
    
    if(result === 'details') {
        showresult("The party is on October 19th, at 7:00 PM. Location: 382 cherry street.<br> Dress code: will be given to you.<br> Keep an eye out for further instructions...<br> Goodbye <br>");
        document.getElementById("editable").contentEditable = "false"; // Disable further editing
        setTimeout(() => {
            window.close(); // Close the tab after 5 seconds
        }, 7000);
        return;
    }
    

    showresult(": command not found.<br>");
    return;
}

function sendEmail(email) {
    emailjs.init("DIM8jR8EEcgu3bSBV");
    emailjs.send("service_otwmdld", "template_se0fl3c", {
        to_name: email,
    })
    .then(function(response) {
        console.log('Success!', response.status, response.text);
    }, function(error) {
        console.error('Failed...', error);
    });
}