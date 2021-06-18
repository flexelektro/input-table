import { html, css, LitElement, property, state } from 'lit-element';

export class THead extends LitElement{


  static styles = css`
    :host{
      display:table-row;
      width:100%;
    }
    .table-head-column{
      display:table-cell;
      box-sizing: border-box;
      border: 1px solid #ccc;
      background: #f0f0f0;
      padding: 3px;
    }

    textarea{
      width:100%;
      resize: none;
    }
    .empty{
      display:table-cell;
      box-sizing: border-box;
    }
  `;

  @property({ type: Array })
  private cols: string[] = [];

  render(){

    return html`
        <div class='empty'></div>
        ${ this.cols.map((col,idx) => html`
          <table-cell isheader col='${idx}' value='${col}'>
            ${col}
            </td>
        `) }
    `;
  }
}

