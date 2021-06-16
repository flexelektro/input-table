import { LitElement, css, property, html } from 'lit-element';

export class MicroButton extends LitElement{
  static styles = css`
    :host {
      width: 14px;
      height: 14px;
      display: flex;
      justify-content: center;
      align-content: center;
      background: white;
      border: 1px solid #ccc;
      border-radius: 7px;
      line-height: 13px;
      position: absolute;
      transform: translate(-7px, -7px);
      z-index: 10;
      cursor: pointer;
    }
  `

  @property()
  style: any;


  render(){
    return html`
      <slot></slot>
    `
  }
}
