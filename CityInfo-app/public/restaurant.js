function ratingSubmit(card_id, rating_id, id_r){
    let header = document.getElementById("ratings_label"+card_id);
    let value = parseInt(header.innerText.match(/\d+/)[0]) + 1;
    header.innerHTML = value + " ratings";
    changeRatings(card_id, id_r);
    afterSubmit(card_id);
    let url = "http://localhost:5000/rating/restaurants/" + card_id + "/" + rating_id;
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            authorization: 'Bearer 123abc456def'
        },
    }).then(response => {
        console.log(response)
    }).catch(err => {
        console.log(err)
    })
}

function notSigedIned(card_id){
    let reservation_Buttons = document.getElementsByClassName("col-3");
    let notSigedIned_label = document.createElement('h1');
    if(document.getElementById("notSigedIned-label" + card_id) === null) {
        notSigedIned_label.setAttribute("class", "notSigedIned-label");
        notSigedIned_label.setAttribute("id", "notSigedIned-label" + card_id);
        notSigedIned_label.innerHTML = "You need to be sign ined to rate or add as favorite";
        reservation_Buttons[card_id - 1].appendChild(notSigedIned_label);
    }
}

function afterSubmit(card_id){
    for(let j = 5; j > 0; j--){
        let label_star = document.getElementById("star" + j + card_id);
        label_star.removeAttribute("onclick");
    }
}

async function getRatinsCount(id_r) {
    let url = "http://localhost:5000/rating/restaurants/" + id_r + "/" + "average";
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getRatings() {
    let url = "http://localhost:5000/rating/restaurants/average";
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function changeRatings(card_id, id_r){
    let result = await getRatinsCount(id_r);
    let suma = result.rating1 + result.rating2 + result.rating3 + result.rating4 + result.rating5;
    let avg;
    let no_round_avg;
    if(suma !== 0) {
        no_round_avg = (result.rating1 + result.rating2 * 2 + result.rating3 * 3 + result.rating4 * 4 + result.rating5 * 5) / suma;
        avg = Math.round(no_round_avg);
    }
    else {
        avg = 0;
    }
    for(let j = 1; j <= 5; j++){
        let label = document.getElementById("labelstar"+j+card_id);
        if(j <= avg)
            label.style.color = "#ffc600";
        else
            label.style.color = "#ccc";
    }
}

async function addRatings(sigedIn) {
    let reservation_Buttons = document.getElementsByClassName("col-3");
    let nr_id = 1;
    let avg = 0;
    let suma = 0;
    let noround_avg;
    let res = await getRatings();

    for (let i = 0, len = reservation_Buttons.length; i < len; i++) {
        suma = res.results[i].rating_1 + res.results[i].rating_2 + res.results[i].rating_3 + res.results[i].rating_4 + res.results[i].rating_5;
        if (suma !== 0) {
            noround_avg = (res.results[i].rating_1 + res.results[i].rating_2 * 2 + res.results[i].rating_3 * 3 + res.results[i].rating_4 * 4 + res.results[i].rating_5 * 5) / suma;
            avg = Math.round(noround_avg);
        } else {
            noround_avg = 0;
            avg = 0;
        }
        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", "rate");

        let ratings_number = document.createElement('h1');
        ratings_number.setAttribute("class", "ratings");
        ratings_number.setAttribute("id", "ratings_label" + nr_id);
        ratings_number.innerHTML = suma + " ratings";
        for (let j = 5; j > 0; j--) {
            let value = "star" + j + nr_id;
            let input = document.createElement('input');
            input.setAttribute("type", "radio");
            input.setAttribute("id", value);
            input.setAttribute("name", "rate");
            input.setAttribute("value", String(j));
            if(sigedIn)
                input.setAttribute("onclick", "ratingSubmit(" + nr_id + ", " + j + ", " + nr_id + ")");
            else
                input.setAttribute("onclick", "notSigedIned(" + nr_id + ")");
            let label = document.createElement('label');
            label.setAttribute("for", value);
            label.setAttribute("id", "label"+value);
            label.setAttribute("title", "");
            if(j <= avg)
                label.style.color = "#ffc600";
            newDiv.appendChild(input);
            newDiv.appendChild(label);
        }
        newDiv.appendChild(ratings_number);
        reservation_Buttons[i].append(newDiv);
        nr_id++;
    }
}

async function markRedHeart(signedIn){
    if(signedIn!==0) {
        let reservation_Buttons = document.getElementsByClassName("col-3");
        let len = reservation_Buttons.length;
        let r = await getFavoritesRestaurants(signedIn);
        if(r != null) {
            for (let i = 0; i < len; i++) {
                let ok = 0;
                let label = document.getElementById("label" + i);
                let len_r = r.length;
                for (let l = 0; l < len_r && ok === 0; l++) {
                    if ((i + 1) === r[l].id_r && label != null) {
                        label.style.color = "#d10808";
                        ok = 1;
                    }
                }
            }
        }
    }
}


async function addAsFavorite(signedIn){
    
    let reservation_Buttons = document.getElementsByClassName("col-3");  
    let len = reservation_Buttons.length;
    for (let i = 0; i < len; i++) {
        let newDiv = document.createElement('div');
        newDiv.setAttribute("class", "heart");
        let input = document.createElement('input');
        input.setAttribute("type", "radio");
        input.setAttribute("id", i);
        input.setAttribute("name", "heart");
        input.setAttribute("value", i);
        let label = document.createElement('label');
        label.setAttribute("for", i);
        label.setAttribute("id", "label"+i);
        label.setAttribute("title", "");
        if(signedIn !== 0){
            input.setAttribute("onclick", "markAsFavoriteSubmit("+ signedIn +" , " + (i+1) + ")");
        }
        else{
            input.setAttribute("onclick", "notSigedIned(" + (i+1) + ")");
            label.style.color = "#ccc";
        }
               
        newDiv.appendChild(input);
        newDiv.appendChild(label);
                
        reservation_Buttons[i].append(newDiv);   
    }
    markRedHeart(signedIn);
}

async function markAsFavoriteSubmit(id_user, id_restaurant){
    let label = document.getElementById("label" + (id_restaurant - 1));
    if(label.style.color === "rgb(209, 8, 8)"){
        label.style.color = "#ccc";
        let url = "http://localhost:5000/markAsFavorite/restaurants/" + id_user + "/" + id_restaurant;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer 123abc456def'
            },
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }else{
        label.style.color ="rgb(209, 8, 8)";
        let url = "http://localhost:5000/markAsFavorite/restaurants/" + id_user + "/" + id_restaurant;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer 123abc456def'
            },
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }
}

async function getFavoritesRestaurants(id_user){

    let url =  "http://localhost:5000/markAsFavorite/restaurants/" + id_user;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function getRestaurantName(nume){
    let url =  "http://localhost:5000/rating/restaurants/" + nume;
    try {
        const response = await fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        });
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}


async function startIfUserIsLogged(id_user){
    addAsFavorite(id_user);
    addRatings(1);
}
async function startIfUserIsNotLogged(){
    addAsFavorite(0);
    addRatings(0);
}

