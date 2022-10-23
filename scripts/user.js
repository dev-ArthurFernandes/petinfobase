function user(){
    
    const user = JSON.parse(localStorage.getItem('userContent'))

    const userAvatar = document.querySelector("#avatar")
   
    userAvatar.src = user.avatar
    userAvatar.alt = user.name    
   

    const userName = document.querySelector('#Name')
    userName.innerHTML = user.username
}

export default user