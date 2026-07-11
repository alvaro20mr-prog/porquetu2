//====================================
// SCROLL SUAVE
//====================================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",e=>{

e.preventDefault();

const destino=document.querySelector(link.getAttribute("href"));

if(destino){

destino.scrollIntoView({

behavior:"smooth"

});

}

});

});


//====================================
// MENÚ AL HACER SCROLL
//====================================

const menu=document.querySelector(".menu");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

menu.classList.add("activo");

}else{

menu.classList.remove("activo");

}

});


//====================================
// ANIMACIONES
//====================================

const elementos=document.querySelectorAll(".historia,.cancion,.carta,.final");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{

threshold:.15

});

elementos.forEach(el=>observer.observe(el));


//====================================
// EFECTO POLAROID
//====================================

document.querySelectorAll(".foto").forEach(foto=>{

foto.addEventListener("mouseenter",()=>{

foto.style.zIndex="100";

});

foto.addEventListener("mouseleave",()=>{

foto.style.zIndex="1";

});

});


//====================================
// REPRODUCTOR
//====================================

const audio=document.querySelector("audio");

if(audio){

audio.volume=0.7;

}


//====================================
// FLECHA HERO
//====================================

const flecha=document.querySelector(".scroll");

if(flecha){

flecha.addEventListener("click",()=>{

document.querySelector("#historia").scrollIntoView({

behavior:"smooth"

});

});

}
