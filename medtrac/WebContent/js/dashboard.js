for (var i=1; i < 6; i++) {
	if (localStorage.getItem("startdatetime"+i) !== null) {
		document.getElementById('datetime_'+i).value = localStorage.getItem("startdatetime"+i);
	}
	if (localStorage.getItem("temperature"+i) !== null) {
		document.getElementById('temperature_'+i).value = localStorage.getItem("temperature"+i);
	}
	if (localStorage.getItem("bphigh"+i) !== null) {
		document.getElementById('bphigh_'+i).value = localStorage.getItem("bphigh"+i);
	}
	if (localStorage.getItem("bplow"+i) !== null) {
		document.getElementById('bplow_'+i).value = localStorage.getItem("bplow"+i);
	}
	if (localStorage.getItem("pulse"+i) !== null) {
		document.getElementById('pulse_'+i).value = localStorage.getItem("pulse"+i);
	}
	if (window.parent.localStorage.getItem("spo2"+i) !== null) {
		document.getElementById('spo2_'+i).value = localStorage.getItem("spo2"+i);
	}
}

function get_dashboard_patient() {
	//if (!ActiveXObject) {
	xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 

	var url = "./resources/schedule/dashboard";
	xmlHttp.open('GET',url,true);
	xmlHttp.send(null);
	xmlHttp.onreadystatechange = function() {
	    if (xmlHttp.readyState == 4) {
	    	if ( xmlHttp.status == 200) {
	        	var xmldoc = xmlHttp.responseXML;
	        	
            	// Clear the table
            	for (var j = 1; j < 6; j++) {
		    		document.getElementById("patientid_"+j).value = "";
	           	}
            	
        		for (var i = 0; i < xmldoc.getElementsByTagName("MED_ID").length; i++) {
        			var medid = xmldoc.getElementsByTagName("MED_ID")[i].firstChild.nodeValue;
        			var patientid = xmldoc.getElementsByTagName("PATIENT_ID")[i].firstChild.nodeValue;
        			var startdt = xmldoc.getElementsByTagName("MED_DATE_START")[i].firstChild.nodeValue;
        			var enddt = xmldoc.getElementsByTagName("MED_DATE_END")[i].firstChild.nodeValue;
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
	        			document.getElementById("patientid_"+l).value = patientid;
        			}
        		}
            }
	    	else {
               alert("Error ->" + xmlHttp.responseText);
	    	}
        }
	};
}
