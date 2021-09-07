

let slide = document.querySelector(".slide");
const containerStory = document.querySelector(".container-story");
let timer = document.querySelector(".time");
let loadingScreen = document.querySelector(".loading-screen");
const basePath = "./assets/profiles/";
let count = 0;
const date = new Date();
let data = []

loadingManager();

window.onload = async () => {
    if (confirm("OK - Utilizar Json Server (Ainda em desenvolvimento)\nCancelar - Utilizar dados fixos (Recomendado para teste).")) {
        data = await connectJsonServer();
        return;
    }
    data.push({
        nome: "cleyton_jesus07",
        pic: `${basePath}cleyton_jesus07/imgs/profilePic.jpg`,
        perfilLink: "https://www.instagram.com/cleyton_jesus07/",
        video: [
            {
                media: `${basePath}cleyton_jesus07/media/soldierDream.mp4`,
                timePost: date.getHours()
            },
            {
                media: `${basePath}cleyton_jesus07/media/reinoDeAtena.mp4`,
                timePost: date.getHours()
            },
            {
                media: `${basePath}cleyton_jesus07/media/saintSeya.mp4`,
                timePost: date.getHours()
            }
        ]
    },
        {
            nome: "tylerrjoseph",
            pic: `${basePath}tylerrjoseph/imgs/profilePic.jpg`,
            perfilLink: "https://www.instagram.com/tylerrjoseph/?hl=pt",
            video: [
                {
                    media: `${basePath}tylerrjoseph/media/stressedOut.mp4`,
                    timePost: date.getHours()
                },
                {
                    media: `${basePath}tylerrjoseph/media/noChances.mp4`,
                    timePost: date.getHours()
                }
            ]
        },
        {
            nome: "marlene.euc",
            pic: `${basePath}marlene.euc/imgs/profilePic.jpg`,
            perfilLink: "https://www.instagram.com/marlene.euc/",
            video: [
                {
                    media: `${basePath}marlene.euc/media/salesSales.mp4`,
                    timePost: date.getHours()
                }
            ]
        })
}

function loadingManager() {

    if (document.readyState == "complete") {
        loadingScreen.style.display = "none";
        montarStory();

    } else {

        loadingScreen.style.display = "flex";
        document.querySelector(".screen").style.opacity = 1;
        setTimeout(loadingManager, 1000);
    }
}

function montarStory() {
    containerStory.style.width = `${document.body.clientWidth * data.length}px`;


    data.forEach((obj, index) => {
        containerStory.insertAdjacentHTML("afterbegin", `<div class="story">
        <div class="timeline-container">
            <div class="timeline" id="timeline${index}">
               <!--  <div class="line">
                    <div class="time"></div>
                </div> -->
            </div>
            <div class="perfil-info">
                <div class="img">
                    <a href="${obj.pic}"><img src="${obj.pic}" alt="imagem de perfil"></a>
                </div>
                <div class="perfil-name">
                    <div class="name">
                          <a href="${obj.perfilLink}">${obj.nome}</a>
                    </div>
                  
                    <time class="tempo-postagem">${obj.video[count].timePost} h</time>
                    <div class="controls-btns">
                        <img id="play" src="./assets/app_img/play.png">
                        <img id="sound" src="./assets/app_img/volume.png">
                        <img id="menu" src="./assets/app_img/dots.png">
                    </div>
                </div>
              
            </div>
        </div>
        <div class="story-content">
            
        </div>
    </div>`)
        let timeline = document.querySelector(".timeline");
        for (let i = 0; i < obj.video.length; i++) {
            let line = document.createElement("div");
            let timeElement = document.createElement("div");
            line.setAttribute("id", "line" + i);
            timeElement.setAttribute("id", "time" + i);
            line.setAttribute("class", "line");
            timeElement.setAttribute("class", "time");
            timeline.appendChild(line);
            line.appendChild(timeElement);
        }
        let content = document.querySelector(".story-content");
        let videoElement = document.createElement("video");
        videoElement.setAttribute("src", obj.video[count].media);
        videoElement.id = "video" + index;
        videoElement.controls = true;
        videoElement.setAttribute("class", "video-profile")

        content.appendChild(videoElement);

        let play = document.getElementById("play");
        let sound = document.getElementById("sound");
        let menu = document.getElementById("menu");
        let video = document.getElementById("video" + index);
     
        $(play).on("click", async () => {
            (checkVideo(video.paused, null, play)) ? video.play() : video.pause();
            gerenciadorVideo(video,index);
        })

        $(sound).on("click", () => {
            (checkVideo(null, video.muted, sound)) ? video.muted = false : video.muted = true;
        })

        $(menu).on("click", menuStoryBtn)
        
    })

    /* play.addEventListener("click", async () => playVideoBtn(document.querySelector("video")))
     */
    /*  sound.addEventListener("click", () => soundVideoBtn(document.querySelector("video"))) */
    /*  menu.addEventListener("click", () => )) */
    document.querySelector(".modal-screen").addEventListener("click", (e) => menuStoryBtn(e.target, document.querySelector("video")));

    scale();
}

