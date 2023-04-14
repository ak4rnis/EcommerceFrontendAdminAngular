import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CuponService } from 'src/app/service/cupon.service';

declare var iziToast:any;
declare var JQuery:any;
declare var $:any;

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {
  public cupon:any = {
    tipo: ''
  };
  public token:any;
  public load_btn:Boolean = false;
  constructor(private _cuponService: CuponService, private _router:Router)
  {
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
      
  }

  registro(registroForm:any)
  {
    if(registroForm.valid){
      this.load_btn = true;
      this._cuponService.registro_cupon_admin(this.cupon, this.token).subscribe(
        response => {
          console.log(response.data);
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'se registro correctamente el nuevo cupon'
          });
          this.load_btn = false;
          this._router.navigate(['/panel/cupones']);
        },
        error => {
          console.log(error);
          this.load_btn = false;
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
