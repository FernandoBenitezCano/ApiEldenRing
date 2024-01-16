let APIurl = "https://eldenring.fanapis.com/api/npcs?limit=100";
let json;
let personajesLista = document.getElementById("personajesLista");

let imgVer=document.getElementById("imgVer");
let nomPer=document.getElementById("nomPer");
let locPer=document.getElementById("locPer");
let rolPer=document.getElementById("rolPer");
let quotePer=document.getElementById("quotePer");

const Get = async (API) => {
    let result = await fetch(API)
    let data = await result.json();
    return data;
}

async function getPersonajes() {
    json = await Get(APIurl);

    for (let index = 0; index < json.count; index++) {
        if (json.data[index].image) {
            //Carta Bootstrap
            let carta = document.createElement("div");
            carta.id = json.data[index].id;
            carta.dataset.toggle="modal";
            carta.dataset.target="#modalProducto";
            carta.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
                'card', 'mt-1', 'mb-1', 'mx-1', 'charactere',"pointCard");
            
            //Img Tarjeta
            let img = document.createElement("img");
            img.classList.add('card-img-top', 'img-fluid', 'img-charactere', 'rounded', 'mt-4');
            img.src = json.data[index].image;
            img.style.width = '100%';
            img.style.height = '150px';
            carta.appendChild(img);
            //Cuerpo texto
            let divTexto = document.createElement("div");
            divTexto.classList.add("card-body");
            //Texto
            let pTexto = document.createElement("h3");
            pTexto.classList.add("card-text", "text-center");
            pTexto.innerText = json.data[index].name;
            divTexto.appendChild(pTexto);
            
            carta.appendChild(divTexto);

            carta.addEventListener("click",function () {
                llenarModal(index);
            });

            personajesLista.appendChild(carta);
        };

        const personajesDivs = document.querySelectorAll('.charactere');
        let maxHeight = 0;

        personajesDivs.forEach(div => {
            const divHeight = div.offsetHeight;
            if (divHeight > maxHeight) {
                maxHeight = divHeight;
            }
        });

        personajesDivs.forEach(div => {
            div.style.height = `${maxHeight}px`;
        });
    }
}

function llenarModal(index){
    imgVer.src=json.data[index].image;
    nomPer.innerText=json.data[index].name;
    locPer.innerText=json.data[index].location;
    rolPer.innerText=json.data[index].role;
    if(json.data[index].quote!=null){
        quotePer.innerText=`${json.data[index].quote}`;
    }else{
        quotePer.innerText=`No tiene cita`;
    }
    
}

getPersonajes();