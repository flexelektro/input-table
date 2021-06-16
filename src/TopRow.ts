import { html, css, LitElement, property } from 'lit-element';

export class TopRow extends LitElement{
  static styles = css`
    :host {
      width: 100%;
      display: table-row;
    }

    .table-top-row-cell {
      display: table-cell;
      border: 1px solid #ccc;
      padding: 3px;
      background: #eee;
      position: relative;
    }

    .emptycell {
      display: table-cell;
    }

  `;

  @property({ type: Array })
  private cols: string[] = [];

  addCol(pos: number){
    const addEvent = new CustomEvent("ADD_COL", {
      detail: { position: pos },
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(addEvent);
  }

  render(){


    return html`

      <div class='emptycell'></div>
      ${ this.cols.map((col, idx: number) => html`
        <div class='table-top-row-cell'>
          ${ (idx === 0 ? html`
            <t-btn @click='${ () => this.addCol(0) }' style='top:0;left:0;'>+</t-btn>` : "") }
          ${ idx }
          <t-btn @click='${ () => this.addCol(idx + 1) }' style='top:0;right:-14px;'>+</t-btn>
        </div>
      `) }

    `;
  }
}

