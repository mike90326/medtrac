for (var i=1; i < 6; i++) {
	if (localStorage.getItem("startdatetime"+i) !== null) {
		
		document.getElementById('time_'+i).textContent = localStorage.getItem("startdatetime"+i);
	}
	if (localStorage.getItem("temperature"+i) !== null) {
		if (localStorage.getItem("temperature"+i) == "Error") {
			document.getElementById('temp_'+i).textContent = "NA";
		}
		else {
			document.getElementById('temp_'+i).textContent = localStorage.getItem("temperature"+i);
		}
	}
	if (localStorage.getItem("bphigh"+i) !== null) {
		if (localStorage.getItem("bphigh"+i) == "Error") {
			document.getElementById('bph_'+i).textContent = "NA";
		}
		else {
			document.getElementById('bph_'+i).textContent = localStorage.getItem("bphigh"+i);
		}
	}
	if (localStorage.getItem("bplow"+i) !== null) {
		if (localStorage.getItem("bplow"+i) == "Error") {
			document.getElementById('bpl_'+i).textContent = "NA";
		}
		else {
			document.getElementById('bpl_'+i).textContent = localStorage.getItem("bplow"+i);
		}
	}
	if (localStorage.getItem("pulse"+i) !== null) {
		if (localStorage.getItem("pulse"+i) == "Error") {
			document.getElementById('pulse_'+i).textContent = "NA";
		}
		else {
			document.getElementById('pulse_'+i).textContent = localStorage.getItem("pulse"+i);
		}
	}
	if (window.parent.localStorage.getItem("spo2"+i) !== null) {
		if (localStorage.getItem("spo2"+i) == "Error") {
			document.getElementById('spo2_'+i).textContent = "NA";
		}
		else {
			document.getElementById('spo2_'+i).textContent = localStorage.getItem("spo2"+i);
		}
	}
}


function start_room_1(){

	// Show loading gif
	var div = document.createElement('div');
	div.setAttribute("class","loading");
    var img = document.createElement('img');
    img.src = 'images/waiting.gif';
    div.innerHTML = "<span class='loading_inner'>Sending Command to Medbox(s)</span><br />";
    div.appendChild(img);
    document.body.appendChild(div);
	//clear the table
	for (var i = 1; i < 6; i++) 
	{	document.getElementById("time_"+i).textContent = "";
		document.getElementById("temp_"+i).textContent = "";
		document.getElementById("bph_"+i).textContent = "";
		document.getElementById("bpl_"+i).textContent = "";
        document.getElementById("pulse_"+i).textContent = "";
		document.getElementById("spo2_"+i).textContent = "";
    }
	xmlHttp = new XMLHttpRequest;
	
	var url = "./resources/manualmonitor?room=1";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
        		document.body.removeChild(div);
        		alert(xmlHttp.responseText);
            }
            else {
                alert("Error ->" + xmlHttp.responseText);
            }
        }
    };
}

/*function start_room_2(){

	// Show loading gif
	var div = document.createElement('div');
	div.setAttribute("class","loading");
    var img = document.createElement('img');
    img.src = 'images/waiting.gif';
    div.innerHTML = "<span class='loading_inner'>Sending Command to Medbox(s)</span><br />";
    div.appendChild(img);
    document.body.appendChild(div);
    
	xmlHttp = new XMLHttpRequest;
	
	var url = "./resources/manualmonitor?room=2";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
        		document.body.removeChild(div);
        		alert(xmlHttp.responseText);
            }
            else {
                alert("Error ->" + xmlHttp.responseText);
            }
        }
    };
}

function start_room_3(){

	// Show loading gif
	var div = document.createElement('div');
	div.setAttribute("class","loading");
    var img = document.createElement('img');
    img.src = 'images/waiting.gif';
    div.innerHTML = "<span class='loading_inner'>Sending Command to Medbox(s)</span><br />";
    div.appendChild(img);
    document.body.appendChild(div);
    
	xmlHttp = new XMLHttpRequest;
	
	var url = "./resources/manualmonitor?room=3";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
        		document.body.removeChild(div);
        		alert(xmlHttp.responseText);
            }
            else {
                alert("Error ->" + xmlHttp.responseText);
            }
        }
    };
}
*/