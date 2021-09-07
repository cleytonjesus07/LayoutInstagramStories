async function connectJsonServer(){
    try {
        const request = await fetch("http://localhost:3000/perfis", { method: "GET" });

        if (request.status == 200) {
            const perfis = await request.json();
            return perfis;
        }else{
            console.log(request.statusText.toString())
        }


    } catch (err) {
        console.log("Deu erro: " + err)
    }

}