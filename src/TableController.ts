import { ReactiveController, ReactiveControllerHost } from 'lit';

type IDataRow = (string | number)[];
type IData = IDataRow[];

export class TableController implements ReactiveController{
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost, timeout = 1000){
    (this.host = host).addController(this);
  }

  public _showHeader: boolean = true;
  private _headers: (string | number)[] = [];
  private _data: IData = [];

  set headers(values: IDataRow){
    this._headers = values;
    this.cleanUp();
    this.host.requestUpdate();
  }

  get headers(){
    return this._headers;
  }

  set data(data:IData){
    this._data = data;
    this.cleanUp();
    this.host.requestUpdate();
  }

  get data(){
    return this._data;
  }

  get showHeader(){
    return this._showHeader;
  }

  set showHeader(val: boolean){
    this._showHeader = val;
    this.host.requestUpdate();
  }

  get colCount(){
    return Math.max(this.maxColLength(this._data),this.headers.length);
  }

  get rowCount(){
    return this._data.length || 0;
  }

  maxColLength(data: IData){
    let max = 0;
    data.forEach(row => {
      max = Math.max(max, row.length);
    })
    return max;
  }

  cleanUp(){
    this._data = this.cleanupData(this._data);
    this._headers = this.cleanUpHeaders(this._headers)
    this.host.requestUpdate();
  }

  cleanupData(data: IData){
    const max = this.colCount;
    return data.map(row => {
      if(row.length < max){
        const newRow = row.concat(Array.from(new Array(max - row.length),(_:any) => ""))
        return newRow;
      }
      return row;
    })
  }

  cleanUpHeaders(val: IDataRow){
    if(val.length < this.colCount){
      const add = Array.from(new Array(this.colCount - val.length),(x:any) => "")
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


  /*
  ** ACTIONS
   */


  addCol(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    const pos = e.detail.position;


    this._data = this.data.map(row => {
      const newrow = (row.slice());
      newrow.splice(pos, 0, "")
      return newrow
    })

    const newHeaders = this._headers.slice();
    newHeaders.splice(pos,0,"")
    this._headers = newHeaders

    this.cleanUp();
  }

  addRow(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    const pos = e.detail.position;
    const newData = this._data.slice();
    newData.splice(pos, 0, Array.from(Array(this.colCount),(x:any) => ""))
    this._data = newData;
    this.cleanUp();
  }

  removeCol(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    const pos = e.detail.position;
    const newData = this._data.slice();
    newData.forEach((row) => {
      row.splice(pos, 1);
    })
    this._data = newData;
    const headers = this.headers.slice();
    headers.splice(pos, 1)
    this._headers = headers;
    this.cleanUp();
  }

  removeRow(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    const pos = e.detail.position;
    const newData = this._data.slice();
    newData.splice(pos, 1)
    this._data = newData;
    this.cleanUp();
  }

  updateField(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    const row = e.detail.row;
    const col = e.detail.col;
    const value = e.detail.value;

    this._data[row][col] = value;

    this.host.requestUpdate();

  }

}
