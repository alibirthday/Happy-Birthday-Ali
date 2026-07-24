// ======================================
// VARIABLES
// ======================================

const pages = document.querySelectorAll(".page");

let currentPage = 0;

// ======================================
// SHOW PAGE
// ======================================

function showPage(index){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

    currentPage=index;

}

// ======================================
// NEXT
// ======================================

function nextPage(){

    if(currentPage < pages.length-1){

        showPage(currentPage+1);

    }

}

// ======================================
// PREVIOUS
// ======================================

function previousPage(){

    if(currentPage>0){

        showPage(currentPage-1);

    }

}

// ======================================
// START
// ======================================

showPage(0);

// ======================================
// HOME
// ======================================

const openGift=document.getElementById("openGift");

if(openGift){

openGift.addEventListener("click",()=>{

const music=document.getElementById("bgMusic");

if(music){

music.play().catch(()=>{});

}

nextPage();

});

}

// ======================================
// GALLERY
// ======================================

document.getElementById("galleryNext").onclick=()=>{

nextPage();

};

// ======================================
// LETTER
// ======================================

document.getElementById("letterBack").onclick=()=>{

previousPage();

};

document.getElementById("letterNext").onclick=()=>{

nextPage();

};

// ======================================
// REASONS
// ======================================

document.getElementById("reasonsBack").onclick=()=>{

previousPage();

};

document.getElementById("reasonsNext").onclick=()=>{

nextPage();

};

// ======================================
// CAKE
// ======================================

document.getElementById("cakeBack").onclick=()=>{

previousPage();

};

document.getElementById("cakeNext").onclick=()=>{

nextPage();

};

// ======================================
// DUA
// ======================================

document.getElementById("duaBack").onclick=()=>{

previousPage();

};

document.getElementById("duaNext").onclick=()=>{

nextPage();

};

// ======================================
// RESTART
// ======================================

document.getElementById("restart").onclick=()=>{

showPage(0);

};
// ======================================
// GALLERY LIGHTBOX
// ======================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".gallery img").forEach(img=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImage.src=img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

// ======================================
// ENVELOPE OPEN
// ======================================

const envelope=document.getElementById("envelope");

const letter=document.getElementById("letterContent");

if(envelope){

    envelope.addEventListener("click",()=>{

        envelope.style.transform="scale(.8) rotateX(180deg)";

        envelope.style.opacity="0";

        setTimeout(()=>{

            envelope.style.display="none";

            letter.style.display="block";

            typeWriter();

        },700);

    });

}

// ======================================
// TYPEWRITER EFFECT
// ======================================

function typeWriter(){

    const paragraph=letter.querySelector("p");

    const text=paragraph.innerText;

    paragraph.innerHTML="";

    let i=0;

    const timer=setInterval(()=>{

        paragraph.innerHTML+=text.charAt(i);

        i++;

        if(i>=text.length){

            clearInterval(timer);

        }

    },18);

}

// ======================================
// MUSIC CONTROL
// ======================================

const music=document.getElementById("bgMusic");

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(music.paused){

            music.play();

        }

        else{

            music.pause();

        }

    }

});

// ======================================
// BUTTON HOVER SOUND (OPTIONAL)
// ======================================

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.transform="translateY(-4px) scale(1.05)";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.transform="translateY(0) scale(1)";

    });

});
// ======================================
// BLOW CANDLE
// ======================================

const blowBtn = document.getElementById("blowCandle");
const cakeMessage = document.getElementById("cakeMessage");

if (blowBtn) {

    blowBtn.addEventListener("click", () => {

        blowBtn.innerHTML = "🎉 Wish Complete";

        cakeMessage.innerHTML = `
            🎂 Happy Birthday Ali ❤️<br>
            May Allah bless you with endless happiness, success,
            good health and a beautiful future. Ameen 🤲
        `;

        createConfetti();
        launchFireworks();

    });

}

// ======================================
// CONFETTI
// ======================================

function createConfetti() {

    const container = document.getElementById("confetti");

    for (let i = 0; i < 120; i++) {

        const piece = document.createElement("div");

        piece.style.position = "absolute";
        piece.style.left = Math.random() * 100 + "%";
        piece.style.top = "-20px";

        piece.style.width = "8px";
        piece.style.height = "15px";

        piece.style.background =
            `hsl(${Math.random()*360},90%,60%)`;

        piece.style.opacity = "0.9";

        piece.style.transform =
            `rotate(${Math.random()*360}deg)`;

        piece.style.transition =
            "transform 4s linear, top 4s linear";

        container.appendChild(piece);

        requestAnimationFrame(() => {

            piece.style.top = "110%";

            piece.style.transform =
                `translateX(${Math.random()*400-200}px)
                 rotate(${Math.random()*720}deg)`;

        });

        setTimeout(() => piece.remove(), 4500);

    }

}

// ======================================
// FIREWORKS
// ======================================

function launchFireworks() {

    const container = document.getElementById("fireworks");

    for (let i = 0; i < 12; i++) {

        setTimeout(() => {

            const fire = document.createElement("div");

            fire.style.position = "absolute";
            fire.style.width = "18px";
            fire.style.height = "18px";

            fire.style.borderRadius = "50%";

            fire.style.left = Math.random()*90 + "%";
            fire.style.top = Math.random()*60 + "%";

            fire.style.background =
                `hsl(${Math.random()*360},100%,60%)`;

            fire.style.boxShadow =
                "0 0 30px white";

            fire.style.animation =
                "explode .9s ease-out";

            container.appendChild(fire);

            setTimeout(() => {

                fire.remove();

            },900);

        },i*250);

    }

}

// ======================================
// FLOATING HEARTS
// ======================================

const hearts = document.getElementById("hearts");

setInterval(()=>{

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤️";

    heart.style.left=Math.random()*100+"%";

    heart.style.fontSize=
        (18+Math.random()*20)+"px";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

},700);

// ======================================
// RESTART
// ======================================

const restart=document.getElementById("restart");

if(restart){

restart.addEventListener("click",()=>{

showPage(0);

window.scrollTo({

top:0,
behavior:"smooth"

});

if(cakeMessage){

cakeMessage.innerHTML="";

}

if(blowBtn){

blowBtn.innerHTML="🕯 Blow Candle";

}

});

}

// ======================================
// PAGE LOAD
// ======================================

window.onload=()=>{

showPage(0);

};

// ======================================
// END
// ======================================