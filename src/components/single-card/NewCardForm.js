import React, { useState } from 'react';
import { Checkboxes } from './Checkboxes';

export const NewCardForm = ({ list, addCard, listName, children, setShowModalWindow }) => {

   let [showForm, setShowForm] = useState(false);
   let [title, setTitle] = useState('');
   let [description, setDescription] = useState('');
   let [labels, setLabels] = useState([]);

   const calcId = list => {
      let allId = [];
  
      if(list.length === 0) {
        return 1;
      }
      for(let card of list) {
        allId.push(card.id);
      }
      let biggestId = Math.max(...allId);
      return biggestId + 1;
   }

   const handleCard = e => {
      addCard(
         listName, 
         {
            title, 
            description, 
            labels, 
            id: calcId(list)
         });
      setShowForm(false);
      clearForm();
      if(setShowModalWindow) setShowModalWindow(false);
      e.preventDefault();
   }

   const chooseLabel = e => {
      const {checked, value} = e.target;

      if(checked) {
         setLabels([...labels, value]);

      }else {
         setLabels(labels.filter(item => item !== value));
      }
   }

   const clearForm = () => {
      setTitle('');
      setDescription('');
      setLabels([]);
   }

   if(!showForm && !setShowModalWindow) {
      return (
         <li className = 'singleCard addCardWrap'>
            <button className = 'addCardBtn' 
               onClick = {() => {
                  setShowForm(true);
                  clearForm();
               }}>
                  +
            </button>
         </li>
      )
   }

   const closeBtn =  <button 
                        className = 'closeBtn'
                        onClick = {() => setShowForm(false)}>
                           &#xD7;
                     </button>;

   const renderCloseBtn = children ? null : closeBtn;

   return (
      <li className = 'singleCard addCardWrap'>
         {renderCloseBtn}
         <form className = 'cardForm'
            onSubmit = {e => handleCard(e)}>
            {children}
            <input type = 'text' required
               className = 'titleInput'
               value = {title}
               onChange = {e => {setTitle(e.target.value);}}
            />
            <Checkboxes 
               chooseLabel = {chooseLabel} 
               labels = {labels} 
            />
            <textarea className = 'textInput'
               value = {description}
               onChange = {e => setDescription(e.target.value)}
               />
            <button type = 'submit' className = 'addCardBtn newCardBtn'>
               Add card
            </button>
         </form>
      </li>
   )
}
