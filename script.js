/*=========================================
HAPPY BIRTHDAY WEBSITE
SCRIPT.JS
PART 1
=========================================*/

/*========================
PAGES
========================*/

const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    const target=document.getElementById(id);

    if(target){

        target.classList.add("active");

    }

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

/*========================
BACKGROUND MUSIC
========================*/

const bgMusic=document.getElementById("bgMusic");

function playMusic(){

    if(!bgMusic) return;

    bgMusic.volume=0.5;

    bgMusic.play().catch(()=>{});

}

/*========================
HOME
========================*/

const openGift=document.getElementById("openGift");

if(openGift){

    openGift.addEventListener("click",()=>{

        playMusic();

        showPage("memory1");

    });

}

/*========================
MEMORY 1
========================*/

document.getElementById("memory1Next")
.addEventListener("click",()=>{

    showPage("memory2");

});

/*========================
MEMORY 2
========================*/

document.getElementById("memory2Back")
.addEventListener("click",()=>{

    showPage("memory1");

});

document.getElementById("memory2Next")
.addEventListener("click",()=>{

    showPage("memory3");

});

/*========================
MEMORY 3
========================*/

document.getElementById("memory3Back")
.addEventListener("click",()=>{

    showPage("memory2");

});

document.getElementById("memory3Next")
.addEventListener("click",()=>{

    showPage("memory4");

});

/*========================
MEMORY 4
========================*/

document.getElementById("memory4Back")
.addEventListener("click",()=>{

    showPage("memory3");

});

document.getElementById("memory4Next")
.addEventListener("click",()=>{

    showPage("memory5");

});

/*========================
MEMORY 5
========================*/

document.getElementById("memory5Back")
.addEventListener("click",()=>{

    showPage("memory4");

});

document.getElementById("memory5Next")
.addEventListener("click",()=>{

    showPage("letter");

});

/*========================
LETTER
========================*/

const envelope=document.getElementById("envelope");

const letterContent=document.getElementById("letterContent");

if(envelope){

    envelope.addEventListener("click",()=>{

        envelope.classList.add("open");

        letterContent.style.display="block";

    });

}

document.getElementById("letterBack")
.addEventListener("click",()=>{

    showPage("memory5");

});

document.getElementById("letterNext")
.addEventListener("click",()=>{

    showPage("reason1");

});
/*=========================================
SCRIPT.JS
PART 2
REASON 1 → REASON 10
=========================================*/

/*========================
REASON 1
========================*/

document.getElementById("reason1Back")
.addEventListener("click",()=>{

    showPage("letter");

});

document.getElementById("reason1Next")
.addEventListener("click",()=>{

    showPage("reason2");

});

/*========================
REASON 2
========================*/

document.getElementById("reason2Back")
.addEventListener("click",()=>{

    showPage("reason1");

});

document.getElementById("reason2Next")
.addEventListener("click",()=>{

    showPage("reason3");

});

/*========================
REASON 3
========================*/

document.getElementById("reason3Back")
.addEventListener("click",()=>{

    showPage("reason2");

});

document.getElementById("reason3Next")
.addEventListener("click",()=>{

    showPage("reason4");

});

/*========================
REASON 4
========================*/

document.getElementById("reason4Back")
.addEventListener("click",()=>{

    showPage("reason3");

});

document.getElementById("reason4Next")
.addEventListener("click",()=>{

    showPage("reason5");

});

/*========================
REASON 5
========================*/

document.getElementById("reason5Back")
.addEventListener("click",()=>{

    showPage("reason4");

});

document.getElementById("reason5Next")
.addEventListener("click",()=>{

    showPage("reason6");

});

/*========================
REASON 6
========================*/

document.getElementById("reason6Back")
.addEventListener("click",()=>{

    showPage("reason5");

});

document.getElementById("reason6Next")
.addEventListener("click",()=>{

    showPage("reason7");

});

/*========================
REASON 7
========================*/

document.getElementById("reason7Back")
.addEventListener("click",()=>{

    showPage("reason6");

});

document.getElementById("reason7Next")
.addEventListener("click",()=>{

    showPage("reason8");

});

/*========================
REASON 8
========================*/

document.getElementById("reason8Back")
.addEventListener("click",()=>{

    showPage("reason7");

});

document.getElementById("reason8Next")
.addEventListener("click",()=>{

    showPage("reason9");

});

/*========================
REASON 9
========================*/

document.getElementById("reason9Back")
.addEventListener("click",()=>{

    showPage("reason8");

});

document.getElementById("reason9Next")
.addEventListener("click",()=>{

    showPage("reason10");

});

/*========================
REASON 10
========================*/

document.getElementById("reason10Back")
.addEventListener("click",()=>{

    showPage("reason9");

});

document.getElementById("reason10Next")
.addEventListener("click",()=>{

    showPage("cake");

});
/*=========================================
SCRIPT.JS
PART 3
CAKE → DUA → FINAL
=========================================*/

/*========================
CAKE
========================*/

const cakeMessage=document.getElementById("cakeMessage");

document.getElementById("cakeBack")
.addEventListener("click",()=>{

    showPage("reason10");

});

document.getElementById("cakeNext")
.addEventListener("click",()=>{

    showPage("dua");

});

document.getElementById("blowCandle")
.addEventListener("click",()=>{

    cakeMessage.innerHTML=`
    🎉 Happy Birthday Ali ❤️<br><br>
    May Allah bless you with endless happiness,
    success, peace and barakah. 🤲
    `;

    createConfetti();

    createFireworks();

});

/*========================
DUA
========================*/

document.getElementById("duaBack")
.addEventListener("click",()=>{

    showPage("cake");

});

document.getElementById("duaNext")
.addEventListener("click",()=>{

    showPage("final");

    createConfetti();

    createFireworks();

});

/*========================
FINAL
========================*/

document.getElementById("restart")
.addEventListener("click",()=>{

    if(bgMusic){

        bgMusic.pause();

        bgMusic.currentTime=0;

    }

    if(cakeMessage){

        cakeMessage.innerHTML="";

    }

    if(letterContent){

        letterContent.style.display="none";

    }

    if(envelope){

        envelope.classList.remove("open");

    }

    showPage("home");

});

/*========================
START
========================*/

showPage("home");
/*=========================================
SCRIPT.JS
PART 4
HEARTS • LIGHTBOX • CONFETTI • FIREWORKS
=========================================*/

/*========================
LIGHTBOX
========================*/

const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const closeLightbox=document.getElementById("closeLightbox");

document.querySelectorAll(".memory-photo").forEach(img=>{

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

/*========================
FLOATING HEARTS
========================*/

const hearts=document.getElementById("hearts");

function createHeart(){

    const heart=document.createElement("div");

    heart.className="heart";

    heart.innerHTML="❤";

    heart.style.left=Math.random()*100+"%";

    heart.style.fontSize=(18+Math.random()*18)+"px";

    heart.style.animationDuration=(6+Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },11000);

}

setInterval(createHeart,700);

/*========================
CONFETTI
========================*/

const confetti=document.getElementById("confetti");

function createConfetti(){

    for(let i=0;i<120;i++){

        const piece=document.createElement("div");

        piece.style.position="absolute";

        piece.style.left=Math.random()*100+"%";

        piece.style.top="-20px";

        piece.style.width="10px";

        piece.style.height="10px";

        piece.style.borderRadius="50%";

        piece.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        piece.style.animation=
        `fall ${3+Math.random()*2}s linear forwards`;

        confetti.appendChild(piece);

        setTimeout(()=>{

            piece.remove();

        },5000);

    }

}

/*========================
FIREWORKS
========================*/

const fireworks=document.getElementById("fireworks");

function createFireworks(){

    for(let i=0;i<30;i++){

        const spark=document.createElement("div");

        spark.style.position="absolute";

        spark.style.left=Math.random()*100+"%";

        spark.style.top=Math.random()*70+"%";

        spark.style.width="8px";

        spark.style.height="8px";

        spark.style.borderRadius="50%";

        spark.style.background=
        `hsl(${Math.random()*360},100%,60%)`;

        spark.style.animation=
        "explode 1s ease-out forwards";

        fireworks.appendChild(spark);

        setTimeout(()=>{

            spark.remove();

        },1000);

    }

}

/*========================
IMAGE DRAG OFF
========================*/

document.querySelectorAll("img").forEach(img=>{

    img.setAttribute("draggable","false");

});
const finalImages=[

"Ali0.jpeg",
"Ali01.jpeg",
"Ali02.jpeg",
"Ali03.jpeg",
"Ali04.jpeg",

];

let slide=0;

setInterval(()=>{

const img=document.getElementById("finalSlide");

if(img){

slide=(slide+1)%finalImages.length;

img.src=finalImages[slide];

}

},2500);
/*========================
CONSOLE
========================*/
document
.getElementById("secretGift")
.addEventListener("click",()=>{

alert(

"No matter where life takes us...\n\nYou'll always be my favourite person.\n\nHappy Birthday Ali ❤️\n\n— Alishba"

);

});
console.log("❤️ Happy Birthday Ali Website Loaded ❤️");
/* Secret Gift */

/* ==========================
   SECRET GIFT
========================== */

const prayerMessage = `🌙

Ya Allah,

If Ali ever feels sad,
be his comfort.

If he feels weak,
be his strength.

If he loses hope,
guide him back to You.

Bless his life with happiness,

Good Health,

Halal Rizq,

Strong Iman,

Peace,

and endless success.

Ameen 🤲❤️

────────────────

I asked Allah to protect
the person reading this.

❤️
`;

const prayer = document.getElementById("prayerText");
const lastPrayer = document.getElementById("lastPrayer");
const popup = document.getElementById("giftPopup");
const close = document.getElementById("closeGift");
const gift = document.getElementById("secretGift");

gift.onclick = () => {

    popup.classList.add("active");

    close.style.display = "none";

    createConfetti();

    createFireworks();

    lastPrayer.style.display = "none";

    prayer.textContent = "";

    // Agar popup dobara open ho to purana ending remove ho jaye
    const oldEnding = document.querySelector(".final-glow");
    if(oldEnding){
        oldEnding.remove();
    }

    setTimeout(() => {

        lastPrayer.style.display = "block";

        let i = 0;

        const typing = setInterval(() => {

            prayer.textContent += prayerMessage.charAt(i);

            i++;

            if(i >= prayerMessage.length){

                clearInterval(typing);

                // Final Message
                const final = document.createElement("h2");

                final.className = "final-glow";

                final.innerHTML = `
                ❤️ Happy Birthday Ali ❤️
                <br><br>
                Made with Love,<br>
                Countless Prayers,<br>
                and Every Beat of My Heart ❤️
                <br><br>
                — Alishba
                `;

                lastPrayer.appendChild(final);

                // Close button show
                close.style.display = "inline-block";

            }

        },35);

    },5000);

};

close.onclick = () => {

    popup.classList.remove("active");

};