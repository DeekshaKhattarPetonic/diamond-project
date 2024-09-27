import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, catchError, of } from 'rxjs';
import { environment } from '../../environment/environment';
// import { ContributorService } from '../modules/contributor/contributor.service';
// import {ChallengeService} from '../services/challenge.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAuthenticated: boolean = false;
  private roleSubject = new BehaviorSubject<string>('');
  private usersSubject = new BehaviorSubject<string>('');
  private subscriptionIdSubject = new BehaviorSubject<string>('');
  role$ = this.roleSubject.asObservable();
  subscriptionId$ = this.subscriptionIdSubject.asObservable();
  users$ = this.usersSubject.asObservable();
  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();

  private nameSubject = new BehaviorSubject<string>('');
  name$ = this.nameSubject.asObservable();

  private f_nameSubject = new BehaviorSubject<string>('');
  f_name$ = this.f_nameSubject.asObservable();

  private l_nameSubject = new BehaviorSubject<string>('');
  l_name$ = this.l_nameSubject.asObservable();

  private userIdSubject = new BehaviorSubject<string>('');
  userId$ = this.userIdSubject.asObservable();

  constructor( private http: HttpClient) { }

  setRole(role: string) {
    this.roleSubject.next(role);
    sessionStorage.setItem('role', role);
  }

  setSubscriptionId(id: any){
    this.subscriptionIdSubject.next(id);
    sessionStorage.setItem('subscription_id', id);
  }

  getRole(): string {

    return this.roleSubject.value;
  }

  setEmail(email: string) {
    this.emailSubject.next(email);
    sessionStorage.setItem('email', email);
  }

  getEmail(): string {
    return this.emailSubject.value;
  }

  setName(name: string) {
    this.nameSubject.next(name);
    sessionStorage.setItem('fullName', name);
  }

  set_f_name(name: string){
    this.f_nameSubject.next(name);
    sessionStorage.setItem('f_name', name);
  }

  set_l_name(name: string){
    this.l_nameSubject.next(name);
    sessionStorage.setItem('l_name', name);
  }

  getName(): string {
    // console.log('this.nameSubject.value', this.nameSubject.value)
    return this.nameSubject.value;
  }

  get_f_Name(): string {
    // console.log('this.nameSubject.value', this.nameSubject.value)
    return this.f_nameSubject.value;
  }

  get_l_Name(): string {
    // console.ll_og('this.nameSubject.value', this.nameSubject.value)
    return this.nameSubject.value;
  }

  setuserId(userId: string) {

    this.userIdSubject.next(userId);
    sessionStorage.setItem('userId', userId);
  }

  getuserId(): string {
    // console.log('this.userId.value', this.userIdSubject.value)
    return this.userIdSubject.value;
  }

  async login(credentials: any): Promise<any> {
    // console.log('credentials', credentials);
    try {
      const response: any = await this.http.post<any>(`${environment.apiUrl}/data-api/login`, credentials, { observe: 'response' }).toPromise();
      this.isAuthenticated = true;
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  signUp(userData: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/signup`, userData, { observe: 'response' })
        .subscribe(
          (response) => {

            resolve(response); // Resolve the promise with the response
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status); // Reject the promise with the error status
          }
        );
    });
    // return this.http.post<any>(`${environment.apiUrl}/data-api/signup`, userData)
    //   .pipe(
    //     catchError((error) => {
    //       console.error('Error during signup:', error);
    //       throw error; // Rethrow the error after logging
    //     })
    //   );
  }

  async validateUser(userData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/data-api/validation`, { email: userData.email }, { observe: 'response' })
        .subscribe(
          (response) => {

            resolve(response); // Resolve the promise with the response
          },
          (error) => {
            alert('user already exist!')
            console.error('Error:', error);

            reject(error); // Reject the promise with the error
          }
        );
    });
  }

  onSaveEditUser(userData: any): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/data-api/edit-user-details`, userData).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error after logging
      })
    );
  }

  getAllUsers() {
  //  let subscription_id: any =  sessionStorage.getItem('subscription_id')
  //   let data: any = {
  //     subscription_id: subscription_id
  //   }
    return this.http.get<any>(`${environment.apiUrl}/data-api/admin-view-list`).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error after logging
      })
    );
  }

  async getAllUsersForAdminList() {
    try {
      const allUsers: any = await this.http.get(`${environment.apiUrl}/data-api/admin-view-list`).toPromise();

      this.usersSubject.next(allUsers);
      return allUsers;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error; // rethrow the error to handle it in the component
    }
  }

  changeUserActiveStatus(data: any) {
    return this.http.post<any>(`${environment.apiUrl}/data-api/flip-user-status`, data).pipe(
      catchError((error) => {
        console.error('Error during signup:', error);
        throw error; // Rethrow the error after logging
      })
    );
  }

  sendResendLink(email: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/forgot-password`, { email: email }, { observe: 'response' })
        .subscribe(
          (response: any) => {

            if (response.body && response.body.reset_link === true) {
              resolve(response);
            } else {
              console.warn('Unexpected response:', response.body);
              reject('Unexpected response');
            }
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }

  changePassword(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/change-password`, data, { observe: 'response' })
        .subscribe(
          (response: any) => {
            // console.log('Response:', response);
            // console.log('Status Code:', response.status);
            // console.log('response.body', response.body);
            if (response.body && response.body.reset === true) {
              resolve(response);
            } else {
              console.warn('Unexpected response:', response.body);
              reject('Unexpected response');
            }
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }

  get isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  logout() {
    this.isAuthenticated = false;
    this.setName('');
    this.setRole('');
    this.setEmail('');
    this.setuserId('')
    this.setSubscriptionId('')
    // sessionStorage.removeItem('email');
    // sessionStorage.removeItem('role')
    sessionStorage.removeItem('f_name')
    sessionStorage.removeItem('l_name')
    sessionStorage.removeItem('subscription_id')
    // sessionStorage.removeItem('fullName')
  }

  checkAuthentication(): Observable<boolean> {
    // You might want to check the token validity or perform any other authentication checks
    const authToken = sessionStorage.getItem('email');
    return of(!!authToken); // !!authToken converts it to a boolean
  }

  async getUserDetails(data: any) {

    try {
      const response: any = await this.http.post<any>(`${environment.apiUrl}/data-api/get-user-details`, data, { observe: 'response' }).toPromise();
      if (response.status >= 200 && response.status < 300) {
        // console.log('Response:', response);
        // console.log('Status Code:', response.status);
        // console.log('response.body', response.body);
        try {
          return response.body;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          return null; // or throw error; depending on your use case
        }
      } else {
        console.error('HTTP request failed with status:', response.status);
        return null; // or throw an error if you prefer
      }
    } catch (error) {
      console.error('Error in getUserDetails:', error);
      // Handle the error, return a default value, or throw a new error
      return null;
    }
  }

  async sendSubscriptionDataToFirstAddApi(data: any){
    try {
      const response: any = await this.http.post<any>(`${environment.apiUrl}/data-api/first-add`, data, { observe: 'response' }).toPromise();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async verifyUserOtp(data: any){
    // try {
    //   const response: any = await this.http.post<any>(`${environment.apiUrl}/data-api/verify-otp`, data, { observe: 'response' }).toPromise();
    //   return response;
    // } catch (error) {
    //   console.error('Error:', error);
    //   throw error;
    // }

    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/verify-otp`, data, { observe: 'response' })
        .subscribe(
          (response) => {

            resolve(response); // Resolve the promise with the response
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status); // Reject the promise with the error status
          }
        );
    });
  }

  async resendUserOtp(data: any){
    try {
      const response: any = await this.http.post<any>(`${environment.apiUrl}/data-api/resend-otp`, data, { observe: 'response' }).toPromise();
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async emailVerification(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/email-modify`, data, { observe: 'response' })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }

  async finalSubscriptionDataSubmit(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/second-add`, data, { observe: 'response' })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }

  async firstUserLoginCheck(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/first-user`, data, { observe: 'response' })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }

  async flipUserStatus(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(`${environment.apiUrl}/data-api/flip-first-user-status`, data, { observe: 'response' })
        .subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            console.error('Error:', error.status);
            reject(error.status);
          }
        );
    });
  }
}
