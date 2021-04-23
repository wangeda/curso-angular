import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'    //es global
})

export class GifsService {

  private apiKey    : string = 'UJgqPFhSMmuuWnqVfov4eciJRxY5dgYU';
  private servicioUrl    : string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[] = [];

  //TOD cambiar any por su tipo correspondiente
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial];
  }

  constructor ( private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!)||[]
    this.resultados = JSON.parse(localStorage.getItem('resultados')!)||[]
   /* es lo mismo
     if( localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')! )
    } */
  }

  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();   //para que todo se guarde en el mismo formato
    
    if( this._historial.includes ( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial)  )
    }

    //el observable tiene mayor control que la promesa rxjs

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
    .subscribe(( resp: any ) => {
      this.resultados= resp.data
      localStorage.setItem('resultados', JSON.stringify(this.resultados)! )
    })

  }

}