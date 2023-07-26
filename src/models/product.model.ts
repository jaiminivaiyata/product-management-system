import { Schema, model, Document } from "mongoose";

export interface Iprouduct extends Document {
    productName: string,
    productDescription: string,
    price: number,
    category: string,
    stockQuantity: number,
}

const productSchema: Schema = new Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true,
    }
})


export const Product = model<Iprouduct>("Product", productSchema);