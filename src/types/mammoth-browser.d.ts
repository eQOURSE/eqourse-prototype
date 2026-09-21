/**
 * Types for mammoth's prebuilt browser bundle.
 *
 * The viewer imports `mammoth/mammoth.browser.min.js` rather than the package
 * root on purpose: the root entry pulls in Node built-ins through its own lib
 * tree, which would need polyfilling under Vite. The prebuilt bundle is already
 * browser-ready, but it ships no type declarations, so the small surface the
 * viewer actually uses is declared here.
 */
declare module "mammoth/mammoth.browser.min.js" {
  export interface ConvertMessage {
    type: string;
    message: string;
  }

  export interface ConvertResult {
    value: string;
    messages: ConvertMessage[];
  }

  export interface ConvertInput {
    arrayBuffer: ArrayBuffer;
  }

  export interface ConvertOptions {
    styleMap?: string | string[];
convertImage?: unknown;
  }

  export function convertToHtml(
    input: ConvertInput,
    options?: ConvertOptions,
  ): Promise<ConvertResult>;

  export function extractRawText(input: ConvertInput): Promise<ConvertResult>;
}
