import { FC, useState } from 'react';
import { RichTextElement } from './RichTextElement';
import { FAQ } from '../models';

type Props = Readonly<{
  item: FAQ;
}>;

export const FaqAccordionComponent: FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion" style={{padding:"10px"}}>
      <button className="accordion-title" style={{padding:"10px"}} onClick={toggleAccordion}>
        {props.item.elements.question.value}
      </button>
      {isOpen && <div className="accordion-content" style={{padding:"10px"}}><RichTextElement
        element={props.item.elements.answer}
      /></div>}
    </div>
  );
};