import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { numeroPrimo } from 'src/app/models/Modelo';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  listNumeros: numeroPrimo[] | undefined;

  constructor(
    private serviceCrud: CrudService, 
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.serviceCrud.getTargeta().subscribe(numeros => {
      this.listNumeros = numeros;

    })
  }

  async  eliminarTarjeta(numero : numeroPrimo ) {
    const respuesta = await this.serviceCrud.deleteTarjeta(numero);
    this.toastr.error('la tarjeta se elimino con exito', 'tarjeta eliminada');
  }
  editarTarjeta(numero:numeroPrimo) {
    this.serviceCrud.addtarjetaEdit(numero)
    console.log()
  }

}
