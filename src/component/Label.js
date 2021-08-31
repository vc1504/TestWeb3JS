import React, {Component} from 'react';

class Label extends Component{
    render(){

        const {text} = this.props;
        return(
            <label>{text}</label>
        );
    }
}

export default Label
