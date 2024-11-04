import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Creation } from '../interfaces/creation.interface';
import { HttpClient } from '@angular/common/http';
import { Pierre } from '../interfaces/pierre.interface';

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

  public getPierres(): Observable<Pierre[]> {
    return this.httpClient
      .get('/assets/pierre.json')
      .pipe(map((result: any) => result.pierres));
  }
}
