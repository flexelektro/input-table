import { html, css, LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { THead } from './THead';
import { TopRow } from './TopRow';
import { TBodyRow } from './TBodyRow';
import { TableController } from './TableController'
import { MicroButton } from './MicroButton';
import { TableCell } from './TableCell';

window.customElements.define('t-head', THead);
window.customElements.define('t-top-row', TopRow);
window.customElements.define('t-body-row', TBodyRow);
window.customElements.define('t-btn', MicroButton);
window.customElements.define('table-cell', TableCell);

export class InputTable extends LitElement{

  protected createRenderRoot(): Element | ShadowRoot {
    return this
  }

  private controller = new TableController(this);
  private formData: FormData;

  constructor(){
    super();

    this.formData = new FormData();

    this.addEventListener("ADD_COL" as any, this.controller.addCol.bind(this.controller))
    this.addEventListener("ADD_ROW" as any, this.controller.addRow.bind(this.controller))
    this.addEventListener("REMOVE_COL" as any, this.controller.removeCol.bind(this.controller))
    this.addEventListener("REMOVE_ROW" as any, this.controller.removeRow.bind(this.controller))
    this.addEventListener("UPDATED_CELL" as any, this.controller.updateField.bind(this.controller))
    this.addEventListener("UPDATED_HEADER_CELL" as any, this.controller.updateHeaderField.bind(this.controller))

    this.controller.header = [];
    this.controller.data = [];

  }

  @query(".fx-input-table")
  $fullelement?: HTMLDivElement;

  @query(".fx-table")
  $table?: HTMLDivElement;

  @property()
  header: string = "";

  @property({
    converter: (attrVal: any) => {
      return attrVal === "";
    }
  })
  fixedheader?: boolean;

  @property()
  data: string = "";

  @property()
  name: string = "";

  firstUpdated(map: any){
    this.controller.fullEl = this.$fullelement;
  }

  public connectedCallback(){
    super.connectedCallback();

    if(!this.header){
      this.controller.hasHeader = false;
    }
    if(this.header){
      this.controller.header = JSON.parse(this.header) as string[];
    }

    if(this.data == ""){

      this.controller.data = [["","",""],["","",""],["","",""]]
    }
    if(this.data){
      this.controller.data = JSON.parse(this.data) as (string|number)[][];
    }

  }

  renderTopRow(){

    return html`
      <t-top-row hasbuttons=${!this.fixedheader} cols='${ JSON.stringify(this.controller.header) }'></t-top-row>
    `
  }

  renderTHead(){

    if(this.controller.hasHeader){
      return html`
        <t-head cols='${ JSON.stringify(this.controller.header) }'/>
      `;
    }
    return null;
  }

  renderBody(){
    const data = this.controller.data;

    return html`

      ${ data.map((row, idx) => {

        return html`
          <t-body-row fixedheader='${this.fixedheader}' isLastIndex=${(idx + 1) === (data.length) } index='${ idx }' row='${ JSON.stringify(row) }'/>
        `
      }) }
    `
  }

  render(){
    return html`
      <style>
        .fx-input-table {
          font: 400 13.3333px Arial;
        }

        .fx-table {
          display: table;
          border-collapse: collapse;
          width: 100%;
          margin-top: 15px;
        }
      </style>
      <div class='fx-input-table' style=''>
        <input type='hidden' name='${this.name}' value=${JSON.stringify(this.controller.data)}>

        <div class='fx-table'>
          ${ this.renderTopRow() }
          ${ this.renderTHead() }
          ${ this.renderBody() }
        </div>
      </div>
    `;
  }
}



