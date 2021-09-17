import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';

export interface cuota {
  numeroCuota?: number;
  amortizacion?: number;
  interes?: number;
  cuota?: number;
  saldo: number;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

  
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = ['numero-cuota', 'amortizacion', 'interes', 'saldo', 'cuota'];
  dataSource: cuota[] = [];

  capital: number = 2665000;
  plazo: number = 12;
  
  tazaInteres: number = 0;
  interesMensual: number = 0;
  cuotaMensual: number = 0;
  cuotas: cuota[] = [];
  totalAmortizacion: number = 0;
  totalInteres: number = 0;
  saldo: number = 0;

  columnasTabla: string[] = ['numero-cuota', 'amortizacion', 'interes', 'saldo', 'cuota'];




  constructor() {}

  ngOnInit() {
    // this.calcular();
  }

  calcular() {
    // this.capital = 2665000;
    // this.plazo = 10;

    console.log('Plazo:', this.plazo);
    
    this.cuotaMensual = 0 ;
    this.saldo = 0;
    this.cuotas = []

    this.tazaInteres = 12;

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

      this.cuotas.push(cuota);

      cuota.saldo = cuota.saldo - cuota.amortizacion;
    }
    console.log(this.cuotas);
    // dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource = this.cuotas;
  }
}
