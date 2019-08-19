import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PagoOnlineService } from 'app/services/service.index';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ModelFacConsul } from 'app/models/repre/datosFacConsul.models';
import { ModelRepreConsul } from 'app/models/repre/datosRepreConsul.models';
import * as postscribe from 'postscribe'

@Component({
  selector: 'app-pago-online',
  templateUrl: './pago-online.component.html',
  styleUrls: ['./pago-online.component.scss'],
})
export class PagoOnlineComponent implements OnInit, AfterViewInit {
  public ModelFacConsul: ModelFacConsul;
  public ModelRepreConsul: ModelRepreConsul;
  dl =  false;
  total = 0;
  letivoPeriodo: string;
  codigoPeriodo: string;
  codigoAlumno: string;
  datoActuFac: Array<any>;
  deudaList: Array<any>;
  repreDatoConsul: Array<any>;
  content = false;
  pr = false;

  constructor(public _pagoOnlineService: PagoOnlineService) {}

  ngAfterViewInit() {
    postscribe('#response', `<script>
    var paymentezCheckout = new PaymentezCheckout.modal({
        client_app_code: 'ECOMUNDO-EC-CLIENT', // Client Credentials Provied by Paymentez
        client_app_key: '8Hf6bFAitUDv5NC66SQAruhJpCIrV0', // Client Credentials Provied by Paymentez
        locale: 'es', // User's preferred language (es, en, pt). English will be used by default.
        env_mode: 'stg', // 'prod', 'stg', 'dev', 'local' to change environment. Default is 'stg'
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        onResponse: function(response) { // The callback to invoke when the Checkout process is completed

            /*
                  In Case of an error, this will be the response.
                  response = {
                    "error": {
                      "type": "Server Error",
                      "help": "Try Again Later",
                      "description": "Sorry, there was a problem loading Checkout."
                    }
                  }

                  When the User completes all the Flow in the Checkout, this will be the response.
                  response = {
                    "transaction":{
                        "status":"success", // success or failure
                        "id":"CB-81011", // transaction_id
                        "status_detail":3 // for the status detail please refer to: https://paymentez.github.io/api-doc/#status-details
                    }
                  }
                */
            console.log('modal response');
            document.getElementById('response').innerHTML = JSON.stringify(response);
        }
    });

    var btnOpenCheckout = document.querySelector('.js-paymentez-checkout');
    btnOpenCheckout.addEventListener('click', function() {
        // Open Checkout with further options:
        paymentezCheckout.open({
            user_id: '1234',
            user_email: '', //optional
            user_phone: '', //optional
            order_description: '1 Licencia Estándar (IVA y gastos adm. incluidos)',
            order_taxable_amount: 1,
            order_tax_percentage: 12,
            order_amount: ${this.total},
            order_vat: 0.12,
            order_reference: '#234323411',
        });
    });

    // Close Checkout on page navigation:
    window.addEventListener('popstate', function() {
        paymentezCheckout.close();
    });
</script>`)
  }

  ngOnInit() {
    this.letivoPeriodo = localStorage.getItem('let_per');
    this.codigoPeriodo = localStorage.getItem('cod_per') + localStorage.getItem('let_per');
    this.codigoAlumno = localStorage.getItem('cod_alum');
    this.deudaList = [{
      cod_per: this.codigoPeriodo,
      cod_alum: this.codigoAlumno
    }];

    this.repreDatoConsul = [{
      cod_per: this.codigoPeriodo,
      cod_alum: this.codigoAlumno
    }];

    this._pagoOnlineService.DatosFacConsul(this.repreDatoConsul[0]);
    this._pagoOnlineService.DatosRepreConsul(this.repreDatoConsul[0]);
    this._pagoOnlineService.DeudaLista(this.deudaList[0]);
    this.ModelRepreConsul = this._pagoOnlineService.datoRepreConsul[0];
  }

  pagosPendientes() {
    this.content = true;
    if (this._pagoOnlineService.deudasList.length > 0) {
      this.dl = true;
      this._pagoOnlineService.deudasList[0].ACTIVE = true;
    }
  }

  inicio() {
    this.content = false
  }

  checkAll(ck: any) {
    if (this._pagoOnlineService.deudasList[ck].ACCEPT === true) {
      if (ck !== 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = false;
        if (ck === this._pagoOnlineService.deudasList.length - 1) {
          this.total += this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
        }
      }if (ck < this._pagoOnlineService.deudasList.length - 1 ) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = true;
        this.total += this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
      }
    } else {
      if (ck !== 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = true;
        this.total -= this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
      }if (ck < this._pagoOnlineService.deudasList.length - 1) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = false;
        if (ck === 0) {
          this.total -= this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
        }
      }
    }
  }

  actualizar() {
    if ((this._pagoOnlineService.datoFacConsul[0].representante === '' || this._pagoOnlineService.datoFacConsul[0].representante == null) ||
    (this._pagoOnlineService.datoFacConsul[0].cedula === '' || this._pagoOnlineService.datoFacConsul[0].cedula == null) ||
    (this._pagoOnlineService.datoFacConsul[0].telefono === '' || this._pagoOnlineService.datoFacConsul[0].telefono == null) ||
    (this._pagoOnlineService.datoFacConsul[0].direccion === '' || this._pagoOnlineService.datoFacConsul[0].direccion == null)) {
      Swal.fire('Hey... !', 'Parece que has dejado algún campo vacio', 'warning');
    } else {
      this.datoActuFac = [{
        let_per: localStorage.getItem('let_per'),
        cod_per: localStorage.getItem('cod_per') + localStorage.getItem('let_per'),
        cod_alum: parseInt(localStorage.getItem('cod_alum'), 10),
        cedula: this._pagoOnlineService.datoFacConsul[0].cedula,
        representa: this._pagoOnlineService.datoFacConsul[0].representante,
        email: this._pagoOnlineService.datoFacConsul[0].email,
        telefono: this._pagoOnlineService.datoFacConsul[0].telefono,
        direccion: this._pagoOnlineService.datoFacConsul[0].direccion
      }];

      this._pagoOnlineService.DatosFacActu(this.datoActuFac[0]).subscribe(
        response => {
          Swal.fire('Actualizado', 'Cambios Guardados con Exito!', 'success'); // warning
          console.log(response);
        },
        error => {
          Swal.fire('Opss... !', 'Algo salio mal, vuelve intertar porfavor :(', 'error');
          console.log(error);
        }
        );
    }
  }

  pagar() {
    if ((this._pagoOnlineService.datoFacConsul[0].representante === '' || this._pagoOnlineService.datoFacConsul[0].representante == null) ||
    (this._pagoOnlineService.datoFacConsul[0].cedula === '' || this._pagoOnlineService.datoFacConsul[0].cedula == null) ||
    (this._pagoOnlineService.datoFacConsul[0].telefono === '' || this._pagoOnlineService.datoFacConsul[0].telefono == null) ||
    (this._pagoOnlineService.datoFacConsul[0].direccion === '' || this._pagoOnlineService.datoFacConsul[0].direccion == null)) {
      Swal.fire('Hey... !', 'Parece que has dejado algún campo vacio', 'warning');
    } else {
    //this.pr = true
    }
  }

  aceptar() {
    return null;
  }
}
