/* Desenvolva seu código aqui */

import modal from "./modal.js"
import notFound from "./notFound.js"


async function login(body){
    fetch(`http://localHost:3333/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(resp => {
        const token = resp.token
        if(token){
            localStorage.setItem('token', JSON.stringify(token))
            window.location.replace('/pages/home/index.html')
        }else{
            notFound()
        }
    })
    .catch(err => console.log(err))
}

async function register(body){
    fetch('http://localHost:3333/users/create', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    .then(resp => {
        console.log(resp)
        modal(
            {
                title: "<h2>Sua conta foi criada com sucesso!</h2>",
                body: '<p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="/pages/login/index.html">Acessar página de login</a></p>'
            }
        )
    })
    .catch(err => console.log(err))
}
export {login, register}