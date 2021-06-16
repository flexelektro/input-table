import { html, css, LitElement, property, state } from 'lit-element';


export class TBodyRow extends LitElement{
  static styles = css`
    :host {
      width: 100%;
      display: table-row;

    }

    .table-cell {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 3px;

    }

    .empty {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 3px;
      width: 30px;
      position: relative;
      background: #eee;
    }
    .t-body-row-index{
      color:#666;
      font-size:12px;
      width:100%;
      display: inline-block;
      text-align: right;
    }
  `;

  @property()
  row: string = "";

  @property({type:Number})
  index: number = 0;

  addRow(pos: number){
    const addEvent = new CustomEvent("ADD_ROW", {
      detail: { position: pos },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(addEvent);
  }

  render(){
    const data = JSON.parse(this.row)
    console.log("IDX",typeof this.index)
    return html`
      <div class='empty'>
        ${this.index == 0 ? html`
         <t-btn @click='${ () => this.addRow((this.index)) }' style='top:0px;left:0px;'>+</t-btn>
        ` : null}

        <span class='t-body-row-index'> ${this.index}</span>


        <t-btn @click='${ () => this.addRow(this.index + 1) }' style='bottom:-14px;left:0px;'>+</t-btn>

      </div>
      ${ data.map((celldata: any, idx: any) => html`
        <div class='table-cell'>
          ${ celldata }
        </div>
      `) }
    `;
  }
}





