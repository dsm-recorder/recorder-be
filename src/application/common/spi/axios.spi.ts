import { ProjectGithubAxiosPort } from '../../domain/project/spi/project.spi';
import { OAuthAxiosPort } from '../../domain/auth/spi/auth.spi';
import { SpellAxiosPort } from '../../domain/spell/spi/spell.spi';

export interface AxiosPort extends ProjectGithubAxiosPort, OAuthAxiosPort, SpellAxiosPort {}

export const AxiosPort = Symbol('IAxiosPort');
