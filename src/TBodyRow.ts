import { html, css, LitElement, property } from 'lit-element';

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


    .table-cell-textarea {
      border: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 2px;
      right: 2px;
      width: calc(100% - 6px);
      height: auto;
      max-height: 150px;
      resize: none;
      font: 400 13.3333px Arial;
      opacity: 1;;
    }

    .grower {
      visibility: hidden !important;
      display: inline-block;
      margin: 2px 0;
    }
  `;

  @property()
  row: string = "";

  @property({ type: Number })
  index: number = 0;

  @property({ type: String })
  isLastIndex?: "true" | "false" = "false"

  @property({
    converter: (val) => {
      return val === "true";
    }
  })
  private fixedheader: boolean = false;


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

  render(){
    const data = JSON.parse(this.row);
    const row = this.index;
    console.log(this.fixedheader)
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
          <table-cell row=${row} col='${col}' value='${celldata}''>

            ${ (this.isLastIndex === "true" && !this.fixedheader) ? html`
              <span class='centered'>
          <t-btn title='remove column' @click='${ () => this.removeCol(idx) }' style='transform:translate(0px, 15px)'>–</t-btn>
        </span>
            ` : null }

            ${ (idx === data.length - 1) ? html`
              <span class='vcentered'>
                <t-btn title='remove row' @click='${ () => this.removeRow(this.index) }' style='transform:translate(0px, 0px)'>–</t-btn>
              </span>
            ` : null }

          </table-cell>
        `
      }) }
    `;
  }
}





