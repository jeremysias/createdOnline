import React, {Component} from "react";
import SelectionButton from "./SelectionButton";

class SelectionButtonContainer extends Component{
    
    renderButton(i){
        const text = this.props.text[i];
        const value = this.props.value[i];
        const dataTarget = (this.props.dataTarget)? this.props.dataTarget[i]: null;
        const colClassName = this.props.colClassName;
        const onClick = this.props.onClick;
        let buttonDescription = '';
        if(this.props.buttonDescription){
            buttonDescription = this.getButtonDescription(this.props.buttonDescription[i]);
        }
        return (
            <div className={colClassName} key={i}>
                <SelectionButton
                    modal={this.props.modal}
                    dataTarget={dataTarget}
                    value={value}
                    text={text}
                    className={this.props.className}
                    onClick={onClick} />
                    {buttonDescription}
            </div>
        )

        
    }

    getButtonDescription(description){
        return(
            <p>{description}</p>
        )
    }

    renderAllButtons(){
        const textArray = this.props.text;
        //const valueArray = this.props.value;
        const length = textArray.length;
        //console.log("Array in RenderAllButtons");
        //console.log(textArray);
        //console.log("textArray length: " + length);
        let buttons = [];
        for(let i=0; i < length; i++){
           buttons.push( this.renderButton(i));
        }
        //console.log(buttons);
        return buttons;
    }

    componentDidUpdate(){
       /*
        if(this.props.id === this.props.focus){
            document.getElementById(this.props.id).focus();
        }
        */
    }
    questionNoteText(note){
        if(note){
            return (
                <div className="alert alert-info" tabIndex="0">{note}</div>
            )
        }
    }
    
    render(){

        //const text = this.props.text;
       // console.log(text);
        //console.log(text.text[0]);
        let hidden = 'd-none';
        if(this.props.show){
            hidden = '';
        }
        const legend = this.props.legend;
        const choices = this.props.text.length;
        let choicesText = choices + " options available"; 
        if(this.props.gsp){
            choicesText = choices + " path descriptions available";
        }
   
        return(
            <div className={hidden}>
                <div className="pt-4">
                    <fieldset className="p-4">
                        <legend className="question" tabIndex="0">{legend}</legend>
                        {this.questionNoteText(this.props.questionNote)}
                        <span className="sr-only sr-focusable" tabIndex="0" aria-label={choicesText}></span>
                        <div className="row pt-2">
                            
                                {this.renderAllButtons()}
                            
                        </div>
                    </fieldset>
                </div>
            </div>

        );
    }
}
export default SelectionButtonContainer;