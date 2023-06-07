export type FormHook = {
  initialState: Record<string, string>;
  callback: () => unknown;
  validate: (values: Record<string, string>) => Record<string, string>;
};
