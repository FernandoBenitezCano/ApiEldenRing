let APIurl = "https://eldenring.fanapis.com/api/locations?limit=100";
let json;
let localizacionesWeb = document.getElementById("localizacionesLista");

let imgVer=document.getElementById("imgVer");
let nomLoc=document.getElementById("nomLoc");
let regLoc=document.getElementById("regLoc");
let desLoc=document.getElementById("desLoc");

const Get = async (API) => {
    let result = await fetch(API)
    let data = await result.json();
    return data;
}

async function getLocalizaciones() {
    json = await Get(APIurl);

    console.log(json);
    for (let index = 0; index < json.count; index++) {
        if (json.data[index].image) {
            //Carta Bootstrap
            let carta = document.createElement("div");
            carta.id = json.data[index].id;
            carta.dataset.toggle="modal";
            carta.dataset.target="#modalProducto";
            carta.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
                'card', 'mt-1', 'mb-1', 'mx-1', 'charactere');
            
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
            let pTexto = document.createElement("p");
            pTexto.classList.add("card-text", "text-center");
            pTexto.innerText = json.data[index].name;
            divTexto.appendChild(pTexto);
            
            carta.appendChild(divTexto);

            carta.addEventListener("click",function () {
                llenarModal(index);
            });

            localizacionesWeb.appendChild(carta);
        };

        const LocationsDivs = document.querySelectorAll('.charactere');
        let maxHeight = 0;

        LocationsDivs.forEach(div => {
            const divHeight = div.offsetHeight;
            if (divHeight > maxHeight) {
                maxHeight = divHeight;
            }
        });

        LocationsDivs.forEach(div => {
            div.style.height = `${maxHeight}px`;
        });
    }
}

function llenarModal(index){
    imgVer.src=json.data[index].image;
    nomLoc.innerText=json.data[index].name;
    regLoc.innerText=json.data[index].region;
    desLoc.innerText=json.data[index].description;
}

getLocalizaciones();