import React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import DropDownContent from './DropDown';

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

        <input type="file" name="image" value={props.image} id="fileButton" onChange={props.handleInputChange} />
        <br />

        <p>Requirement</p>
        <select
          name="requireNum"
          type="number"
          value={props.requireNum}
          onChange={props.handleInputChange}
        >
        {props.needs.map(need=>
          <DropDownContent key={need._id}{...need} />)}
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