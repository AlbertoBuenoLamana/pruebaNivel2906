import { environment } from './../environments/environment';
/**
 * Constantes del proyecto.
 */
export const SERVER_PATH: string = environment.server_api_url;
export const PRODUCTION: boolean = environment.production;
export const LOCAL: boolean = !environment.production;

