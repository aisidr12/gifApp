import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
 
})
export class SidebarComponent {
// crear el getHistorial
  
  get getHistorial(){
    return [...this.gifService.historial];
  }
  constructor(private gifService:GifsService) { }

  mostrar(item:string){
   console.log(item);
   this.gifService.buscarGifs(item);
  }

}
