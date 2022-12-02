function Sidebar(props) {
  function getTitle(body) {
    let splitArray = body.split('\n');
    let firstLine = splitArray[0];
    // let regex = /[^\w\s]+/g;
    // let titleText = firstLine.replace(regex, '').trim();
    return firstLine;
  }

  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === props.currentNote.id ? 'selected-note' : ''}`}
        onClick={() => props.setCurrentNoteId(note.id)}
      >
        <h4 className='text-snippet'>{getTitle(note.body)}</h4>
      </div>
    </div>
  ));
  return (
    <section className='pane sidebar'>
      <div className='sidebar--header'>
        <h3>Notes</h3>
        <button className='new-note' onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

export default Sidebar;
