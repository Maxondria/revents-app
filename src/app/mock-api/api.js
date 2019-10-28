import { DB } from "./DB";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const mockFetch = () => delay(2000).then(() => Promise.resolve(DB));
