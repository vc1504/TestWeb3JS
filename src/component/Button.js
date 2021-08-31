import React, {Component} from "react";

class Button extends Component{


    render(){

        const {id,classname, label, disabled, onClick} = this.props;

        return(
                <button 
                id={id}
                type="button"
                className= {classname}
                disabled = {disabled}
                onClick={onClick}>
                {label}
                </button>            
        );
    }

}

export default Button;
