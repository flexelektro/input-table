export const linebreakToBr = (raw: string | number) => {
  raw = raw + "";
  return raw.replace(/(?:\r\n|\r|\n)/g, '<br/> x ')

}
