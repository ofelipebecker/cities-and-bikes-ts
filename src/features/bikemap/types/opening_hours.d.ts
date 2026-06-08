declare module 'opening_hours' {
  interface PrettifyConf {
    locale?: string;
  }

  interface PrettifyOptions {
    conf?: PrettifyConf;
    rule_index?: number;
    get_internals?: boolean;
  }

  interface opening_hours {
    prettifyValue(options?: PrettifyOptions): string;
  }
}
