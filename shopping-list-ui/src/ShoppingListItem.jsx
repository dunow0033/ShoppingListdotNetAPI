import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ShoppingListItem({ item }) {

    return (
        <>
            <div className='shopping-list-item'>
                <p>{item.itemName}</p>
            </div>
        </>
    )
}

export default ShoppingListItem;