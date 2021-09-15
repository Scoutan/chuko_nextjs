import { useReducer } from 'react';
import ItemDetail from './ItemDetail';
import Dimmer from './Dimmer';

export default function ItemList(props) {
  const reducer = (state, action) => {
    switch (action) {
      case 'cards':
        return { layout: 'cards', containerClass: 'card', animate: true };
      case 'list':
        return { layout: 'list', containerClass: 'list-container', animate: true };
      case 'reset':
        return { layout: state.layout, containerClass: state.containerClass, animate: false };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, { layout: 'cards', containerClass: 'card', animate: false });

  return (
    <div>
      <div className="container">
        <span>Layout options: </span>
        <button className="button" onMouseDown={() => dispatch('reset')} onClick={() => dispatch('cards')}>Cards</button>
        <button className="button" onMouseDown={() => dispatch('reset')} onClick={() => dispatch('list')}>List</button>
      </div>
      {props.loadingItems > 0 ?
        <Dimmer message={`Fetching ${props.loadingItems} items...`} />
        : null
      }
      <div className={`contents ${(state.animate) ? 'animate-bottom' : ''}`}>
        <div className={state.layout}>
          {
            props.items.map((item, index) => {
              return <ItemDetail
                item={item}
                pendingStockUpdate={props.pendingStockUpdate}
                fetchStock={props.fetchStock}
                removeItem={props.removeItem}
                index={index}
                key={item.itemID}
                containerClass={state.containerClass}
              />
            })
          }
        </div>
      </div>
    </div>
  )
}