import {request} from 'graphql-request';
import { RequestDocument } from 'graphql-request/dist/types';

export const apiClient = async <T>(query: RequestDocument, variables?: any) : Promise<T> => {
    const result = (await request(process.env.API_URL, query, variables));
    return result[Object.keys(result)[0]];
}