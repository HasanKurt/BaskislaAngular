import { Injectable } from '@angular/core';
import {UserForRegistrationDto} from './../../_interfaces/user/userForRegistrationDto.model'
import {RegistrationResponseDto} from './../../_interfaces/response/registrationResponseDto.model'
import {HttpClient} from '@angular/common/http'
import {EnvironmentUrlService} from './environment-url.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public createCompleteRoute = (route: string, envAddress: string) =>  `${envAddress}/${route}`;
}
