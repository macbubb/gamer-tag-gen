import React, {Component} from 'react';
import CheckboxOrRadioGroup from '../components/CheckboxOrRadioGroup';
import PropTypes from 'prop-types';

class OptionsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNumSelection: [],
            addNumOptions: ['yes', 'no']
        }
        this.handleAddNum = this.handleAddNum.bind(this);
    }
    handleAddNum(e) {
        this.asdf({addNumSelection: e.target.value});
      }
}