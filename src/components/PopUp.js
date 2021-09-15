export default function PopUp({ popUp, togglePopUp }) {
  return (
    <div className="pop-up">
      <h4>
        {popUp.header}
      </h4>
      {popUp.message}
      <button onClick={togglePopUp}>
        OK
      </button>
    </div>
  )
}