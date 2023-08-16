import axios from "axios";
import Card from "../interfaces/Card";

let api: string = `${process.env.REACT_APP_API}/cards`;

// GET all cards
export function getCards() {
    return axios.get(api);
}

// GET card by id
export function getCardByUserId(id: number) {
    // return axios.get(`${api}/${id}`);
    return axios.get(`${api}?userId=${id}`);
}

// get card by specific - id
export function getCardByCardId(id: number) {
    return axios.get(`${api}/${id}`);
}


// POST new card
export function addCard(newCard: Card) {
    return axios.post(api, newCard);
}

// PUT card by id
export function updateCard(updatedCard: Card, id: number) {
    return axios.put(`${api}/${id}`, updatedCard);
}

// DELETE card by id
export function deleteCard(id: number) {
    return axios.delete(`${api}/${id}`);
}

