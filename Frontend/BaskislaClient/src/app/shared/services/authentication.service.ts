import { Injectable } from '@angular/core';
import {UserForRegistrationDto} from './../../_interfaces/user/userForRegistrationDto.model'
import {RegistrationResponseDto} from './../../_interfaces/response/registrationResponseDto.model'
import {HttpClient} from '@angular/common/http'
import {EnvironmentUrlService} from './environment-url.service'
import { AuthResponseDto } from 'src/app/_interfaces/response/authResponseDto.model';
import { UserForAuthenticationDto } from 'src/app/_interfaces/user/userForAuthenticationDto.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>();
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _http: HttpClient, private _envUrl: EnvironmentUrlService) { }

  public registerUser = (route: string, body: UserForRegistrationDto) => {
    return this._http.post<RegistrationResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public loginUser = (route: string, body: UserForAuthenticationDto) =>{
    return this._http.post<AuthResponseDto>(this.createCompleteRoute(route, this._envUrl.urlAddress), body);
  }

  public logout = () => {
    localStorage.removeItem('token');
    this.sendAuthStateChangeNotification(false);
  }

  public sendAuthStateChangeNotification = (isAuthenticated: boolean) => {
    this._authChangeSub.next(isAuthenticated);
  }

  public createCompleteRoute = (route: string, envAddress: string) =>  `${envAddress}/${route}`;
}
