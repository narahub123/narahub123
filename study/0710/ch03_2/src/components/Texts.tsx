import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { makeClassName } from "./textUtil";

type TextProp = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export type TitleType = TextProp & {
  numberOfLines?: number;
};

export const Title: FC<TitleType> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    "font-bold text-5xl text-center whitespace-pre-line",
    _className,
    numberOfLines
  );
  return <p {...props} className={className} />;
};

export type SubTitleType = TitleType & {};

export const SubTitle: FC<SubTitleType> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    "font-semibod text-3xl text-center whitespace-pre-line",
    _className,
    numberOfLines
  );
  return <p {...props} className={className} />;
};

export type SummaryType = SubTitleType & {};

export const Summary: FC<SummaryType> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    "text-sm whitespace-pre-line",
    _className,
    numberOfLines
  );
  return <p {...props} className={className} />;
};

export type ParagraphType = TitleType & {};

export const Paragraph: FC<ParagraphType> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    "font-normal text-base whitespace-pre-line",
    _className,
    numberOfLines
  );
  return <p {...props} className={className} />;
};
