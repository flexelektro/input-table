import { html, css, LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { THead } from './THead';
import { TopRow } from './TopRow';
import {TBodyRow } from './TBodyRow';
import { TableController } from './TableController'
import { MicroButton } from './MicroButton';

window.customElements.define('t-head', THead);
window.customElements.define('t-top-row', TopRow);
window.customElements.define('t-body-row', TBodyRow);
window.customElements.define('t-btn', MicroButton);

export class InputTable extends LitElement{
  static styles = css`
    :host {
    }

    th {
      border: 3px solid red;
    }

    .fx-table {
      display: table;
      border-collapse: collapse;
      width: 100%;
      margin-top:15px;
    }
  `;


  private controller = new TableController(this)

  constructor(){
    super();
    this.addEventListener("ADD_COL" as any,this.addCol)
    this.addEventListener("ADD_ROW" as any,this.addRow)
  }

  @query(".fx-table")
  $table?: HTMLDivElement;

  @property()
  columns: string = "";

  firstUpdated(map: any){
    if(this.columns){
      this.controller.headers = JSON.parse(this.columns) as string[];
    }
  }

  addCol(e:CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;
    console.log("Helau",e.detail)
    this.controller.addCol(e.detail.position)
  }

  addRow(e:CustomEvent){
    e.stopPropagation();
    e.cancelBubble = true;

    this.controller.addRow(e.detail.position)
  }

  renderTopRow(){
    return html`
      <t-top-row cols='${ JSON.stringify(this.controller.headers) }'></t-top-row>
    `
  }

  renderTHead(){
    if(this.controller.hasHeader){
      return html`
      <t-head cols='${ JSON.stringify(this.controller.headers) }'/>
    `;
    }
    return null;

  }

  renderBody(){
    return html`

      ${ this.controller.data.map((row,idx) => html`
          <t-body-row index=${idx} row="${JSON.stringify(row)}" />
        `) }
    `
  }

  toggleHasHeader(e:InputEvent){
    this.controller.hasHeader = ((e.target as HTMLInputElement).checked);
  }


  render(){
    return html`

      <div class='fx-input-table'>

        <label>
          <input @change=${this.toggleHasHeader} type='checkbox' checked=${this.controller._hasHeader}>
          <span>has header</span>
        </label>


        <div class='fx-table'>
          ${ this.renderTopRow() }
          ${ this.renderTHead() }
          ${ this.renderBody() }
        </div>
      </div>
    `;
  }
}



