import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PersonDetails } from '../Model/Person';

const headers = new HttpHeaders({
  'content-type':'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class GetPersonsService {

  
  constructor(private _http:HttpClient) { }

  getPersonDetails(currentPage:number,recordsPerPage:number):Observable<Array<PersonDetails>>{
    return this._http.get<Array<PersonDetails>>(`${environment.apiUrl}api/person?currentPage=${currentPage}&recordsPerPage=${recordsPerPage}`,{headers:headers})
  }
}
