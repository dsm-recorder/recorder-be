import { ProjectGithubAxiosPort } from '../../domain/project/spi/project.spi';
import { OAuthAxiosPort } from '../../domain/auth/spi/auth.spi';

export interface AxiosPort extends ProjectGithubAxiosPort, OAuthAxiosPort {}

export const AxiosPort = Symbol('IAxiosPort');
