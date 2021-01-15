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

function ratingSubmit(card_id, rating_id, id_r){
    let header = document.getElementById("ratings_label"+card_id);
    let value = parseInt(header.innerText.match(/\d+/)[0]) + 1;
    header.innerHTML = value + " ratings";
    changeRatings(card_id, id_r);
    afterSubmit(card_id);
    let url = "http://localhost:5000/rating/restaurants/" + id_r + "/" + rating_id;
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


async function markAsFavoriteSubmit(id_user, card_id, id_restaurant){
    let label = document.getElementById("label" + (card_id-1));
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

function afterSubmit(card_id){
    for(let j = 5; j > 0; j--){
        let label_star = document.getElementById("star" + j + card_id);
        label_star.removeAttribute("onclick");
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

async function getNameOfRestaurant(id_r){

    let url =  "http://localhost:5000/markAsFavorite/restaurants/restaurantName/" + id_r;
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



async function putOnPageFavoritesRestaurants(signedIn){
    if(signedIn){
        let avg = 0;
        let suma = 0;
        let noround_avg;
        let count_restuarants = 1;
        let r = await getFavoritesRestaurants(signedIn);
        console.log(r[0].id_r);
        console.log(r[0].nume);
        let len_r = r.length;
        let container = document.getElementsByClassName("container");
        for(let i = 0; i < len_r; i++) {
            if (count_restuarants % 2 === 1) {
                let create_div_row = document.createElement('div');
                create_div_row.setAttribute("class", "row");
                container[0].append(create_div_row);
            }

            let div_row = document.getElementsByClassName("row");

            let div2 = document.createElement('div');
            div2.setAttribute("class", "col-lg-3 col-md-4 col-6");

            let a_href = document.createElement('a');
            a_href.setAttribute("href", "#");
            a_href.setAttribute("class", "d-block mb-4 h-100");

            let div3 = document.createElement('div');
            div3.setAttribute("class", "box");

            let div4 = document.createElement('div');
            div4.setAttribute("class", "imgBx");

            let nume_rest = r[i].nume;
            nume_rest = nume_rest.toLowerCase();
            nume_rest = nume_rest.replace(/\s/g, '');
            nume_rest = nume_rest + ".jpg";

            let img = document.createElement('img');
            img.setAttribute("class", "img-fluid img-thumbnail");
            img.setAttribute("alt", "");
            img.setAttribute("src", nume_rest);

            div4.appendChild(img);
            div3.appendChild(div4);
            a_href.appendChild(div3);
            div2.appendChild(a_href);

            let div_col3 = document.createElement('div');
            div_col3.setAttribute("class", "col-3");

            let h4 = document.createElement('h4');
            h4.innerHTML = r[i].nume;

            let p = document.createElement('p');
            p.innerHTML = r[i].adresa;

            let br1 = document.createElement('br');
            let br2 = document.createElement('br');

            let a_class = document.createElement('a');
            a_class.setAttribute("class", "btn btn-primary");
            a_class.setAttribute("href", r[i].link);
            a_class.setAttribute("role", "button");
            a_class.innerHTML = "Reservation";

            div_col3.appendChild(h4);
            div_col3.innerHTML += '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-geo-alt" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.166 8.94C12.696 7.867 13 6.862 13 6A5 5 0 0 0 3 6c0 .862.305 1.867.834 2.94.524 1.062 1.234 2.12 1.96 3.07A31.481 31.481 0 0 0 8 14.58l.208-.22a31.493 31.493 0 0 0 1.998-2.35c.726-.95 1.436-2.008 1.96-3.07zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path> <path fill-rule="evenodd" d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path> </svg>'
            div_col3.appendChild(p);
            div_col3.appendChild(br1);
            div_col3.appendChild(br2);
            div_col3.appendChild(a_class);

            div_row[div_row.length - 1].append(div2);
            div_row[div_row.length - 1].append(div_col3);

            count_restuarants++;

            suma = r[i].rating_1 + r[i].rating_2 + r[i].rating_3 + r[i].rating_4 + r[i].rating_5;
            if (suma !== 0) {
                noround_avg = (r[i].rating_1 + r[i].rating_2 * 2 + r[i].rating_3 * 3 + r[i].rating_4 * 4 + r[i].rating_5 * 5) / suma;
                avg = Math.round(noround_avg);
            } else {
                noround_avg = 0;
                avg = 0;
            }
            let newDiv = document.createElement('div');
            newDiv.setAttribute("class", "rate");

            let ratings_number = document.createElement('h1');
            ratings_number.setAttribute("class", "ratings");
            ratings_number.setAttribute("id", "ratings_label" + (i+1));
            ratings_number.innerHTML = suma + " ratings";
            for (let j = 5; j > 0; j--) {
                let value = "star" + j + (i+1);
                let input = document.createElement('input');
                input.setAttribute("type", "radio");
                input.setAttribute("id", value);
                input.setAttribute("name", "rate");
                input.setAttribute("value", String(j));

                input.setAttribute("onclick", "ratingSubmit(" + (i+1) + ", " + j + ", " + r[i].id_r + ")");

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
            div_col3.appendChild(newDiv);

            newDiv = document.createElement('div');
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

            label.style.color = "#d10808";

            input.setAttribute("onclick", "markAsFavoriteSubmit("+ signedIn + ", " + (i+1) + ", " + r[i].id_r + ")");

            newDiv.appendChild(input);
            newDiv.appendChild(label);

            div_col3.appendChild(newDiv);
        }
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