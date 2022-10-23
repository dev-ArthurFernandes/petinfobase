import { editPost } from "./api.js";
import { deletModal, postModal, toViewPost } from "./modal.js";

function rederPosts(array){

    const postFeed = document.querySelector(".postFeed")
    postFeed.innerHTML = ''

    const month = ['Janeiro', 'Fevereiro', 'Março', 'Abril','Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    const LocalUser = JSON.parse(localStorage.getItem('userContent'))

    const token = JSON.parse(localStorage.getItem('token'))

    array.reverse().forEach(element => {

        const main = document.querySelector('main')

        const postId = element.id
        const {title, content, createdAt, user} = element
        const userId = user.id
        const {username, avatar} = user
        
        const postDate = new Date(createdAt).toLocaleDateString().split('/')
        
        const mes = month[postDate[1] - 1] + "de" + postDate[2]

        const postCard = document.createElement('div')
        postCard.classList = 'post'
        postCard.id = postId

        const postHeader = document.createElement('div')
        postHeader.id = 'postHeader'

        const headerDiv1 = document.createElement('div')

        const userSpan = document.createElement('span')
        userSpan.id = 'userSpan'

        const userAvatar = document.createElement('img')
        userAvatar.src = avatar
        userAvatar.alt = username

        const userName = document.createElement('h3') 
        userName.innerText = username
        userName.id = userId

        const span = document.createElement('span')
        span.innerText = '|'
        
        const data = document.createElement('span')
        data.id = 'Data'
        
        const postData = document.createElement('p')
        postData.innerText = mes
        
        const headerDiv2 = document.createElement('div')
        headerDiv2.id = 'headerDiv2'

        const dots = document.createElement('p')
        dots.innerText = '...'

        const buttons = document.createElement('div')
        buttons.id = 'bntPopUp'

        const edit = document.createElement("button")
        edit.id = 'edit'
        edit.innerText = "Editar"

        const delet = document.createElement('button')  
        delet.id = 'delet'
        delet.innerText = 'Excluir'

        const h2 = document.createElement('h2')
        h2.innerText = title

        const p = document.createElement('p')
        p.innerText = content
        p.innerText = `${p.innerText.substring(0, 200)}...`

        const a = document.createElement('a')
        a.innerText = 'Acessar publicação'

        a.addEventListener('click', () => main.append(toViewPost(element, mes)))

        userSpan.append(userAvatar, userName)
        data.append(postData)
        headerDiv1.append(userSpan, span, data)
        buttons.append(edit, delet)
        
        if(LocalUser.id === userId){
            headerDiv2.append(dots,buttons)
        }

        edit.addEventListener('click', () => {
            main.appendChild(postModal(token, 'edit', element))
        })

        delet.addEventListener('click', () => {
            main.append(deletModal(token, 'post', postId))
        })

        dots.addEventListener('click', () => {
            if(buttons.style.cssText === 'display: flex;'){
                buttons.style = 'display: none;'
            }else{
                buttons.style = 'display: flex;'
            }
        })

        postHeader.append(headerDiv1, headerDiv2)
        postCard.append(postHeader, h2, p, a)
        
        postFeed.append(postCard)

    });
}

export default rederPosts
