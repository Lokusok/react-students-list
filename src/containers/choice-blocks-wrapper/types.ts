export type TChoiceItem = {
  title: string;
  imgSrc: string;
  renderIcon: (width: number, height: number) => React.ReactNode;
  href?: string;
};

export type TChoiceProps = {
  items: Array<TChoiceItem>;
};
