let btnMenu = document.getElementById("btn-menu")
let menu = document.getElementById('menu-mobile')
let overlaymenu = document.getElementById('overlay-menu') 

btnMenu.addEventListener('click', ()=>{
    menu.classList.add('open-menu')
})

menu.addEventListener('click', ()=>{
    menu.classList.remove('open-menu')
})

overlaymenu.addEventListener('click', ()=>{
    menu.classList.remove('open-menu')
})