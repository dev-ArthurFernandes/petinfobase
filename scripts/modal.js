
import { sendPost, editPost, getPosts, editProfile, deletPost, deletProfile } from "./api.js"

function postModal(token, type, post){

    const section = document.createElement('section')
    section.classList = 'modalSection'
    
    const modal = document.createElement("div")
    modal.classList = 'modal'

    const modalHeader = document.createElement("span")

    const h3 = document.createElement("h3")
    
    const closeButton = document.createElement("button")
    closeButton.innerText = 'X'
    closeButton.id = 'closeButton'

    const div1 = document.createElement('div')
    div1.id = 'div1'

    const titelLabel = document.createElement('label')
    titelLabel.innerText = 'Título do post'

    const titleInput = document.createElement('input')
    titleInput.placeholder = 'Digite o título aqui...'

    const div2 = document.createElement('div')
    div2.id = 'div2'

    const contentLabel = document.createElement('label')
    contentLabel.innerText = 'Conteúdo do post'

    const contentArea = document.createElement('textArea')
    contentArea.placeholder = 'Desenvolva o conteúdo do post aqui...'


    const div3 = document.createElement('div')
    div3.id = 'buttons'

    const bnt1 = document.createElement('button')
    bnt1.innerText = 'Cancelar'
    bnt1.id = 'cancel'
    
    const bnt2 = document.createElement('button')
    bnt2.id = 'send'

    if(type === 'edit'){
        const {title, content, id} = post
        
        h3.innerText = 'Edição'
        
        titleInput.value = title
        
        contentArea.value = content

        bnt2.innerText = 'Salvar Alterações'
        bnt2.addEventListener('click', async () => {
            let body = {
                title: titleInput.value,
                content: contentArea.value,
            }

            await editPost(token, id, body)
            section.remove()
        })
    }else if(type === 'make'){
        h3.innerText = 'Criando novo post'
        bnt2.innerText = 'Publicar' 
        bnt2.addEventListener('click', async () => {
            let body = {
                title: titleInput.value,
                content: contentArea.value,
            }

            await sendPost(body, token)
            await getPosts(token)
            section.remove()
        })
    }

    closeButton.addEventListener('click', () => section.remove())

    bnt1.addEventListener('click', () => section.remove())

    modalHeader.append(h3, closeButton)
    div1.append(titelLabel, titleInput)
    div2.append(contentLabel, contentArea)
    div3.append(bnt1, bnt2)
    modal.append(modalHeader, div1, div2, div3)
    section.append(modal)

    return section
}


function editProfileModal(token){
    
    const user = JSON.parse(localStorage.getItem("userContent"))


    const section = document.createElement('section')
    section.classList = 'modalSection'
    
    const modal = document.createElement("div")
    modal.classList = 'modal'

    const modalHeader = document.createElement("span")

    const h3 = document.createElement("h3")
    h3.innerText = 'Editar perfil'
    
    const closeButton = document.createElement("button")
    closeButton.innerText = 'X'
    closeButton.id = 'closeButton'

    const div1 = document.createElement('div')

    const nameLabel = document.createElement('label')
    nameLabel.innerText = 'Nome de Usuário'

    const nameInput = document.createElement('input')
    nameInput.value = user.username

    const div2 = document.createElement('div')
    const emailLabel = document.createElement('label')
    emailLabel.innerText = 'Email'

    const emailInput = document.createElement('input')
    emailInput.value = user.email 

    const div3 = document.createElement('div')

    const avatarLabel = document.createElement('label')
    avatarLabel.innerText = 'Avatar'

    const avatarInput = document.createElement('input')
    avatarInput.value = user.avatar

    const div4 = document.createElement("div")
    div4.id = 'buttons'

    const bnt1 = document.createElement("button")
    bnt1.innerText = 'Deletar Conta'
    bnt1.id = 'delet'

    const bnt2 = document.createElement("button")
    bnt2.innerText = 'Salvar Alterações'
    bnt2.id = 'send'


    closeButton.addEventListener('click', () => section.remove())

    bnt1.addEventListener('click', () => {
        const main = document.querySelector('main')
        main.append(deletModal(token, 'profile'))
        section.remove()
    })

    bnt2.addEventListener('click', async () => {
        let body = {}
        
        if(nameInput.value !== user.username){
            body["username"] = nameInput.value
        }
        if(emailInput.value !== user.email){
            body["email"] = emailInput.value 
        }
        if(avatarInput.value !== user.avatar){
            body["avatar"] = avatarInput.value
        }

        await editProfile(token, body)

    })



    div4.append(bnt1, bnt2)
    div3.append(avatarLabel, avatarInput)
    div2.append(emailLabel, emailInput)
    div1.append(nameLabel, nameInput)
    modalHeader.append(h3, closeButton)
    modal.append(modalHeader,div1, div2, div3, div4)
    section.append(modal)

    return section
}

function deletModal(token, type, postId,){
    
    const section = document.createElement('section')
    section.classList = 'modalSection'
    
    const modal = document.createElement("div")
    modal.classList = 'modal'

    const modalHeader = document.createElement("span")

    const h3 = document.createElement("h3")
    h3.innerText = 'Confirmarção de exclusão'
    
    const closeButton = document.createElement("button")
    closeButton.innerText = 'X'
    closeButton.id = 'closeButton'

    const div1 = document.createElement('div')

    const h2 = document.createElement('h2')

    const p = document.createElement('p')
    p.innerText = 'Essa ação não poderá ser desfeita, então pedimos que tenha cautela antes de concluir'

    const div2 = document.createElement('div')
    div2.id = 'buttons'
    div2.style = 'justfy-content: start'

    const bnt1 = document.createElement('button')
    bnt1.id = 'cancel'
    bnt1.innerText = 'Cancelar'
    
    const bnt2 = document.createElement('button')
    bnt2.id = 'delet'
    
    if(type === 'post'){
        
        
        h2.innerText = 'Tem certeza que deseja excluir este post?'

        bnt2.innerText = 'Sim, excluir este post'

        bnt2.addEventListener('click', () => {
        deletPost(token, postId)
        section.remove()
        })

    }else if(type === 'profile'){

        h2.innerText = 'Tem certeza que deseja excluir sua conta?'

        bnt2.innerText = 'Sim, excluir minha conta'

        bnt2.addEventListener('click', () => {
            deletProfile(token)
            section.remove()
        })
    }

    closeButton.addEventListener('click', () => section.remove())

    bnt1.addEventListener('click', () => section.remove())


    div2.append(bnt1, bnt2)
    div1.append(h2, p)
    modalHeader.append(h3, closeButton)
    modal.append(modalHeader, div1, div2)
    section.append(modal)

    return section
}

function toViewPost(post, mes){
    
    const {title, content, user} = post
    const {username, avatar} = user
   
    const section = document.createElement('section')
    section.classList = 'modalSection'
    
    const modal = document.createElement("div")
    modal.classList = 'modal'

    const modalHeader = document.createElement('div')
    modalHeader.id = 'modalHeader'

    const headerDiv1 = document.createElement("div")

    const userSpan = document.createElement('span')
    userSpan.id = 'userSpan'

    const userAvatar = document.createElement('img')
    userAvatar.src = avatar
    userAvatar.alt = username

    const userName = document.createElement('h3') 
    userName.innerText = username

    const span = document.createElement('span')
    span.innerText = '|'
    
    const data = document.createElement('span')
    data.id = 'Data'
    
    const postData = document.createElement('p')
    postData.innerText = mes
    
    const headerDiv2 = document.createElement("div")
    headerDiv2.style = 'justify-content: end'

    const closeButton = document.createElement("button")
    closeButton.innerText = 'X'
    closeButton.id = 'closeButton'

    const h2 = document.createElement('h2')
    h2.innerText = title

    const p = document.createElement('p')
    p.innerText = content


    closeButton.addEventListener('click', () => section.remove())


    userSpan.append(userAvatar, userName)
    data.append(postData)
    headerDiv1.append(userSpan, span,data)
    headerDiv2.append(closeButton)
    modalHeader.append(headerDiv1, headerDiv2)
    modal.append(modalHeader, h2, p)
    section.append(modal)

    return section
}

export {postModal, editProfileModal, deletModal, toViewPost}