import Card from "./Card";

export default interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
    password: string;
    email: string;
    imgUrl?: string;
    imgAlt?: string;
    state?: string;
    country?: string
    city?: string;
    street?: string;
    houseNumber?: number;
    zip?: number;
    role?: string;
    favCards?: number[];
}