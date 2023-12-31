export default interface Card {
    // id?: number;
    _id?: string;
    userId?: string;
    title: string;
    subTitle: string;
    description: string;
    phone: string;
    email: string;
    web?: string;
    imageUrl: string;
    imageAlt: string;
    state?: string;
    country: string
    city: string;
    street: string;
    houseNumber: number;
    zip?: number;
}