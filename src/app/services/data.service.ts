import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Creation } from '../interfaces/creation/creation.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly httpClient = inject(HttpClient);

  public getGaleries(): Observable<Creation[]> {
    return this.httpClient
      .get('/assets/galerie.json')
      .pipe(map((result: any) => result.galerie));
  }
}
