import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/service/cupon.service';

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

  }
}
