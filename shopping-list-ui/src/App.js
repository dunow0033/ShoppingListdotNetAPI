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

  function toggleIsPickedUp(id) {
    setItems(items.map(item => {
      if(item.id === id) {
        axios.patch(`http://localhost:5223/api/ShoppingList/${id}?isPickedUp=${!item.isPickedUp}`, null, {
          params: {
            isPickedUp: !item.isPickedUp
          }
      })
      .then(res => {

      })
      .catch(error => {
        console.error("There was an error updating the item: ", error);
      });

      return { ...item, isPickedUp: !item.isPickedUp };
    } else {
      return item;
    }
  }));
}


  // function toggleIsPickedUp(id) {
  //   setItems(items.map(item => {
  //       if (item.id === id) {
  //           fetch(`http://localhost:5223/api/ShoppingList/${id}?isPickedUp=${!item.isPickedUp}`, {
  //               method: 'PATCH'
  //           })
  //               .then(res => res.json());
  //           return {...item, isPickedUp: !item.isPickedUp};
  //       } else {
  //           return item;
  //       }
  //     }));
  // }


  function deleteItem(id) {
    
    if(id === null) {
      return;
    }

    axios.delete(`http://localhost:5223/api/ShoppingList/${id}`)
        .then(res => {
            if(res.status === 200) {
              setItems(items.filter(item => item.id !== id));
            }
        });
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
          deleteItem={deleteItem}
          toggleIsPickedUp = {toggleIsPickedUp}
          />
      ))
    }
    </div>
  );
}

export default App;
