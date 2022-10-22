import { login } from "../../scripts/api.js"
import spinner from "../../scripts/spinner.js"

async function loadPage(){
    
    const wrongMenssage = document.querySelector('#wrong')
    const passwordInput = document.querySelector('#password')
    const redirectionRegisterButton = document.querySelector('#redirectionRegisterButton')

    const loginForm = document.querySelector('.loginForm')

    loginForm.addEventListener('submit', async (event) => {
        
        event.preventDefault()
        
        const inputs = [...loginForm]
        
        spinner(inputs[2])
        
        wrongMenssage.innerHTML = ''
        passwordInput.style = ''
        
        

        let body = {}


        inputs.forEach(elem => {
            if(elem.name){
                body[elem.name] = elem.value
            }
        })

        await login(body)
    })

    redirectionRegisterButton.addEventListener('click', () => window.location.assign('/pages/register/index.html'))

}

loadPage()
