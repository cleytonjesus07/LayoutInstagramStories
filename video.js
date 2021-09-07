function checkVideo(pause, muted, element) {
    //Checando pausa
    if (pause != null) {
        (pause) ? element.setAttribute("src", "./assets/app_img/pause.png") : element.setAttribute("src", "./assets/app_img/play.png");
        return pause;
    }
    //Checando som
    if (muted != null) {
        (muted) ? element.setAttribute("src", "./assets/app_img/volume.png") : element.setAttribute("src", "./assets/app_img/muted.png")
        return muted;
    }

}

function scale() {
    //Aumentar e diminuir story
    /*  console.log(destaque,story) */
    let destaque = document.querySelector(".destaque").getBoundingClientRect();
    let stories = document.querySelectorAll(".story");
    console.log(stories.length)
    stories.forEach((story, index) => {

        let coord = story.getBoundingClientRect();
        if (coord.left > destaque.left && coord.right < destaque.right) {
            story.style.transform = "scale(1.0)";
            /* Não é permitido auto executar o vídeo sem que o usuário interaja antes */
            /* story.children[1].children[0].play(); */
            /* gerenciadorVideo(story.children[1].children[0],index,data[index].video.length) */
        } else {
            story.style.transform = "scale(0.4)";
        }
    })
    setTimeout(scale, 1000);
}




async function gerenciadorVideo(video, index) {
    /* Checando a quantidade de vídeos por perfil e executando um por um */

    let medidorVideo = data[index].video.length;
    let linhaDoTempo = document.querySelector("#timeline" + index).children;

    if (!video.paused && count < medidorVideo) {
        linhaDoTempo[count].children[0].style.width = `${(video.currentTime * 100) / video.duration}%`;
    }

    if (video.ended) {
        count++;
        if (count < medidorVideo) {
            video.setAttribute("src", data[index].video[count].media);
            document.querySelector(".tempo-postagem").textContent = data[index].video[count].timePost + "h";
            await playVideo(video);

            gerenciadorVideo(video, index);
        } else {
            //Voltando ao início dos vídeos
            count = 0;
            video.setAttribute("src", data[index].video[count].media);
            await playVideo(video);
            gerenciadorVideo(video, index);

        }
    } else {
        setTimeout(() => gerenciadorVideo(video, index), 500);
    }


}


async function menuStoryBtn() {
    let modal = document.querySelector(".modal-screen")
    let contentModal = document.querySelector(".modal");
    $(contentModal).fadeIn();
    if (modal.style.display == "none") {

        modal.style.display = "flex";
        document.querySelector(".reportar").addEventListener("click", () => {
            let backupChildrens = document.querySelectorAll(".modal>*");
            $(contentModal.innerHTML = "<h2 style='color:#000'>Story reportado</h2>").delay(400).fadeOut("fast", () => {
                if (contentModal.outerHTML.indexOf("h2") > -1) {
                    contentModal.innerHTML = `${backupChildrens[0].outerHTML}\n${backupChildrens[1].outerHTML}`;
                }
                modal.style.display = "none"
            })
        });
        document.querySelector(".cancelOption").addEventListener("click", () => {
            $(contentModal).fadeOut("fast", () => modal.style.display = "none");
        })

    }
}

async function playVideo(video) {
    await video.play();
}

function pauseVideo(video) {
    video.pause();
}