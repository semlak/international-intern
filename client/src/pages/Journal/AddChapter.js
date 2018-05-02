import React from 'react';
import TextField from 'material-ui/TextField';
// import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
// import firebase from '../../utils/firebase';
// import { MenuItem } from 'material-ui/Menu';
// import Input, { InputLabel } from 'material-ui/Input';

const AddChapter = (props) => {

  return (
    <div>
      <h3>Add New Chapter</h3>
      <form>
        <TextField
          label="Title"
          name="chapterTitle"
          type="text"
          value={props.chapterTitle}
          onChange={props.handleInputChange}
        />
        <br />
        <TextField
          label="Description"
          name="description"
          type="text"
          value={props.description}
          onChange={props.handleInputChange}
        />
        <br />
        <input name="date" type="date" step='' value={props.date} placeholder={Date.now()} onChange={props.handleInputChange} />
        <br />
        <input type="file" name="image" value={props.image} id="imgFile" ref={imgFile => this.imgFile = imgFile} onChange={props.handleInputChange} />
        <br />
        <p>Requirement</p>
        <select
          value={props.reqNum}
          onChange={props.handleInputChange}
        >
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <br />
        <Button variant="raised" onClick={props.handleFormSubmit} color="secondary">
          Add Journal
        </Button>
      </form>
    </div>
  )

}

export default AddChapter;
