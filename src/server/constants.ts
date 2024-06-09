import dotenv from 'dotenv';

dotenv.config();

export const USER: string = process.env.USER ?? "";
export const HOST: string = process.env.HOST ?? "";
export const DATABASE: string = process.env.DATABASE ?? "";
export const PASSWORD: string = process.env.PASSWORD ?? "";
export const PORT: number = 5432;