import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  API_KEY: string ='null'




  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(errorRes => {
        let errorMessage = "An unknown error occurred."
        if (!errorRes.error || !errorRes.error.error ) {
          return throwError(errorMessage);
        }
        switch(errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = "This email already exists.";
            break;
        }
        return throwError(errorMessage);
    }))
  }

}