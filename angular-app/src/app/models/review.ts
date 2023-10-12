// src/app/review.model.ts

// import ObjectId from 'bson-objectid';

export interface review {
    _id: string;
    shoeName: any;
    customerEmail: string;
    rating: number;
    comment: string;
    img: string;
    datePosted: Date;
}

export type reviews = review[];