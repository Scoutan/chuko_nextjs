import ItemFetchBar from './ItemFetchBar';

export default function ItemMenu(props) {
  return (
    <div className="main-menu">
      {/* <button className="button" onClick={props.load}>
        Load from file
      </button>
      <button className="button" onClick={props.save}>
        Save to file
      </button>
      <button className="button" onClick={props.clear}>
        Clear file
      </button> */}
      <button className="button" onClick={props.test}>
        Fetch Test
      </button>
      <button className="button" onClick={props.testAPI}>
        Test API
      </button>
      <ItemFetchBar
        loadingSearch={props.loadingSearch}
        inputValue={props.inputValue}
        inputChange={props.inputChange}
        onFetch={props.onFetch}
      />
    </div>
  )
}