import React, {Component} from "react";
class DebugVariables extends Component{

    convertToText(myBoolean){
        if(myBoolean === true){
            return "true";
        }
        else{
            return "false";
        }
    }
    render(){
        if(this.props.show === false){
            return(
                <div></div>
            );
        }
        else{
            const state = this.props.state;
            console.log("FourYear: " + state.fourYearTransfer);
            return(
                <div className="pt-5">
                <p><strong>Variables:</strong></p>
                <ul>
                    <li>gpa: {state.gpa}</li>
                    <li>performance: {state.performance}</li>
                    <li>highMath: {state.highMath}</li>
                    <li>highMathGrade: {state.highMathGrade}</li>
                    <li>calc: {state.calc}</li>
                    <li>path: {state.path}</li>
                    <li>apMath: {this.convertToText(state.apMath)}</li>
                    <li>apEnglish: {this.convertToText(state.apEnglish)}</li>
                    <li>fourYearTransfer: {this.convertToText(state.fourYearTransfer)}</li>
                    <li>gradeLevel: {state.gradeLevel}</li>
                    <li>resetGPAForm: {this.convertToText(state.resetGPAForm)}</li>
                    <li>esl: {this.convertToText(state.esl)}</li>
                    <li>startAt: {state.startAt}</li>
                    <li>assessmentTaken: {this.convertToText(state.assessmentTaken)}</li>
                    <li>hasTransferMath: {this.convertToText(state.hasTransferMath)}</li>
                    <li>hasTransferEnglish: {this.convertToText(state.hasTransferEnglish)}</li>
                    
            
                </ul>
                </div>
            );
        }
    }
}
export default DebugVariables;