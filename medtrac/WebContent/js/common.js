var elem = document.getElementById('welcome');
if (elem) {
	check_login();
}
//if (elem) {
//	get_medbox_status();
//}

function check_login() {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	//var url = "./resources/logon";
	var url = "./resources/logon";
	xmlHttp.open('GET',url,true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	        	var login = xmlHttp.responseText;
	
	        	if (login == "false") {
	        		//window.location = "./login.html";
					window.location = "./login.html";
	        	}
	        	if (login == "true") {
	        		// should be fine to do nothing
	        	}
	    	}
	    }
	    //else {
	    //	alert("Error ->" + xmlHttp.responseText);
	    //}
	      
	};
}

function get_medbox_status(){
	
	// Show loading gif
	var div = document.createElement('div');
	div.setAttribute("class","loading");
    var img = document.createElement('img');
    img.src = 'images/waiting.gif';
    div.innerHTML = "<span class='loading_inner'>Getting Medbox Status</span><br />";
    div.appendChild(img);
    document.body.appendChild(div);
	
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	//var url = "./resources/medbox/status";
	var url = "./resources/medbox/status";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 	200) {
            	var xmldoc = xmlHttp.responseXML;
            	var l = 0;
            	document.body.removeChild(div);
            	// Clear the table
            	for (var j = 1; j < 6; j++) {
	    			localStorage.setItem("ipaddr"+j, "");
	    			localStorage.setItem("tcp"+j, "");
	    			localStorage.setItem("bpsens"+j, "");
	    			localStorage.setItem("o2sens"+j, "");
	    			localStorage.setItem("tempsens"+j, "");
	    			var elem1 = document.getElementById('medboxstatus');
        			if (elem1) {
		    			document.getElementById("ipaddr_"+j).textContent = "";
		    			document.getElementById("tcp_"+j).textContent = "";
		    			document.getElementById("bpsens_"+j).textContent = "";
		    			document.getElementById("o2sens_"+j).textContent = "";
		    			document.getElementById("tempsens_"+j).textContent = "";
        			}
            	}
        		for (var i = 0; i < xmldoc.getElementsByTagName("BoxID").length; i++) {
        			var boxid = xmldoc.getElementsByTagName("BoxID")[i].firstChild.nodeValue;
        			var boxip = xmldoc.getElementsByTagName("BoxIP")[i].firstChild.nodeValue;
        			var network = xmldoc.getElementsByTagName("Network")[i].firstChild.nodeValue;
        			var bpsensor = xmldoc.getElementsByTagName("BPSensor")[i].firstChild.nodeValue;
        			var o2sensor = xmldoc.getElementsByTagName("O2Sensor")[i].firstChild.nodeValue;
        			var tempsensor = xmldoc.getElementsByTagName("TempSensor")[i].firstChild.nodeValue;
        			if (boxid == "40a36bc10566") {
        				l = 1;
           			} else if (boxid == "40a36bc1055b") {
						l = 2;
				    } else if (boxid == "40a36bc10567") {
           				l = 3;
           			} else if (boxid == "40a36bc10568") {
           				l = 4;
           			} else if (boxid == "40a36bc1055a") {
	       				l = 5;
	       			} 
        			localStorage.setItem("ipaddr"+l, boxip);
        			localStorage.setItem("tcp"+l, network);
        			localStorage.setItem("bpsens"+l, bpsensor);
        			localStorage.setItem("o2sens"+l, o2sensor);
        			localStorage.setItem("tempsens"+l, tempsensor);
        			var elem2 = document.getElementById('medboxstatus');
        			if (elem2) {
        				document.getElementById("ipaddr_"+l).textContent = boxip;
            			document.getElementById("tcp_"+l).textContent = network;
            			document.getElementById("bpsens_"+l).textContent = bpsensor;
            			document.getElementById("o2sens_"+l).textContent = o2sensor;
            			document.getElementById("tempsens_"+l).textContent = tempsensor;
        			}
        		}
             }
             else {
                  alert("Error ->" + xmlHttp.status + xmlHttp.responseXML);
             }
         }
    };
}
