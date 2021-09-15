export default function ItemFetchBar(props) {
  return (
    <div className="fetchbar">
      <input type="text" value={props.inputValue} onChange={props.inputChange} placeholder="URL from HobbySearch or amiami..." />
      <button className="button" onClick={props.onFetch}>Fetch</button>
    </div>
  )
}