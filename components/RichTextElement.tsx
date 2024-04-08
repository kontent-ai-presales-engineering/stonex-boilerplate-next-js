import React, { FC } from "react";
import { PortableText, PortableTextReactComponents, toPlainText } from "@portabletext/react";
import { nodeParse, resolveImage, resolveTable, toHTMLImageDefault, transformToPortableText } from "@kontent-ai/rich-text-resolver"
import { Elements } from "@kontent-ai/delivery-sdk";
import { FaqAccordionComponent } from "./FaqAccordion";
import { FAQ, contentTypes } from "../models";

type ElementProps = Readonly<{
  element: Elements.RichTextElement;
}>;

export const portableTextComponents = (
  richTextElement: Elements.RichTextElement
): Partial<PortableTextReactComponents> => ({
  types: {
    // resolution for component custom block, representing linked items/components in rich text content
    component: ({ value }) => {
      const componentItem = richTextElement.linkedItems.find(item => item.system.codename === value.component._ref);
      switch (componentItem.system.type) {
        case contentTypes.faq.codename:
          return <FaqAccordionComponent item={componentItem as FAQ} />;          
        default:
          return <div>{componentItem?.elements.text_element.value}</div>;
      }
    },
    // resolution for tables in rich text.
    // makes use of resolveTable helper method included in the package.
    table: ({ value }) => {
      const tableString = resolveTable(value, toPlainText);
      return <>{tableString}</>;
    },
    // resolution for assets in rich text.
    // makes use of resolveImage helper method included in the package.
    image: ({ value }) => {
      const imageString = resolveImage(value, toHTMLImageDefault);
      return <>{imageString}</>;
    }
  },
  marks: {
    // resolution for links to external URLs
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a href={value?.href} target={target} rel={value?.rel} title={value?.title} data-new-window={value?.['data-new-window']}>
          {children}
        </a>
      )
    },
    // resolution for links to content items
    internalLink: ({ value, children }) => {
      const item = richTextElement.linkedItems.find(item => item.system.id === value?.reference._ref);
      return (
        <a href={"https://website.xyz/" + item?.system.codename}>
          {children}
        </a>
      )
    }
  }
});

// custom component rendering the resolved rich text
export const RichTextElement: FC<ElementProps> = (props) => {
  // https://github.com/portabletext/react-portabletext#customizing-components

  const parsedTree = nodeParse(props.element.value); // or browserParse, converts HTML to JSON tree
  const portableText = transformToPortableText(parsedTree); // converts JSON tree to portable text

  return (
    /**
     * component from @portabletext/react package.
     * accepts an array of portable text blocks and the `components` object which
     * defines resolution for individual portable text entities.
     */
    <PortableText value={portableText} components={portableTextComponents(props.element)} />
  );
};