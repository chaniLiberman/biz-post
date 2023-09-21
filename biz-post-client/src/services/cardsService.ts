import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

// GET all cards
export function getCards() {
    return axios.get(api);
}

// GET card by id
export function getCardByUserId(id: string) {
    return axios.get(`${api}/by-userid/${id}` , {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      }, 
    });
}

// get card by specific - id
export function getCardByCardId(id: string) {
    return axios.get(`${api}/${id}`);
}


// POST new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      }, 
    });
}

// GET card details
export function getCardDetails(id: string) {
    return axios.get(`${api}/card-details/${id}`)
}

// PUT card by id
export function updateCard(updatedCard: Card, id: string) {
    return axios.put(`${api}/my-cards/update/${id}`, updatedCard, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      }, 
    });
}

// DELETE card by id
export function deleteCard(id: string) {
    return axios.delete(`${api}/${id}` , {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      }, 
    });
}

