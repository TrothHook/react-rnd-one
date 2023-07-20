import React from "react";
import {Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function FormInput(props) {
  return (
    <div>
      <Input
          type={props.type}
          placeholder={props.placeholder}
          required
          onChange={(e) => {
            props.submit(e.target.value);
          }}
        />
    </div>
  );
}

export default FormInput;
