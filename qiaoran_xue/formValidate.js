/********w************
    
    Name: Qiaoran Xue
    Date: 2023-04-24
    Description: A portfolio website - contact form validation.

*********************/

function validate(e) {
    hideErrors();

    if (formHasErrors()) {
        e.preventDefault();
        return false;
    }
    return true;
}

function resetForm(e) {
	if (confirm('reset this form?')) {
		hideErrors();

		document.getElementById("name").focus();

		return true;
	}
	e.preventDefault();

	return false;
}

function formHasErrors() {
    let errorFlag = false;

    // checking name, phone, email, subject input
    const requiredTextFields = ["name", "phone", "email", "subject"]

    for (textField of requiredTextFields) {
		if (!formFieldHasInput(document.getElementById(textField))) {
			document.getElementById(textField + "_error").style.display = "block"

			if (!errorFlag) {
				document.getElementById(textField).focus()
                document.getElementById(textField).select()
			}
			errorFlag = true
		}
	}

    // checking 10 digit phone number 
    const regex = new RegExp(/^\d{10}$/)
	const phoneNumber = document.getElementById("phone").value

	if (!regex.test(phoneNumber)) {
		document.getElementById("phone_error").style.display = "block"

		if (!errorFlag) {
			document.getElementById("phone").focus()
			document.getElementById("phone").select()
		}
		errorFlag = true
	}

    // checking valid email address
    const emailFormat = new RegExp(/^\S+@\S+\.\S+$/)
	const email = document.getElementById("email").value

	if (!emailFormat.test(email)) {
		document.getElementById("email_error").style.display = "block"

		if (!errorFlag) {
			document.getElementById("email").focus()
			document.getElementById("email").select()
		}
	
		errorFlag = true	
	}
    return errorFlag
}
    
function hideErrors() {
	const errorFields = document.getElementsByClassName("error");

	for (const error of errorFields) {
		error.style.display = "none"
	}
}

function formFieldHasInput(fieldElement) {
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		return false;
	}
	return true;
}

function load() {
    hideErrors()

    document.getElementById("contactInfo").addEventListener("submit", validate);

    document.getElementById("contactInfo").reset();

	document.getElementById("contactInfo").addEventListener("reset", resetForm);
}

document.addEventListener("DOMContentLoaded", load);
