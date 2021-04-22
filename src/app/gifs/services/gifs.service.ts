import { query } from '@angular/animations';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'    //es global
})
export class GifsService {

  private apiKey: string = 'UJgqPFhSMmuuWnqVfov4eciJRxY5dgYU';

  private _historial:string[] = [];

  get historial(){
    

    return [...this._historial];
  }


  buscarGifs(query:string = ''){

    query = query.trim().toLocaleLowerCase();   //para que todo se guarde en el mismo formato
    
    if( this._historial.includes ( query ) ){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    //TODO 
    fetch('https://api.giphy.com/v1/gifs/search?api_key=uN2kmlBTlGk4KEMWmmU4n5gspqeElUh6=dragon')
    .then(resp => {
      resp.json().then(data =>{
        console.log(data)
      })
    })


    console.log(this._historial)
  }

}
