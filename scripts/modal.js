function modal(content){
    
    const htmlBody = document.querySelector('body')

    const {title, body} = content


    const modal = document.createElement("div")
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    const contentDiv = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')

    modal.classList = 'modal'

    img.src = '/src/img/Check.svg'
    img.alt = 'Green Check'

    h2.innerHTML = title
    p.innerHTML = body

    imgDiv.append(img, h2)
    contentDiv.append(p)

    modal.append(imgDiv, contentDiv)

    htmlBody.append(modal)

    setTimeout(() => {modal.remove()}, 10000)
}

export default modal