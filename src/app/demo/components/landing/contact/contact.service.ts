import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const url_base = environment.url_base;
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  sendMail(data:any):Observable<any>{

    const formData = new FormData();
    formData.append("to" , data.to);
    formData.append("subject" , data.subject);
    formData.append("message" , data.message);
    return this.http.post(`${url_base}php/sendMail/sendMail.php` , formData);
    
  }
}
