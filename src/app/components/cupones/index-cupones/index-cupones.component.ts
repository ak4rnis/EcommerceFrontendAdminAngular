import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/service/cupon.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-cupones',
  templateUrl: './index-cupones.component.html',
  styleUrls: ['./index-cupones.component.css']
})
export class IndexCuponesComponent implements OnInit {
  public load_data:Boolean = true;
  public cupones:Array<any> = [];
  public page:any = 1;
  public pageSize:any = 20;
  public filtro:any = '';
  public token:any;

  constructor(private _cuponService:CuponService)
  {
    this.token = localStorage.getItem("token");
  }
  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response => {
        this.cupones = response.data;
        this.load_data = false;
      }
    )  
  }

  filtrar(){
    this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
      response => {
        this.cupones = response.data;
        this.load_data = false;
      },
      error => {
        console.log(error);
      }
    )
  }

  eliminar(id:any){
   
    this._cuponService.eliminar_cupon_admin(id,this.token).subscribe(
      response => {
        console.log(response);
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'se elimino correctamente el producto.'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');
      
        this._cuponService.listar_cupones_admin(this.filtro, this.token).subscribe(
          response => {
            this.cupones = response.data;
            this.load_data = false;
          },
          error => {
            console.log(error);
          }
          
        )
      },
      error => {
        console.log(error);
      }
    )
  }
}
