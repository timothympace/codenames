// flow-typed signature: 703ec54b943d1ebb3fa12dd77d317729
// flow-typed version: c6154227d1/aphrodite_v0.5.x/flow_>=v0.104.x

declare module "aphrodite" {
  declare type DehydratedServerContent = {
    html: string,
    css: {
      content: string,
      renderedClassNames: Array<string>,
      ...
    },
    ...
  };

  declare type SheetDefinition = { [key: string]: Object, ... };

  declare export type StyleDefinition = { [key: string]: {
    _name: string,
    _definition: Object,
    ...
  }, ... };

  declare export var css: (
    ...definitions: Array<StyleDefinition | false>
  ) => string;

  declare export var StyleSheetServer: { renderStatic(renderFunc: Function): DehydratedServerContent, ... };

  declare export var StyleSheet: { create(
    sheetDefinition: SheetDefinition
  ): { [key: string]: StyleDefinition, ... }, ... };

  declare export var StyleSheetTestUtils: {
    suppressStyleInjection: () => void,
    clearBufferAndResumeStyleInjection: () => void,
    ...
  };
}

declare module "aphrodite/no-important" {
  declare module.exports: $Exports<"aphrodite">;
}
