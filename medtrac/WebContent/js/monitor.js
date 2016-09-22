function get_active_schedule(){
	
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/schedule/active";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
            	var xmldoc = xmlHttp.responseXML;
            	
            	// Clear the table
            	for (var j = 1; j < 6; j++) {
		    		document.getElementById("patient_"+j).textContent = "";
	           	}
            	
        		for (var i = 0; i < xmldoc.getElementsByTagName("MED_ID").length; i++) {
        			var medid = xmldoc.getElementsByTagName("MED_ID")[i].firstChild.nodeValue;
        			var patientid = xmldoc.getElementsByTagName("PATIENT_ID")[i].firstChild.nodeValue;
        			if (medid == "40a36bc10566") {
        				l = 1;
           			} else if (medid == "40a36bc1055b") {
						l = 2;
				    } else if (medid == "40a36bc10567") {
           				l = 3;
           			} else if (medid == "40a36bc10568") {
           				l = 4;
           			} else if (medid == "40a36bc1055a") {
	       				l = 5;
	       			} else {
				    	l = 0;
				    }
        			
        			if (l != 0) {
	        			document.getElementById("patient_"+l).textContent = patientid;
        			}
        		}
            }
            else {
                   alert("Error ->" + xmlHttp.responseText);
            }
        }
    };
}

function store_schedule(){
	
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/schedule";
	xmlHttp.open('POST',url,true);
	xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	// Do nothing here
	    }
	};
	
	var json = {
			'MedboxId' : document.getElementById('box_id_monitor').value,
			'PatientId' : document.getElementById('patient_id').value,
 			'StartDateTime' : getNowFormatDate(),
			'EndDateTime' : "N.A",
			'Interval' : "N.A",
	};
	
	xmlHttp.send(JSON.stringify(json));
}

function set_schedule(){
	
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/schedule/set";
	xmlHttp.open('POST',url,true);
	xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	// Do nothing here
	    }
	};
	
	populate_values();
	var json = {
			'BoxID' : boxID,
			'StartDateTime' : startdatetime,
			'EndDateTime' : enddatetime,
			'Interval' : interval,
	};
	
	xmlHttp.send(JSON.stringify(json));
}

function populate_values() {
	boxID = document.getElementById('box_id_monitor').value;
	startdatetime = getNowFormatDate();
	enddatetime = "N.A";	
	interval = "N.A";
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function apply(){
	store_schedule();
	set_schedule();
	alert("Patient ID has been updated!");
	location.reload();
}

