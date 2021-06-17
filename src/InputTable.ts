import { html, css, LitElement } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { THead } from './THead';
import { TopRow } from './TopRow';
import { TBodyRow } from './TBodyRow';
import { TableController } from './TableController'
import { MicroButton } from './MicroButton';

window.customElements.define('t-head', THead);
window.customElements.define('t-top-row', TopRow);
window.customElements.define('t-body-row', TBodyRow);
window.customElements.define('t-btn', MicroButton);


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
    this.addEventListener("UPDATE_FIELD" as any, this.controller.updateField.bind(this.controller))



    this.controller.headers = ["Name","Alter","Beschreibung","Power","Zusatz","Schnufatz"];
    this.controller.data = [
      ["Yenny", 50, "Eine wunderbare Frau mit tollem Hintern"],
      ["Nikolas", 30, "Eine völliger Versager mit Drogenproblem", "80"]
    ];

  }

  @query(".fx-input-table")
  $fullelement?: HTMLDivElement;

  @query(".fx-table")
  $table?: HTMLDivElement;

  @property()
  columns: string = "";

  @property()
  name: string = "";

  firstUpdated(map: any){
    if(this.columns){
      this.controller.headers = JSON.parse(this.columns) as string[];
    }

  }

  renderTopRow(){
    return html`
      <t-top-row cols='${ JSON.stringify(this.controller.headers) }'></t-top-row>
    `
  }

  renderTHead(){

    if(this.controller.showHeader){
      return html`
        <t-head cols='${ JSON.stringify(this.controller.headers) }'/>
      `;
    }
    return null;

  }

  renderBody(){
    const data = this.controller.data;

    return html`

      ${ data.map((row, idx) => {

        return html`
          <t-body-row isLastIndex=${(idx + 1) === (data.length) } index='${ idx }' row='${ JSON.stringify(row) }'/>
        `
      }) }


    `
  }

  toggleHasHeader(e: InputEvent){
    this.controller.showHeader = ((e.target as HTMLInputElement).checked);
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
        <label>
          <input @change=${ this.toggleHasHeader } type='checkbox' checked=${ this.controller._showHeader }>
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



