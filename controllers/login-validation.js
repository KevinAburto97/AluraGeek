const formData = document.querySelector("#login__form"),
    loginEmail = document.querySelector("#login__email"),
    loginPassword = document.querySelector("#login__password"),
    button = document.querySelector("#login__button")

document.addEventListener("DOMContentLoaded", () => {
    formData.addEventListener('submit', validarUserData)
})

function validarUserData(event){
    event.preventDefault()
    const errorMsg = document.querySelector('.login__messager-error')
    let email = loginEmail.value,
        password = loginPassword.value
    
    if(email.length > 0 && password.length > 0)
        return true
    else
        errorMsg.style.display = 'block'
}