import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CuponService } from 'src/app/service/cupon.service';

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
  constructor(private _cuponService:CuponService, private _router:Router, private _route:ActivatedRoute)
  {
    this.token = localStorage.getItem('token');
  }
  ngOnInit(): void {
      this._route.params.subscribe(
        params => {
          this.id = params["id"];
          console.log(this.id);
        }
      )
  }

  actualizar(actualizarForm:any)
  {

  }
}
