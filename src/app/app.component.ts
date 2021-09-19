import { Component, OnInit } from '@angular/core';
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

  capital: number = 2665000;
  plazo: number = 12;

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

    // this.capital = 2665000;
    // this.plazo = 10;
    // this.tazaInteres = 12;

    let cuota: cuota = { saldo: this.capital };
    this.interesMensual = this.tazaInteres / 12;

    this.cuotaMensual =
      ((this.interesMensual / 100) * this.capital) /
      (1 - Math.pow(1 / (1 + this.interesMensual / 100), this.plazo));

    this.cuotaMensual = Math.trunc(this.cuotaMensual);

    this.saldo = this.capital;
    for (let cuotaIndex = 1; cuotaIndex <= this.plazo; cuotaIndex++) {
      let cuota: cuota = {
        numeroCuota: cuotaIndex,
        saldo: this.saldo,
      };

      cuota.interes = Math.trunc(cuota.saldo / 100) * this.interesMensual;

      cuota.amortizacion = this.cuotaMensual - cuota.interes;
      cuota.cuota = this.cuotaMensual;
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
}
