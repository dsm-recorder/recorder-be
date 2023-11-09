import axios from 'axios';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

export async function getAndHandleError<T = any>(url: string): Promise<T> {
    return await axios
        .get<T>(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.request.res.statusCode === 404) {
                throw new NotFoundException(error.request.statusMessage);
            } else {
                console.log(error);
                throw new InternalServerErrorException(error.request.statusMessage);
            }
        });
}
