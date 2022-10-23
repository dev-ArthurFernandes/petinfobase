/* Desenvolva seu código aqui */

import notFound from "./notFound.js"
import rederPosts from "./renderPosts.js"
import notification from './notification.js';




async function login(body){
    await fetch(`http://localHost:3333/login`, {
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
    await fetch(`http://localHost:3333/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(resp => {
        notification(
            {
                title: "<h2>Sua conta foi criada com sucesso!</h2>",
                body: '<p>Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login: <a href="/index.html">Acessar página de login</a></p>'
            }
        )
    })
    .catch(err => console.log(err))
}



async function getPosts(token){
    
    
    await fetch('http://localHost:3333/posts',{
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        rederPosts(resp)
    })

}



async function getUser(token){
    await fetch('http://localhost:3333/users/profile',{
        method: "GET",
        headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${token}`,
        }
    })
    .then(resp => resp.json())
    .then(resp => {
        localStorage.setItem('userContent', JSON.stringify(resp))
    })
    .catch(err => console.log(err))
}



async function sendPost(body, token){
    await fetch('http://localHost:3333/posts/create', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then(resp => console.log(resp))
    .catch(err => console.log(err))
}




async function editPost(token, postID, body){
    await fetch(`http://localHost:3333/posts/${postID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then(resp => {
        notification({
            title: "<h2>O post foi atualizado com sucesso!</h2>",
            body: '<p>A nova versão do seu post já está disponivel para que todos possam ver...</p>'
        })
        getPosts(token)
    })
    .catch(err => console.log(err))
}



async function deletPost(token, postID){
    await fetch(`http://localHost:3333/posts/${postID}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(resp => {
        getPosts(token)
        notification({
            title: `<h2>${resp.json().menssage}!</h2>`,
            body: "<p>O post selecionado para exclusão foi deletado, a partir de agora não aparecerá no seu feed...</p>"
        })
    })
    .catch(err => console.log(err))
}



async function editProfile(token, body){
    await fetch('http://localHost:3333/users/profile', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then(resp => {
        getUser(token)
        getPosts(token)
        notification({
            title: "<h2>Perfil atualizado com sucesso!</h2>",
            body: "<p>As informação da sua conta foram atualizadas... <br> <a href=''>Atualizar página</a></p>"
        })
    })

}


async function deletProfile(token){
    await fetch("http://localhost:3333/users/profile", {
        "method": "DELETE",
        "headers":{
            "Authorization": `Bearer ${token}`
        }
    })
    .then(resp => {
        console.log(resp)
        localStorage.clear()
        window.location.reload()
    })
    .catch(err => console.log(err))
}



export {login, register, getPosts, getUser, sendPost, editPost, editProfile, deletPost, deletProfile}