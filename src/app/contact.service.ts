import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  sendContactForm(data: any): Observable<any> {
    return this.http.post('https://example.com/api/contact', data);
  }
}
