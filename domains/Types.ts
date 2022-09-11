export type Product = {
    name: string;
    point: number;
    uuid: string;
    company: string;
    img: string;
    tags?: string[]
}
export type Price = {
    price: number;
}

export type RequestTransasction = {
    url: string;
    transctionUUID: string
}

export type Wallet = {
    address: string;
    balance: number;
}

export type NFT = {
    uuid: string;
    point: number;
    products: string[]
}
