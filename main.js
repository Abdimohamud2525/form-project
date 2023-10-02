const names = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const confinPassword = document.querySelector("#confinPassword")
const form = document.querySelector(".form")

const showError = (input, message) => {
    let parentElement = input.parentElement;
    parentElement.classList = "form-controll error"

    let small = parentElement.querySelector("small")
    let succesIcon = parentElement.querySelectorAll("i")[0]
    let errorIcon = parentElement.querySelectorAll("i")[1]

    small.style.textContent = message
    small.style.visibility = "visible";
    succesIcon.style.visibility = "hidden"
    errorIcon.style.visibility = "visible"
}

const showSucces = (input,) => {
    let parentElement = input.parentElement;
    parentElement.classList = "form-controll succes"

    let succesIcon = parentElement.querySelectorAll("i")[0]
    let errorIcon = parentElement.querySelectorAll("i")[1]
    succesIcon.style.visibility = "visible"
    errorIcon.style.visibility = "hidden"

}

const checkEmpty = (elements) => {
    elements.forEach((element) => {
        if (element.value === "") {
            showError(element, "input required")
        } else {
            showSucces(element)
        }
    })

}
const checkEmail = (email) => {

    let reg = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    if (reg.test(email.value)) {
        showSucces(email)
    } else {
        showError(email, "invalid email")
    }
}

const checkPasswordLenght = (input, min, max) => {

    if (input.value.length < min) {
        showError(input, `passwort atleast ${min} charagter`)
    }
    if (input.value.length > max) {
        showError(input, `passwort maxium ${max} charagter`)
    }
}


const checkDataFromLocalStorage = () => {

    let Data = localStorage.getItem("user")

    return Data ? JSON.parse(Data) : []

}

function addlocalStoarge(userInfo) {

    let firstName = userInfo[0].value
    let lastName = userInfo[1].value
    let email = userInfo[2].value
    let password = userInfo[3].value
    let confinPassword = userInfo[4].value
    let user = {}

    if (firstName == '' && lastName == '' && email == '' && password == "" && confinPassword == '') {
        return;

    } else if (password != confinPassword) {
        return;

    }

    else {
        user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confinPassword: confinPassword,
        }
    }

    let users = checkDataFromLocalStorage();


    users.push(user);


    localStorage.setItem("users", JSON.stringify(users));
}
console.log(checkDataFromLocalStorage())

form.addEventListener("submit", (event) => {

    event.preventDefault();

    checkEmpty([firstName, lastName, email, password, confinPassword])
    checkEmail(email)
    checkPasswordLenght(password, 6, 10)
    checkPasswordLenght(confinPassword, 6, 10)
    checkDataFromLocalStorage(firstName, lastName, email, password, confinPassword)
    addlocalStoarge([firstName, lastName, email, password, confinPassword])

});
