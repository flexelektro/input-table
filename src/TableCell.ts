import { customElement, LitElement, css, property, html } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import { linebreakToBr } from './tools';
import { styleMap } from 'lit-html/directives/style-map';

export class TableCell extends LitElement{

  static styles = css`
    :host {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 0px;
      position: relative;
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
      resize: none;
      font: 400 13.3333px Arial;
      opacity: 1;
    }

    .grower {
      visibility: hidden !important;
      display: inline-block;
      margin: 2px 0;
    }
  `

  get extraStyles(){
    return this.isheader ? {
      fontWeight: "bolder",
      backgroundColor: "#eee"
    } : {
      backgroundColor: "white", fontWeight: "normal"
    }
  }

  @property({ type: Number })
  row: number = 0;

  @property({ type: Number })
  col: number = 0;

  @property()
  value: string = ""

  @property({
    converter: (attrVal: any) => {
      return attrVal === "";
    }
  })
  isheader?: boolean;

  updateField(val: string, row: number, col: number){
    if(this.isheader){
      this.dispatchEvent(new CustomEvent('UPDATED_HEADER_CELL', {
        detail: { value: val, col },
        bubbles: true,
        composed: true,
        cancelable: true
      }))
    }else{
      this.dispatchEvent(new CustomEvent('UPDATED_CELL', {
        detail: { value: val, row, col },
        bubbles: true,
        composed: true,
        cancelable: true
      }))
    }
  }

  render(){
    return html`
      <span class='grower'>${ unsafeHTML(linebreakToBr(this.value)) }</span>
      <textarea @input='${ (e: InputEvent) => this.updateField((e.target as HTMLTextAreaElement)!.value, this.row, this.col) }'
                class='table-cell-textarea'
                style=${ styleMap(this.extraStyles) }
      >${ this.value }</textarea>
      <slot></slot>
    `
  }

}
