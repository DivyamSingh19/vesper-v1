export interface pdfInfo {
  Title?: string;
  Author?: string;
  Subject?: string;
  Keywords?: string;
}

export interface parsedResult {
  title: string;
  author: string;
  subject: string;
  keywords: string;
  numPages: number;
  text: string;
}
