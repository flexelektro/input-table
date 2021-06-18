import { ReactiveController, ReactiveControllerHost } from 'lit';

type IDataRow = (string | number)[];
type IData = IDataRow[];

export class TableController implements ReactiveController{
  host: ReactiveControllerHost;

  constructor(host: ReactiveControllerHost, timeout = 1000){
    (this.host = host).addController(this);
  }

  public _hasHeader: boolean = true;
  private _header: (string | number)[] = [];
  private _data: IData = [];

  set header(values: IDataRow){
    this._header = values;
    this.cleanUp();
    this.host.requestUpdate();
  }

  get header(){
    return this._header;
  }

  set data(data:IData){
    this._data = data;
    this.cleanUp();
    this.host.requestUpdate();
  }

  get data(){
    return this._data;
  }

  get hasHeader(){
    return this._hasHeader;
  }

  set hasHeader(val: boolean){
    this._hasHeader = val;
    this.host.requestUpdate();
  }

  get colCount(){
    return Math.max(this.maxColLength(this._data),this.header.length);
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
    this._header = this.cleanUpHeaders(this._header)
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

    const newHeaders = this._header.slice();
    newHeaders.splice(pos,0,"")
    this._header = newHeaders

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
    const headers = this.header.slice();
    headers.splice(pos, 1)
    this._header = headers;
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
  updateHeaderField(e: CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;

    const col = e.detail.col;
    const value = e.detail.value;
    this._header[col] = value;
    this.host.requestUpdate();

  }

}
