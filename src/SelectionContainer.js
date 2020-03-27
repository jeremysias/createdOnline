import React, {Component} from "react";

import SelectionInput from "./SelectionInput";
import SelectionDisplay from "./SelectionDisplay";

import SelectionButtonContainer from "./SelectionButtonContainer";
import SelectionButton from "./SelectionButton";
import Placement from "./Placement";
import Header from "./Header";
class SelectionContainer extends Component{
    constructor(props){
        super(props);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.handleMathButtonClick = this.handleMathButtonClick.bind(this);
        this.handlePathButtonClick = this.handlePathButtonClick.bind(this);
        this.handleResetButtonClick = this.handleResetButtonClick.bind(this);
        this.state = {

            gpaValid: false,
            
            showMath: false,
            showPath: false,
            mode: 'Questions'
            
        }
    }
    handleGPAChange(e){
        const newGpa = e.target.value;
        this.props.setGPA(newGpa);
        //this.setState({gpa: newGpa});
        const regex1 = RegExp('^[0-3].[0-9]$|^[4].[0]$');
        if( regex1.test(newGpa) ){
            this.setState({gpaValid: true, showMath: true});
        }
        else{
            this.setState({gpaValid: false});
        }
        
    }
    handleMathButtonClick(e){
        const highMath = e.target.value;
        this.props.setHighMath(highMath);
        this.setState({
            //highMath: e.target.value,
            
            showMath: false,
            showPath: true
        });
        
    }
    handlePathButtonClick(e){
        this.props.setPath(e.target.value);
        if(this.props.path === "0" && (this.props.highMath === "3" || this.props.highMath === "2")){
            console.log("Showing Calc Question: highMath: "+this.props.highMath);
            this.props.showCalcQuestions();
        }
        else{
            console.log("Showing Placement: highMath: "+ this.props.highMath);
            this.props.showPlacement();
        }
        
        this.setState({
           // path: e.target.value,
            
            showPath: false,
            mode: 'Your Placements'
        });
    }
    handleResetButtonClick(){

        this.setState({gpa: '',
            gpaValid: false,
            highMath: '',
            
            path: '',
            
            mode: 'Questions',
            showMath: false,
            showPath: false

        });
        this.props.setGPA("");
        //document.getElementById('gpaInput').value = '';
        document.getElementById('mainTitle').focus();

    }
    



    render(){
        //console.log("gpa: " + this.state.gpa);
        //console.log("highMath: " + this.state.highMath);
        
        //console.log("path: " + this.state.path);
        
        //console.log();
        if(this.props.resetGPAForm === true){
            this.setState({
                    gpaValid: false,
                    showMath: false,
                    showPath: false,
                    mode: 'Questions'

            });
            this.props.turnOffGPAFormFlag();
        }
        
        const mathText = [ "Beginning Algebra (Integrated Math 1, 2, or lower)","Intermediate Algebra (Integrated Math 3 or Algebra 2)", "Advanced Algebra (College Algebra)","Pre-Calculus","Calculus"];
        
        const numberArray = [0,1,2,3,4];
        const pathText = ["BSTEM: Business, Science Technology, Engineering, or Math","SLAM: Statistics or Liberal Arts Major"];
        
      //  console.log (textArray);
      if(this.props.showGPAQuestion){
          const mathChoice = mathText[this.props.highMath];
          const pathChoice = pathText[this.props.path];
          //console.log("pathChoice: " + pathChoice);
          
        return(
            /*
                  
            */
            <div>
                <div className="row">
                    <div className="col-md-9">
                        
                        <h2>{this.state.mode}</h2>
                        <SelectionInput
                            id="gpaInput"
                            show={!this.state.gpaValid}
                            gpaValid={this.state.gpaValid}
                            value={this.props.gpa} 
                            
                            onChange={this.handleGPAChange} />
                        <SelectionButtonContainer
                            colClassName="col-sm-12 p-2"
                            className="btn btn-block btn-lg btn-primary"
                            show={this.state.showMath}
                            id="highMathContainer"
                            legend="Select the highest math class you have taken so far:"
                            onClick={this.handleMathButtonClick}
                            text={mathText}
                            value={numberArray}
                            />
                        <SelectionButtonContainer
                            colClassName="col-sm-12 p-2"
                            className="btn btn-block btn-lg btn-primary"
                            show={this.state.showPath}
                            id="mathTypeContainer"
                            legend="Choose your path"
                            onClick={this.handlePathButtonClick}
                            text={pathText}
                            value={numberArray} />
                        
                    </div>
                    <div className="col-md-3">
                        <Header
                            show={this.state.gpaValid}
                            text="Your Answers"
                            level="3"/>
                        
                        <SelectionDisplay
                            show={this.state.gpaValid}
                            field="GPA"
                            value={this.props.gpa}
                             />
                        <SelectionDisplay
                            show={this.props.highMath}
                            field="Math"
                            value={mathChoice} />
                        <SelectionDisplay
                            show={this.props.path}
                            field="Path"
                            value={pathChoice} />

                        <br />
                        <SelectionButton
                            hide={!this.state.gpaValid}
                            className="btn btn-secondary"
                            text="Start Over"
                            onClick={this.handleResetButtonClick}
                            />
                    </div>
                </div>
                
                
            </div>

        );
      }
      else{
          return(<div></div>);
      }
    }
}
export default SelectionContainer;