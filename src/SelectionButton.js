import React, {Component} from "react";

class SelectionButton extends Component{
    render(){

        const text = this.props.text;
        let value = this.props.value;
        if(value === null) value = text;
        //const myKey = this.props.myKey;
        const className= this.props.className;

        if(this.props.hide){
           return('');
        }
        else{
            if(this.props.modal === true){
                return(
                    <button className={className} data-toggle="modal" data-target={this.props.dataTarget}
                            value={value} 
                            >
                            {text}
                        </button>
                )
            }
            else{
            return(
                
                        <button className={className} onClick={this.props.onClick}
                            value={value} disabled={this.props.disabled}
                            >
                            {text}
                        </button>
                

                );
            }
        }
    }
}
export default SelectionButton;