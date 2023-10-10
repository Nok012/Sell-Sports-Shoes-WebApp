
export interface oder {
    _id: string;
    date: string;
    totalPrice: number;
    user: string;
    totalShoe: [{ 
        shoe: string,
        quantity: number
    }];
}

export type oders = oder[];