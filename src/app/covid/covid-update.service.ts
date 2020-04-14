import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, mergeMap, concatMapTo } from 'rxjs/operators';
import { database } from 'firebase';

export interface ApiEntry {
  [property: string]: string;
}
export interface USAData {
  data: ApiEntry[];
}
@Injectable({
  providedIn: 'root'
})
export class CovidUpdateService {
  apiURL = `https://covid19-server.chrismichael.now.sh/api/v1`;
  
  constructor(private http: HttpClient) { 
  }

  getData(name: string) {
    return this.http.get<any>(`${this.apiURL}/${name}`).pipe(map(data => {
      // console.log(data.data[0].table)
      return data.data[0].table;
    }));
  }
}
