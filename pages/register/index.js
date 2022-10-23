import { register } from "../../scripts/api.js";
import spinner from './../../scripts/spinner.js';

function loadPage(){
    
    const registerForm = document.querySelector('.registerForm')

    const backToLogin = document.querySelectorAll('.backToLogin')

    registerForm.addEventListener('submit', async (event) => {

        event.preventDefault()

        let inputs = [...registerForm]

        spinner(inputs[5])

        let body = {}

        inputs.forEach(elem => {
            if(elem.name){
                body[elem.name] = elem.value
            }
        })
        console.log(body)
        await register(body)
    })

    backToLogin.forEach(button => {
        button.addEventListener('click', () => window.location.assign('/index.html'))
    })
}

loadPage()
