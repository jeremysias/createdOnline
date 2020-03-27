import React, {Component} from "react";

class SelectionDisplay extends Component{
    render(){
        const show = this.props.show;
        const field = this.props.field;
        const value = this.props.value;
        if(show){
            return(
                <div>
                    <p>{field}: {value}</p>
                </div>

            );
        }
        else{
            return('');
        }
    }
}
export default SelectionDisplay;