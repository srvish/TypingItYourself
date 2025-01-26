export class TextProps {
  Id: number;
  Char: string;
  IsVisible: boolean;
  IsValid: boolean;
  constructor(id: number, char: string) {
    this.Id = id;
    this.Char = char;
    this.IsVisible = false;
    this.IsValid = true;
  }
}

export const processText = (text: string): TextProps[][] => {
  const lines: string[] = text.replace(/^\n+|\n+$/g, "").split(/\r?\n/);
  const res: TextProps[][] = [];
  let index: number = 0;
  lines.forEach((line: string) => {
    const ln = line.trimEnd();
    const resTxt: TextProps[] = [];
    if (ln) {
      for (const ch of ln) {
        resTxt.push(new TextProps(index, ch));
        index++;
      }
    }
    res.push(resTxt);
    index++;
  });

  return res;
};
