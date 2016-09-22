$(document).ready(function() {
    $("#openModal").fadeTo(500, 1);
    
    $('#openModal .close').click(function() {
    	$('#openModal').fadeOut('slow');
    });
});

function check(form) {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/logon";
	xmlHttp.open('POST',url,true);
	//xmlHttp.send(null);
	xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	    		var login = xmlHttp.responseText;
	    		
	    		if (login == "true") {
	    			window.location = "./welcome.html";
	    			//parent.postMessage("welcome.html","./login.html"); //Sends message to parent frame
	    		}
	    		else {
	    			alert("Error Password or Username")
	    		}
	    	}
	    }
	};
	
	var json = {
			'UserId' : form.login.value,
			'Password' : form.password.value,
			'Logon' : "login",
	};
	
	xmlHttp.send(JSON.stringify(json));
	
	/*
	if(form.login.value == "1" && form.password.value == "9999") {
		sessionStorage.setItem("login", "true");
		parent.postMessage("welcome.html","./login.html"); //Sends message to parent frame
	}
	else {
		alert("Error Password or Username")
	}
	*/
}

