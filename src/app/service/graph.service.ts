import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private _httpClient: HttpClient) { }
  getGraphStatisticsData(countryList) {
    return this._httpClient.get<any>(`${environment.apiUrl}/countries/` + countryList).pipe(
      map(response => {
        return response;
      })
    );
  }
}
