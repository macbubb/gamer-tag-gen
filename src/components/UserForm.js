import React, { useEffect } from 'react';
import { Formik, Field, Form } from 'formik';

const UserForm = (props) => {
    useEffect(() => {
    }, [props.options]);
    return (
    <div>
      <Formik
        initialValues={{
          opts: props.options.opts,
          addNum: props.options.addNum,
          numDigitCount: props.options.numDigitCount,
          maxLength: props.options.maxLength
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 100));
          props.onUpdate(values);
        }}
      >
        {({ values }) => (
            <Form >
                <div className="main-display-left-controls-button">
                    <button className="generate-card" aria-label="Generate New Gamertag" type="submit">Submit</button>
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
                                    <option value="1" label="one" />
                                    <option value="2" label="two"/>
                                    <option value="3" label="three"/>
                                    <option value="4" label="four"/>
                                </Field>
                            </label>
                        </p>
                        <div role="group" aria-labelledby="cap-options">
                            <label>
                                <Field
                                    type="radio"
                                    name="opts" value="bothCaps"
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