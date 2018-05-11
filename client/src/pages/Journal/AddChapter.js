import React from 'react';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import DropDown from './DropDown';
import AddItem from '../../components/AddItem';

const AddChapter = props => (
  <AddItem
    title="Add Journal"
    onClick={props.handleFormSubmit}
  >
    <form>
      <TextField
        label="Title"
        name="chapterTitle"
        type="text"
        value={props.chapterTitle}
        onChange={props.handleInputChange}
      />
      <TextField
        label="Description"
        name="description"
        type="text"
        value={props.description}
        onChange={props.handleInputChange}
      />
      <input
        style={{ padding: 5, marginTop: 10, marginBottom: 10 }}
        name="date"
        type="date"
        step=""
        value={props.date}
        placeholder={Date.now()}
        onChange={props.handleInputChange}
      />
      <input
        style={{ marginBottom: 10 }}
        type="file"
        name="image"
        value={props.image}
        id="fileButton"
        onChange={props.handleInputChange}
      />
      <FormControl>
        <InputLabel>Requirement</InputLabel>
        <DropDown
          name="requireNum"
          type="number"
          value={props.requireNum}
          onChange={props.handleInputChange}
          items={props.needs}
        />
      </FormControl>
    </form>
  </AddItem>
);

export default AddChapter;
