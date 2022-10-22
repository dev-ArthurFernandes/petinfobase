function notFound(){

    const wrongMenssage = document.querySelector('#wrong')
    const passwordInput = document.querySelector('#password')
    
    wrongMenssage.innerHTML = 'A senha está incorreta'
    passwordInput.style = 'border: 1px solid var(--alert100)'
}

export default notFound