import React from 'react';
import { Formik, Field, Form } from 'formik';

const UserForm = (props) => {
    return (
    <div>
      <Formik
        initialValues={{
          opts: 'bothCaps',
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
                                <Field type="select" name="numDigitCount" value="numDigitCount" as="select">
                                    <option key={1} value="1" label="one" >one</option>
                                    <option key={2} value="2" label="two">two</option>
                                    <option key={3} value="3" label="three">three</option>
                                    <option key={4} value="4" label="four">four</option>
                                </Field>
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