import React, {Component} from "react";
import ModalGPA from "./ModalGPA";
import SelectionButton from "./SelectionButton";

class SelectionInput extends Component{

    constructor(props){
        super(props);
        this.goToGSP = this.goToGSP.bind(this);
    }
    componentDidUpdate(){
     /*   const id = this.props.focus;

        const element = document.getElementById(id);
    
        if(this.props.show){
           element.focus();
        }
        */
    }

    goToGSP(){
        //displays message 'Because you cannot give gpa....
        this.props.goToGSP(true);
    }
    render(){
        let hidden = 'd-none';
        if(this.props.show){
            hidden = '';
        }
        //console.log(this.props.show);
 
        const describedby = this.props.id + "-desc";
        let descText = '';
        if(this.props.value.length > 0 && !this.props.gpaValid){
            descText = 'Enter a decimal value between 0.1 and 4.9';
        }
        return(
            <div className={hidden}>
                <fieldset>
                    <legend><strong>High School GPA (Grade Point Average)</strong></legend>
                    <div className="form-group">
                        <label htmlFor={this.props.id}>Enter GPA (0.1 - 4.0+). If unsure, please estimate using the get help button below.</label>
                        <input id={this.props.id} className="form-control" value={this.props.value} placeholder="ex: 3.0" aria-describedby={describedby}
                        onChange={this.props.onChange} />
                        <small id={describedby} className="form-text text-red">{descText}</small>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <SelectionButton
                            text="Submit My GPA"
                            value={null}
                            className={"btn btn-primary btn-block"}
                            disabled={!this.props.gpaValid}
                            onClick={this.props.submitGPA}
                            />
                        </div>
                    </div>
                    
                    
                </fieldset>
                
                <fieldset >
                    <legend className="pt-4">Other Options</legend>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="pb-4">
                                <ModalGPA />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="pb-4">
                            <SelectionButton 
                                text="Even with help I am unable to report a GPA"
                                value={null}
                                onClick={this.goToGSP}
                                className="btn btn-secondary btn-block"

                            />
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        )
            
        

    }
}
export default SelectionInput;