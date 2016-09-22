function search_patient(patient){
	// In case this is called repeatedly, clear all options first
	var myNode = document.getElementById(patient);
	//while (myNode.firstChild) {
	//    myNode.removeChild(myNode.firstChild);
	//}
	  
	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/schedule";
    xmlHttp.open('GET',url,true);
    xmlHttp.send(null);
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	if ( xmlHttp.status == 200) {
            	var xmldoc = xmlHttp.responseXML;

        		for (var i = 0; i < xmldoc.getElementsByTagName("PATIENT_ID").length; i++) {
        			var patientId = xmldoc.getElementsByTagName("PATIENT_ID")[i].firstChild.nodeValue;
           			var sel = document.getElementById(patient);
        			var e1 = document.createElement("option");
        			e1.appendChild(document.createTextNode(patientId));
          			sel.appendChild(e1);
         		}
             }
             else
                   alert("Error ->" + xmlHttp.responseText);
          }
    };
}