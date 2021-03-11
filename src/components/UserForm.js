import React from 'react';
import { Formik, Field, Form } from 'formik';

const UserForm = (props) => {
    return (
    <div>
      <Formik
        initialValues={{
          opts: '',
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          props.onUpdate(values);
        }}
      >
        {({ values }) => (
            <Form>
                <div className="main-display-left-controls-button">
                    <button type="submit">Submit</button>
                </div>
                <div className="main-display-left-controls-options">
                    <div className="main-display-left-controls-options-inner">
                        <h2>Gamertag Options</h2>
                        <p className="checkboxes">
                            <label htmlFor="Add number">
                                <span>Include number</span>
                                <br/>
                                <Field
                                    type="checkbox" name="addNum"
                                />
                            </label>
                            <label htmlFor="numDigitCount">
                                Number of Digits&nbsp;
                                <select name="numDigitCount" id="">
                                    <option value="1" label="one" checked/>
                                    <option value="2" label="two" />
                                    <option value="3" label="three"/>
                                    <option value="4" label="four" />
                                </select>
                            </label>
                        </p>
                        <div role="group" aria-labelledby="cap-options">
                            <label>
                                <Field
                                    type="radio"
                                    name="opts" value="bothCaps"
                                    checked
                                />
                                Capitalize both parts
                                <br/>
                            </label>
                            <label>
                                <Field
                                    type="radio"
                                    name="opts" value="frontCap" />
                                Only capitalize first letter
                                <br/>
                            </label>
                            <label>
                                <Field
                                    type="radio"
                                    name="opts" value="allCaps" />
                                All caps
                            </label>
                        </div>
                    </div>
                </div>
            </Form>
        )}
      </Formik>
    </div>
  );
}

  export default UserForm;