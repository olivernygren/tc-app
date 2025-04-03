export type OptionType = {
  label: string;
  value: string;
};

export type ValueChangeDetails<T> = {
  value: Array<T>;
  items: Array<OptionType>
};
