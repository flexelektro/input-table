import { html, css, LitElement, property, state } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';


const linebreakToBr = (raw:string|number) => {
  raw = raw + "";
  console.log({raw})
  return raw.replace(/(?:\r\n|\r|\n)/g, '<br/> x ')

}

export class TBodyRow extends LitElement{
  static styles = css`
    :host {
      width: 100%;
      display: table-row;

    }

    .table-cell {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 0px;
      position: relative;
    }

    .empty {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 3px;
      width: 30px;
      position: relative;
      background: #eee;
    }

    .t-body-row-index {
      color: #666;
      font-size: 12px;
      width: 100%;
      display: inline-block;
      text-align: right;
    }

    span.centered {
      display: flex;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      justify-content: center;
      align-items: center;
      background: red;
    }

    span.vcentered {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .table-cell-input {
      border: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 2px;
      right: 2px;
      width: calc(100% - 6px)

    }
    .table-cell-textarea {
      border: none;
      position: absolute;
      top: 0;
      bottom:0;
      left: 2px;
      right: 2px;
      width: calc(100% - 6px);
      height:auto;
      max-height: 150px;
      resize: none;
      font: 400 13.3333px Arial;
      opacity: 1;
     ;
    }
    .grower{
      visibility: hidden!important;
      display:inline-block;
      margin: 2px 0;
    }
  `;

  @property()
  row: string = "";

  @property({ type: Number })
  index: number = 0;

  @property({ type: String })
  isLastIndex?: "true" | "false" = "false"


  addRow(pos: number){
    const addEvent = new CustomEvent("ADD_ROW", {
      detail: { position: pos },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(addEvent);
  }

  removeCol(pos: number){
    const removeEvent = new CustomEvent("REMOVE_COL", {
      detail: { position: pos },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(removeEvent);
  }

  removeRow(pos: number){
    const removeEvent = new CustomEvent("REMOVE_ROW", {
      detail: { position: pos },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(removeEvent);
  }

  updateField(e:InputEvent,row:number,col:number){
    const addEvent = new CustomEvent("UPDATE_FIELD", {
      detail: { value: (e.target as HTMLInputElement)?.value || "", row,col },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(addEvent);
  }

  render(){
    const data = JSON.parse(this.row);
    const row = this.index;

    // <textarea class='table-cell-textarea'>${celldata}</textarea>
    //  <span style='visibility: hidden'>${ celldata }</span>
    // <input @input='${(e:InputEvent) => this.updateField(e,row,col)}' class='table-cell-input' type='text' value='${ celldata }'>

    return html`
      <div class='empty'>
        ${ this.index == 0 ? html`
          <t-btn @click='${ () => this.addRow((this.index)) }' style='top:0px;left:0px;'>+</t-btn>
        ` : null }
        <span class='t-body-row-index'> ${ this.index }</span>
        <t-btn @click='${ () => this.addRow(this.index + 1) }' style='bottom:-14px;left:0px;'>+</t-btn>
      </div>


      ${ data.map((celldata: any, idx: number) => {
        const col = idx;
        return html`
          <div class='table-cell'>
            <span class="grower" style='visibility: hidden'>${ unsafeHTML( linebreakToBr(celldata)) }</span>
            <textarea @input='${(e:InputEvent) => this.updateField(e,row,col)}' class='table-cell-textarea'>${celldata}</textarea>


            ${ this.isLastIndex === "true" ? html`
              <span class='centered'>
          <t-btn title='remove column' @click='${ () => this.removeCol(idx) }' style='transform:translate(0px, 15px)'>–</t-btn>
        </span>
            ` : null }

            ${ (idx === data.length - 1) ? html`
              <span class='vcentered'>
          <t-btn title='remove row' @click='${ () => this.removeRow(this.index) }' style='transform:translate(0px, 0px)'>–</t-btn>
        </span>
            ` : null }

          </div>
        `
      }) }
    `;
  }
}





