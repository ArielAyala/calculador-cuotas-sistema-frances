import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

export interface cuota {
  numeroCuota?: number;
  amortizacion?: number;
  interes?: number;
  cuota?: number;
  saldo: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  dataSource: cuota[] = [];

  capital: string = '';
  plazo: number = 0;

  tazaInteres: number = 0;
  interesMensual: number = 0;
  cuotaMensual: number = 0;
  cuotas: cuota[] = [];
  totalAmortizacion: number = 0;
  totalInteres: number = 0;
  totalCuotas: number = 0;
  saldo: number = 0;

  columnasTabla: string[] = [
    'numero-cuota',
    'amortizacion',
    'interes',
    'saldo',
    'cuota',
  ];

  constructor() {}

  ngOnInit() {
    // this.calcular();
  }

  calcular() {
    this.cerearVariables();

    this.tazaInteres = this.verificarDecimal(this.tazaInteres);

    this.interesMensual = this.tazaInteres / 12;

    this.cuotaMensual =
      ((this.interesMensual / 100) * this.parsearAEntero(this.capital)) /
      (1 - Math.pow(1 / (1 + this.interesMensual / 100), this.plazo));

    this.cuotaMensual = Math.round(this.cuotaMensual); // Redondeo

    this.saldo = this.parsearAEntero(this.capital);
    for (let cuotaIndex = 1; cuotaIndex <= this.plazo; cuotaIndex++) {
      let cuota: cuota = {
        numeroCuota: cuotaIndex,
        saldo: this.saldo,
      };

      // Interes de la cuota
      cuota.interes = Math.round((cuota.saldo / 100) * this.interesMensual);

      // Amortizacion de la cuota
      cuota.amortizacion = this.cuotaMensual - cuota.interes;

      cuota.cuota = this.cuotaMensual;

      if (cuotaIndex == this.plazo) {
        cuota.amortizacion = this.saldo;
        cuota.cuota = cuota.amortizacion + cuota.interes;
      }

      // Saldo de la cuota
      this.saldo = this.saldo - cuota.amortizacion;

      this.totalAmortizacion = this.totalAmortizacion + cuota.amortizacion;
      this.totalInteres = this.totalInteres + cuota.interes;
      this.totalCuotas = this.totalAmortizacion + this.totalInteres;

      this.cuotas.push(cuota);

      cuota.saldo = cuota.saldo - cuota.amortizacion;
    }

    this.dataSource = this.cuotas;
  }

  cerearVariables() {
    this.cuotaMensual = 0;
    this.saldo = 0;
    this.cuotas = [];

    this.totalAmortizacion = 0;
    this.totalInteres = 0;
    this.totalCuotas = 0;
  }

  verificarDecimal(num: any) {
    return parseFloat(num.toString().replaceAll(',', '.'));
  }

  parseSeparadorMiles(valor: any) {
    valor = valor.toString().replaceAll('.', '');

    this.capital = Number(valor).toLocaleString('es-AR');
  }

  parsearAEntero(numString: any) {
    return parseInt(numString.replaceAll('.', ''));
  }
}
