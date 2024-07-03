import { useEffect, useState } from 'react';
﻿import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import ShoppingListItem from './ShoppingListItem';
import axios from 'axios';

function App() {

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [addItemText, setAddItemText] = useState('');

  useEffect(() => {
    fetchShoppingList();
  }, []);

  function fetchShoppingList() {
    axios.get('http://localhost:5223/api/ShoppingList')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        setError(error);
      })
  }

  function addItem(itemName) {
    if(itemName === '') {
      return;
    }

    axios.post('http://localhost:5223/api/ShoppingList', {
      itemName: itemName
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      fetchShoppingList();
    })
    .catch(error => {
      console.error('There was an error adding the item!', error);
    });

    setAddItemText('');
  }

  return (
    <div className='shopping-list'>
      <div className='shopping-list-item'>
        <input
          value={addItemText}
          className='shopping-list-add-item-input'
          onChange={e => setAddItemText(e.target.value)}
          placeholder='Add Item...'
          onKeyDown={event => {
            if(event.key === 'Enter') {
              addItem(addItemText);
            }
          }}
          />
        <button onClick={() => addItem(addItemText)}>
          <FontAwesomeIcon icon={faCartPlus} />
        </button>
      </div>
    {items.length === 0 &&
      <h3>Shopping List is Empty</h3>
    }
    {items.length > 0 &&
      items.map(item => (
        <ShoppingListItem
          key={item.id}
          item={item}
          />
      ))
    }
    </div>
  );
}

export default App;
