import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
import strings from "./Strings";

class WritingComparison extends Component{

    render(){
        const str = strings.en.other_student_writing_samples;
        let otherSample;
        let buttons; 
        switch(this.props.otherSampleNumber){
            case 940: buttons = ["-",<span>{str.a2} {this.props.smile}</span>,<span>{str.a3} {this.props.arrowUp}</span>]; break;
            case 980: buttons = [<span>{str.a1} {this.props.arrowDown}</span>,<span>{str.a2} {this.props.smile}</span>,"-"]; break;
            default: buttons = [<span>{str.a1} {this.props.arrowDown}</span>,<span>{str.a2} {this.props.smile}</span>,<span>{str.a3} {this.props.arrowUp}</span>];
        }
        switch(this.props.otherSampleNumber){
            case 940: otherSample = str.sample_940; break;
            case 950: otherSample = str.sample_950; break;
            case 960: otherSample = str.sample_960; break;
            case 970: otherSample = str.sample_970; break;
            case 980: otherSample = str.sample_980; break;
            default: otherSample = "Something went wrong";
        }
        return(
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Your Writing</strong></p>
                        <p>{this.props.writingSample}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Other student's writing at level {this.props.otherSampleNumber}</strong></p>
                        <p>{otherSample}</p>
                    </div>
                </div>
                <SelectionButtonContainer
                            colClassName="col-md-4"
                            className="btn btn-block btn-lg btn-primary"
                            show={true}
                            id="myButton"
                            legend={str.q}
                            onClick={this.props.handleClick}
                            text={buttons}
                            value={["0","1","2","3","4","5"]}
                            buttonDescription=""
                            questionNote=""
                        />
            </div>
        )
    }
}
export default WritingComparison;