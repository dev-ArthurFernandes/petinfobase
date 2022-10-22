function spinner(item){
    item.innerHTML = `<img src='/src/img/spinner.svg' alt='spinner' class='spinner'/>`
    setTimeout(() => {
        item.innerHTML = 'Acessar'
    }, 500)
}

export default spinner