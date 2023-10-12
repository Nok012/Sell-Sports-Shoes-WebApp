export interface review {
    _id: string;
    shoeName: any;
    username: string;
    rating: number;
    comment: string;
    img: string;
    datePosted: Date;
}

export type reviews = review[];