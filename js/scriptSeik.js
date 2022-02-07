let map = [];
let lohi = true;
let rohkeus = false;
let aviesti = true;
let spagetti = false;
let tele = false;
let loitsu = false;
let vp = false;
let pauki = false;

map[0] = "Vanha linnan torni";
map[1] = "Syvä kaivo";
map[2] = "Aurinkoinen metsäaukio";
map[3] = "Nukkuva lohikäärme";
map[4] = "Kapea metsäpolku";
map[5] = "Vanha portti";
map[6] = "Joen ranta";
map[7] = "Tyhjä puupenkki";
map[8] = "Vanha mökki, sisältä kuuluu hiljaista musiikkia";


const images = [];

images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "portti.jpg";
images[6] = "joki.jpg";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";


const blockMessage = [];

blockMessage[0] = "Haluamasi reitti on liian vaarallinen.";
blockMessage[1] = "Salaperäinen voima estää liikkumisen tuohon suuntaan.";
blockMessage[2] = "Vaikeakulkuinen pusikko estää etenemisen.";
blockMessage[3] = "Et pääse ohittamaan lohikäärmettä siltä puolelta.";
blockMessage[4] = "";
blockMessage[5] = "Portti sulkeutui. Millähän kikalla sen saisi auki?";
blockMessage[6] = "Joki on liian syvä ylitettäväksi";
blockMessage[7] = "Metsä on liian tiheä läpäistäväksi.";
blockMessage[8] = "Olet liian peloissasi mennäksesi tuohon suuntaan. Ehkäpä tästä voisi jatkaa etelään, kun olet kerännyt tarpeeksi rohkeutta";







// Pelaajan käytössä olevat toiminnot
let actionsForPlayer = ["pohjoinen", "itä", "etelä", "länsi", "poimi", "käytä", "pudota"];
let action = "";

// Käytettävissä olevat esineet ja niiden sijainti
let items = ["huilu", "mystinen kivi", "miekka"];
let itemLocations = [1, 6, 8];

let backPack = [];
let knownItems = ["huilu", "mystinen kivi", "miekka"];
let item = "";

// Sijainti pelin alussa
let mapLocation = 4;
//let mapLocation = 4;
console.log(map[mapLocation]);

//Pelaajan syöte
let playersInput = "";

// Pelin viesti
let gameMessage = "";



// Käyttöliittymäelementit
let image = document.querySelector("img");
let input = document.querySelector("#input");
let output = document.querySelector("#output");
let button = document.querySelector("button");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);
document.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        document.querySelector("button").click();
    }
});

// output.innerHTML = "Sijaintisi: " + map[mapLocation]; 

render();

function clickHandler() {
    console.log("Nappia painettu");
    playGame();
}

function playGame() {
    

    if (pauki === true) {
        map[9] = "Tallipiha"
        images[9] = "noita.jpg";
        blockMessage[9] = "Tallipihalta ei pääse eteenpäin"
        
        
    } 

    if (rohkeus === true){
        map[10] = "Kukkapenkki"
        images[10] = "kukkapenkki.jpg"
        blockMessage[10] = "Tie päättyy kukkapenkille"
        gameMessage = "Saavuit aarnion kukkapenkille "
    }


    // Lue pelaajan syöte ja muuta se pienillä kirjaimilla kirjoitetuksi
    playersInput = input.value.toLowerCase();

    // Nollaa muuttujat, jotta edelliseltä kierrokselta ei tule väärää infoa
    gameMessage = "";
    action = "";

    // Tarkasta käyttäjän syöte, löytyykö se hyväksytyistä toiminnoista
    for (i = 0; i < actionsForPlayer.length; i++) 
    {
        if (playersInput.indexOf(actionsForPlayer[i]) !== -1) 
        {
            action = actionsForPlayer[i];
            console.log("Pelaajan valinta oli: " + action);
            break;
        }
    }
    // Selvitä mikä on esine jonka pelaaja haluaa
    for (i = 0; i < knownItems.length; i++) 
    {
        if (playersInput.indexOf(knownItems[i]) !== -1) 
        {
            item = knownItems[i];
            console.log("Pelaaja valitsi esineen: " + item);
        }
    }

    switch (action) {
        case "pohjoinen":
            if (mapLocation >= 3 && mapLocation !== 9 && mapLocation !== 10 && mapLocation !== 9) {
                mapLocation -= 3; // sama kuin mapLocation = mapLocation - 3;
            }    
            else if (mapLocation === 10) {
                mapLocation -= 2;
            }

            else {
                gameMessage = blockMessage[mapLocation];
            }
            break;

        case "itä":
            if (mapLocation % 3 != 2 && mapLocation !==10 && mapLocation !== 9) {
                mapLocation += 1;
            }
            else if (mapLocation === 5 && pauki === true && mapLocation !== 10 && mapLocation !== 9){
                mapLocation += 4;
            }
            else {
                gameMessage = blockMessage[mapLocation];
            }
            break;

        case "etelä":
            if (mapLocation < 6) {
                mapLocation += 3;
            } 
            else if (mapLocation === 8 && rohkeus === true) {
                mapLocation += 2;
            }
            else {
                gameMessage = blockMessage[mapLocation];
            }
            break;

        case "länsi":
            if (mapLocation % 3 != 0 && mapLocation !== 10) {
                mapLocation -= 1;
            } 
            else if (mapLocation === 9) {
                mapLocation -=4;
            }
            else {
                gameMessage = blockMessage[mapLocation];
            }
            break;

        case "poimi":
            takeItem();
            break;

        case "käytä":
            useItem();
            break;

        case "pudota":
            dropItem();
            break;

        default:
            gameMessage = "Tuntematon toiminto";

    }

    render();
    console.log(lohi)
}

function takeItem() {
    let itemIndexNumber = items.indexOf(item);

    if (itemIndexNumber !== -1 &&
        itemLocations[itemIndexNumber] === mapLocation) {
        gameMessage = "Poimit esineen " + item + ".";

        backPack.push(item);

        items.splice(itemIndexNumber, 1);
        itemLocations.splice(itemIndexNumber, 1);

        if(item === "mystinen kivi" || item === "huilu"){
            gameMessage += "<br>Mihinköhän tätä voisi käyttää?"
        }

        //for(i = 0; i < items.length; i++){
        //  if(mapLocation === itemLocations[i]){
        //    backPack.push(items[i]);
        //  index = i;
        //itemLocations.splice(index, 1);
    } 
    else 
    {
        gameMessage = "Et voi tehdä tätä toimenpidettä.";
    }


    console.log(items)
    console.log(item)
    console.log(itemIndexNumber)
    //console.log(mapLocation)
    //console.log(itemLocations)
    console.log(backPack)
}


function dropItem() {
    if (backPack.length !== 0) {
        // Etsi repusta tekstikentässä mainitun esineen index
        var backPackIndexNumber = backPack.indexOf(item);

        // Esine löytyi jos index ei ole -1
        if (backPackIndexNumber !== -1) {
            // Kerro pelaajalle että esine on pudotettu
            gameMessage = "Pudotit esineen: " + item + ".";

            // Siirrä esine repusta peliympäristöön
            items.push(backPack[backPackIndexNumber]);
            itemLocations.push(mapLocation);

            // Poista esine repusta
            backPack.splice(backPackIndexNumber, 1);
        } else {
            // Viesti jos yritetään pudottaa
            // esinettä joka ei ole repussa
            gameMessage = "Et voi tehdä tätä.";
        }
    } else {
        // Viesti jos reppu on tyhjä
        gameMessage = "Sinulla ei ole mitään mukana.";
    }
    console.log(backPack)
    console.log(itemLocations)
}

function useItem() {
    // Selvitä onko esine mukana
    // selvittämällä esineen index
    var backPackIndexNumber = backPack.indexOf(item);

    // Jos index sai arvon -1 esine ei ole mukana
    if (backPackIndexNumber === -1) {
        gameMessage = "Sinulla ei ole sitä mukana.";
    }
    // Jos repussa ei ole mitään kerro se
    if (backPack.length === 0) {
        gameMessage += " Sinulla ei ole mitään mukana.";
    }
    // Jos esine on mukana, mitä sillä voi tehdä...
    if (backPackIndexNumber !== -1) {
        switch (item) 
        {
            case "huilu":
                if(mapLocation === 10){
                    gameMessage += "Soitat huilulla teleportaatioloitsun ja pakenet Aarnion pihalta takaisin kapealle metsäpolulle ";
                    tele = true;
                }
                else if(mapLocation === 5){
                    gameMessage += "Soitat huiluasi ja huomaat kuinka portti avautuu"
                    pauki = true;
                }

                else if(loitsu === true && vp === false){
                    document.getElementById('kuva').style.transform = "rotateX(180deg)";
                    document.getElementById('kuva').style.transition = "3s";
                    gameMessage = "Käytät noidan opettamaa loitsua ja huomaat kuinka koko maailma kääntyy ylösalaisin. <br>Oliko tässä nyt taas mitään järkeä?"
                    vp = true;
                }
                else if(vp === true){
                    document.getElementById('kuva').style.transform = "rotateX(0deg)";
                    document.getElementById('kuva').style.transition = "3s";
                    vp = false;
                }

                else {
                gameMessage = "Kaunis musiikki kaikuu ympärilläsi.";
                }
                
                break;

            case "miekka":
                if (mapLocation === 3) {
                    gameMessage = "Heilautat miekkaasi ja tapat lohikäärmeen! <br><br> Huomaat samalla kuinka joku epämääräinen möykky lentää läheisen linnan tornille";
                    lohi = false;
                    spagetti = true;
                }
                else if (mapLocation === 0 && lohi === false) {
                    gameMessage = "Lyöt miekallasi spagettihirviön keskeltä kahti. <br><br><em>Kaadettuasi lohikäärmeen ja spagettihirviön, huomaat kuinka suuri rohkeus valtaa kehosi</em> "
                    rohkeus = true;
                    spagetti = false;
                }
                
                else 
                {
                    gameMessage = "Heiluttelet miekaasi tylsistyneenä.";
                }
                break;

            case "mystinen kivi":
                if (mapLocation === 1) 
                {
                    gameMessage = "Pudotat kiven kaivoon.";

                    // Poista kivi repusta
                    backPack.splice(backPackIndexNumber, 1);
                }
                else if (mapLocation === 9){
                    gameMessage = "Annat noidalle kiven ja hän opettaa sinulle loitsun jonka voit soittaa huilullasi"
                    loitsu = true;
                    backPack.splice(backPackIndexNumber, 1);
                } 
                else 
                {
                    gameMessage
                        = "Pyörittelet kiveä taskussasi.";
                }
                break;
        }
        
    }
    
}

        //itemLocations.push(mapLocation)
        //for (i = 0; i < items.length; i++) {
        //  index = i;
        //backPack.splice(index, 1);
        //}



 



function render() {
    // Päivitä sijainti
    if(mapLocation === 10){
        if (aviesti === true) {
        gameMessage += "Saavuit Aarnion kukkapenkille. Matka taitaa tyssätä tähän sillä Aarnio ei pidä yllätysvieraista.";
        gameMessage += " Toivottavasti sinulla on mukana jotain millä voit pelastaa itsesi";
        aviesti = false;
        }
        else if(tele === true){
            mapLocation = 4;
            tele = false;
            output.innerHTML = "Sijaintisi: " + map[mapLocation];
        }
    }
    
    else if(mapLocation === 9){
        if (aviesti === true){
        gameMessage += "Saavuit tallipihalle jossa tapaat noidan. <br><em>Noita on valmis opettamaan sinulle loitsun, jos sinulla on jotain mitä vaihtaa hänen kanssaan tätä loitsua vastaan</em> "
        aviesti = false;
        }
    }

    
    else if (mapLocation === 0 && lohi === false && spagetti === true) {
        images[0] = "tornispagetti.jpg";
        map[0] = "Vanha linnan torni jota vartioi nyt lentävä spagettihirviö";
    }
    else {
        images[0] = "torni.jpg";
        map[0] = "Vanha linnan torni"
        aviesti = true;
    }
    image.src = ("images/" + images[mapLocation]);
    output.innerHTML = "Sijaintisi: " + map[mapLocation];

    // Jos repussasi on tavaroita tulosta se näytölle
    if (backPack.length != 0) {
        output.innerHTML += "<br>Mukanasi on: " + backPack.join(", ");
    }

    
    
    
    // Käy läpi esineiden lokaatio-array ja etsi vastaavuutta
    for (var i = 0; i < items.length; i++) {
        if (mapLocation === itemLocations[i]) 
        {
            output.innerHTML += "<br> Näet esineen joka on: <strong>" + items[i] + "</strong>";
        }
    }
    output.innerHTML += "<br><em>" + gameMessage + "</em>";
    
    //output.innerHTML += "<br><em>" + gameMessage + "</em>";
    
    console.log(backPack.length)
    console.log("Sijaintinumero " + mapLocation)
    console.log("Rohkeus: " + rohkeus)
    console.log("loitsu: "+ loitsu)
    console.log("gamemessage: " + gameMessage)

}