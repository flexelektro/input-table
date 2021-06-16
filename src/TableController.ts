import { ReactiveController, ReactiveControllerHost } from 'lit';


export class TableController implements ReactiveController{
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost, timeout = 1000){
    (this.host = host).addController(this);
  }

  public _hasHeader: boolean = true;

  private _headers: (string | number)[] = [];

  private _data: (string | number)[][] = this.cleanupData([
    ["Yenny", 50, "Eine wunderbare Frau mit tollem Hintern"],
    ["Nikolas", 30, "Eine völliger Versager mit Drogenproblem", "80", "Ist polizeilich auffällig"]
  ])

  set headers(values: (string | number)[]){
    this._headers = this.cleanUpHeaders(values);
    this.host.requestUpdate();
  }

  get headers(){
    return this._headers;
  }

  set hasHeader(val: boolean){
    this._hasHeader = val;
    this.host.requestUpdate();
  }

  get hasHeader(){
    return this._hasHeader;
  }

  set data(data){
    this._data = this.cleanupData(data);
    this.host.requestUpdate();
  }

  get data(){
    return this._data;
  }

  get colCount(){
    return this.countCols(this._data);
  }

  get rowCount(){
    return this._data.length || 0;
  }

  addCol(pos: number){

    this.data = this.data.map(row => {
      const newrow = (row.slice());
      newrow.splice(pos, 0, "")
      return newrow
    })

    this.headers = (() => {
      const headers = this.headers.slice();
      headers.splice(pos, 0, "")
      return headers
    })()

  }

  addRow(pos: number){
    const newData = this._data.slice();
    newData.splice(pos, 0, Array(this.colCount))
    this.data = newData;
  }

  countCols(data: (string | number)[][]){
    let max = 0;
    data.forEach(row => {
      max = Math.max(max, row.length);
    })
    return max;
  }

  cleanupData(data: (string | number)[][]){
    const max = this.countCols(data);
    return data.map(row => {
      if(row.length < max){
        const newRow = row.concat(new Array(max - row.length))
        return newRow;
      }
      return row;

    })
  }

  cleanUpHeaders(val: (string | number)[]){
    if(val.length < this.colCount){
      const add = new Array(this.colCount - val.length);
      return val.concat(add);
    }
    return val;

  }


  hostConnected(){
    this.host.requestUpdate();
  }

  hostDisconnected(){
    // Clear the timer when the host is disconnected
  }


}
