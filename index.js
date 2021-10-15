var objetTaches = [
    {value : "Apprendre le CSS Bilal.", 
    status: "To do",
    priority: 1},
    {value : "Empêcher Benoit de kicker tout le monde.", 
    status: "Doing",
    priority: 4},
    {value : "Arrêter de spamer le prof.", 
    status: "Doing",
    priority: 2},
    {value : "Venir à l'heure Rebecca.", 
    status: "To do",
    priority: 5},
    {value : "Arrêter d'être BG Vincent.", 
    status: "Done",
    priority: 3}    
]
var list_taches = document.getElementById('list-taches')
var prior = document.getElementsByClassName('priority')
var starChoice = document.getElementsByClassName('starplus')
var index = 0

//afficher le tableau des taches
function affichertableau(objet) {
    clearcontent('list-taches')
    objet.forEach(function(item) {
        index = objet.indexOf(item)
        list_taches.innerHTML = list_taches.innerHTML + `
            <div class="task-element">
                <div class="tachecss" id="${item.value}"> ${item.value}</div> 
                <div id="status">${item.status}</div> 
                <div class="priority"></div> 
                <button id="modifier" class="btn" onClick="formModify('${item.value}', ${index}, ${item.priority})">Modifier</button>
                <button class="btn" onClick="onClickDelete('${index}')">Supprimer</button>
            </div>
        `
    })
}
console.log(objetTaches)
affichertableau(objetTaches)
afficherPriority(objetTaches)

//ajouter tache
function onTaskSubmit() {
    var tache = document.getElementById('tache').value
    var num = document.getElementById('priority').value
    var choixListe = document.getElementById('liste-deroulante').value
    console.log(num)
    objetTaches.push({value: tache, status: choixListe, priority: Number(num)})
    affichertableau(objetTaches)
    afficherPriority(objetTaches)
}

//supprimer tache
function onClickDelete(index) {
    objetTaches.splice(index, 1)
    affichertableau(objetTaches)
    afficherPriority(objetTaches)
}

//clear un div
function clearcontent(elementID) {
    document.getElementById(elementID).innerHTML = ""
}

//modifier
function formModify(tache_a_modifier, index, num_prior) { //faire apparaître le champs de texte
    document.getElementById(tache_a_modifier).innerHTML = `
            <input type="text" id="tacheModifier" value="${tache_a_modifier}" name=""> 
            <input type="submit" value="valider" onclick="onModify(${index})"/>
        `      
    document.getElementById("status").innerHTML= `<SELECT id="liste-deroulante2" NAME="Liste">
                                                    <OPTION VALUE="">Vide
                                                    <OPTION VALUE="To do">To do
                                                    <OPTION VALUE="Done">Done
                                                    <OPTION VALUE="Doing">Doing
                                                </SELECT>`
    prior[index].innerHTML = `<input type="number" id="priorModifier" value="${num_prior}" min="0" max="5"> `
}
function onModify(index) { //modifier la valeur
    var tache_mod = document.getElementById('tacheModifier').value
    var prior_mod = document.getElementById('priorModifier').value
    var status_mod = document.getElementById('liste-deroulante2').value
    console.log(status_mod);
    objetTaches[index].value = tache_mod
    objetTaches[index].priority = Number(prior_mod)
    objetTaches[index].status = status_mod
    affichertableau(objetTaches)
    afficherPriority(objetTaches)
}

//filtrer
function filterTache(status) {
    var filterTaches = objetTaches.filter(function(objetTache){
        return objetTache.status === status
    })
    affichertableau(filterTaches)
    afficherPriority(filterTaches)
}

//bouton all pour re afficher
function filterAll() {
    affichertableau(objetTaches)
    afficherPriority(objetTaches)
}

//random
function addTaskRandom() {
    var min = 0
    var max = objetTaches.length - 1

    var random = Math.floor(Math.random() * (max - min + 1) + min)
    // console.log(random);
    var tache_random = objetTaches[random].value;
    ajouterTache(tache_random)
}
function ajouterTache(tache) {
    var min = 0
    var max = 5
    var random = Math.floor(Math.random() * (max - min + 1) + min)

    objetTaches.push({value: tache, status: "To do", priority: random})
    affichertableau(objetTaches)
    afficherPriority(objetTaches)
}

//priority
function afficherPriority(objet) {
    objet.forEach(function(item) {
        for (var i = 1; i <= item.priority; i++) {
            prior[objet.indexOf(item)].innerHTML = prior[objet.indexOf(item)].innerHTML + `
                                                    <a href="" onmouseover="mouseoverstar(${item.priority}, ${objet.indexOf(item)}, ${i})" value="${i}" class="starmoins">
                                                    <i class="fas fa-star"></i></a>
                                                `
            if (i === item.priority) {
                for (var j = i; j < 5; j++) {
                    prior[objet.indexOf(item)].innerHTML = prior[objet.indexOf(item)].innerHTML + `
                                                            <a href="" onmouseover="mouseoverstar(${item.priority}, ${objet.indexOf(item)}, ${j + 1})" value="${j}" class="starplus">
                                                            <i class="far fa-star"></i></a>
                                                        `
                }
            }
        }
    });
}
//Trier priority
function Trier(tri) {
    if (tri === "max") {
        var arrayTri = objetTaches.sort(function (a, b) {
            return b.priority - a.priority
        })
    }
    if (tri === "min") {
        var arrayTri = objetTaches.sort(function (a, b) {
            return a.priority - b.priority
        })
    }
    affichertableau(arrayTri)
    afficherPriority(arrayTri)
}
//mouseoverstar
function mouseoverstar(priority, index, mousestar) {
    // console.log(mousestar);
    // for (var i = mousestar; i >= priority; i--) {
    //     starChoice[index].setAttribute("style","background-image: url('img/star-solid.svg')");

    // }
}