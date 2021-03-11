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
                <button type="submit">Submit</button>
                <h2>Options</h2>
                <div role="group" aria-labelledby="cap-options">
                    <label>
                        <Field type="radio" name="opts" value="bothCaps" />
                        Capitalize both parts
                    </label>
                    <label>
                        <Field type="radio" name="opts" value="frontCap" />
                        Only capitalize first letter
                    </label>
                    <label>
                        <Field type="radio" name="opts" value="allCaps" />
                        All caps
                    </label>
                </div>
            </Form>
        )}
      </Formik>
    </div>
  );
}

  export default UserForm;