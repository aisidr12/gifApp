import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  constructor(private GifsService:GifsService){ }
 
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar(termino:string){

    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    if(valor.trim().length===0){
      return;
    }
    this.GifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
  }
}
