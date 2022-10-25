import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { numeroPrimo } from 'src/app/models/Modelo';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  titulo = 'Agregar numero';
  primo: boolean | undefined
  motivo: string | undefined
  numero: FormGroup
  id: string | undefined;
  constructor(
    private fb: FormBuilder,
    private crudService: CrudService ,
    private toastr : ToastrService,
    private serviceCrud: CrudService,
  ) {
    this.numero = fb.group({
      numero: ['', Validators.required]
    })

   }

  ngOnInit(): void {
    this.serviceCrud.getTarjetaEdit().subscribe(data => {
      console.log(data);
      this.id = data.id;
      this.titulo = 'Editar numero';
      this.numero.patchValue({
        numero: data.numero
      })
    })
  }



  editarTarjeta(id: string) {
    console.log(this.numero.value.numero)
    const numero: any = {
      numero: this.numero.value.numero,
      primo: this.primo,
      motivo: this.motivo,
    }
    console.log(numero, '--------');
    this.serviceCrud.updateTarjeta(id,numero).then(() => {
      this.titulo = 'editar Tarjeta';
      this.numero.reset();
      this.id = undefined;
      this.toastr.info('se actualizo la tarjeta', 'actulizacion exitosa');
    })
  }
  

  guardarNumero() {
    this.verificarNumeroPrimo(this.numero.value.numero);
  }

  verificarNumeroPrimo(numero: number) {
    let cantDivisor=0
    let numerosDivisores=[]
    let divisor = 0
    let resto = 0
    for(let i=0; i<numero; i++){
        divisor =numero - i
        resto = (numero % divisor)
        if (resto===0){
            cantDivisor=cantDivisor+1
            numerosDivisores.push(divisor)
        }
    }
    if (cantDivisor<=2){
        console.log(numero,  "Es Primo")
        this.primo = true;
        this.motivo = 'es divisible por 1 y por si mismo'
    }
    else{
        console.log(numero ,"no es primo")
        console.log(numerosDivisores.join(","))
        this.primo = false;
        this.motivo = `porque es divisible por: ${numerosDivisores} `
    }
    const numeroo: numeroPrimo = {
      numero: this.numero.value.numero,
      primo: this.primo,
      motivo:  this.motivo,
    }
    if (this.id === undefined) {
      this.crudService.addTarjeta(numeroo).then(()=> {
        this.toastr.success('se agrego el numero', 'numero agregado');
      }, error => {
        console.log(error)
      })
    }else {
      this.editarTarjeta(this.id)      
    }


  }






}
