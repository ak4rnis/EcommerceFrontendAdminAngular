import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CuponService } from 'src/app/service/cupon.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-edit-cupon',
  templateUrl: './edit-cupon.component.html',
  styleUrls: ['./edit-cupon.component.css']
})
export class EditCuponComponent implements OnInit {
  public token:any;
  public cupon : any = {
    tipo: ''
  }
  public id:any;
  public load_btn:Boolean = false;
  public load_data:Boolean= true;
  constructor(private _cuponService:CuponService, private _router:Router, private _route:ActivatedRoute)
  {
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
      this._route.params.subscribe(
        params => {
          this.id = params["id"];
          this._cuponService.obtener_cupon_admin(this.id, this.token).subscribe(
            response => {
              if(response.data == undefined)
              {
                this.cupon = undefined
                this.load_data = false;
              }else{
                this.cupon = response.data
                this.load_data = false;
              }
            }
          )
        }
      )
  }

  actualizar(actualizarForm:any)
  {
    if(actualizarForm.valid)
    {
      this.load_btn = true;
      this._cuponService.actualizar_cupon_admin(this.id, this.cupon, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'se actualizo correctamente el cupon'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);
        },
        error => {
          console.log(error);
        }
      )
    }else{
      iziToast.show({
        title: 'ERROR',
        titleColor: "#FF0000",
        color: '#FFF',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }
}
