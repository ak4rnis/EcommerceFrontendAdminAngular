import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-cupon',
  templateUrl: './create-cupon.component.html',
  styleUrls: ['./create-cupon.component.css']
})
export class CreateCuponComponent implements OnInit {
  public cupon:any = {
    tipo: ''
  };
  public load_btn:Boolean = false;
  constructor()
  {

  }
  ngOnInit(): void {
      
  }

  registro(registroForm:any)
  {

  }
}
