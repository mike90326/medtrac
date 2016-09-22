function registering(){
	register_patient();
	alert("Patient Registered");
}

function register_patient(){

	//if (!ActiveXObject) {
		xmlHttp = new XMLHttpRequest;
	//}
	//else {
	//    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	//} 
	
	var url = "./resources/register";
    xmlHttp.open('POST',url,true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {
        	// Do nothing here
        }
    };
    
    populate_values();
	var json = {
			'PatientId' : patientId,
			'PatientName' : patientName,
			'DateOfBirth' : dateOfBirth,
			'Bed' : bed,
			'Age' : age,
			'Sex' : sex,
			'RegistrationDate' : registrationDate,
	};
	
    xmlHttp.send(JSON.stringify(json));
}

function populate_values() {
	patientId = document.getElementById('patient_id').value.toUpperCase();
	patientName = document.getElementById('patient_name').value;
	dateOfBirth = "N.A.";
	bed = "N.A.";
	age = "N.A.";
	sex = "N.A.";
	registrationDate = "N.A.";
}