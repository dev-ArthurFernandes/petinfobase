import { getPosts, getUser } from "../../scripts/api.js";
import { editProfileModal, postModal } from "../../scripts/modal.js";
import user from "../../scripts/user.js";

async function loadPage(){

    const token = JSON.parse(localStorage.getItem('token'))

    if(!token){
        window.location.assign('/index.html')
    }
    
    const main = document.querySelector('main')

    const createButton = document.querySelector('#createButton')

    const editProfile = document.querySelector('#Name')

    const logout = document.querySelector('#bottom')
    
   
    logout.addEventListener('click', () => {
        localStorage.clear()
        window.location.assign('/index.html')
    })


    createButton.addEventListener('click', () => main.append(postModal(token, 'make')))

    editProfile.addEventListener('click', () => main.append(editProfileModal(token)))

    await getUser(token)
    
    await getPosts(token)

    user()
}

loadPage()

