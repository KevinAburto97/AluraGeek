const form = document.querySelector("[data-form]"),
    mail = document.querySelector("[data-email]"),
    pass = document.querySelector("[data-password]")

form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const user = await validate()
    if(user)
        window.location.href = './../screens/adminProducts.html'
    else{
        Swal.fire({
            icon: 'error',
            text: 'email or password - wrong or user not found',
            width: '15rem',
            height: '10rem'
        })
    }
})

async function getUsers(){
    const response = await fetch('http://localhost:3000/users/')
    return await response.json()
}

async function validate(){
    const users = await getUsers(),
        found = users.find((user) => user.email === mail.value && user.password === pass.value)

    return found
}