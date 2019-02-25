import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ENDPOINT } from '../config'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint = ''

  private _token: string = null

  constructor(private http: HttpClient) { 
    this.endpoint = `http://${ENDPOINT}`
  }

  private getHeaders() {
    const headers = {}

    if(this._token) {
      headers['Authorization'] = `Bearer ${this._token}`
    }

    return headers
  }

  public get<T>(resourcePath: string) {
    return this.http.get<T>(`${this.endpoint}/${resourcePath}`, {
      headers: this.getHeaders()
    })
  }

  public post<T>(resourcePath: string, body: any) {
    return this.http.post<T>(`${this.endpoint}/${resourcePath}`, body, {
      headers: this.getHeaders()
    })
  }

  public put<T>(resourcePath: string, body: any) {
    return this.http.put<T>(`${this.endpoint}/${resourcePath}`, body, {
      headers: this.getHeaders()
    })
  }

  public delete<T>(resourcePath: string) {
    return this.http.delete<T>(`${this.endpoint}/${resourcePath}`, {
      headers: this.getHeaders()
    })
  }

  set token(newToken: string) {
    this._token = newToken
  }
}
