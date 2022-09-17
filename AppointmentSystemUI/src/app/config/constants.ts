// Angular Modules
import { environment } from '../../environments/environment';

export abstract class Constants {

  private static readonly API_DEV: string = 'http://localhost:49537/api';
  private static readonly API_PROD: string = 'http://localhost:49537/api';

  private static readonly TESTING_MODE: boolean = false;


  public static get API_URL(): string {
    return environment.production ? this.API_PROD : this.API_DEV;
  }
}
