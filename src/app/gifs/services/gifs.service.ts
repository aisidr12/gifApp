import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  //es Gif porque dentro de eso esta la respuesta 
  public resultados:Gif[]= [];
  private _historial:string[]=[];
  private apiKey:string='ZnmGTdTXqjM4VRLZZs3uMZxHpANaxfXs';
  private servicioUrl:string="https://api.giphy.com/v1/gifs";

  //Esta clase HttpClient viene del paquete de angular common http
  // esta trabaja con observables, es una alternativa a las promesas
  constructor(private http:HttpClient){
  // el json.parse -> convierte el x a el objeto original 
    this._historial=JSON.parse(localStorage.getItem('historial')!)||[];
    this.resultados=JSON.parse(localStorage.getItem('resultados')!)||[];
  }


  get historial(){
  
    return [...this._historial];
  }


  buscarGifs(query:string = ''){

   query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial= this._historial.splice(0,10); // cortamos los ultimos 10 elementos
    

      //Forma de guardar en el localStorage,  el stringFy,convierte todo a string
    localStorage.setItem('historial',JSON.stringify(this._historial));

    }
   //Pasamos por parametros 
    const params = new HttpParams().set('api_key',this.apiKey).set('limit','10').set('q',query);


    //Realizamos la primera peticion HTTP:
    //al colocar el tipo, indicamos que la respuesta luce como esa interfaz
    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search`,{params:params})
    .subscribe( (resp:Data) =>{
      console.log(resp.data);
      this.resultados=resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados));
    })
    
 
  }
}
