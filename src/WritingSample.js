import React, {Component} from "react";
import SelectionButton from "./SelectionButton";
import strings from "./Strings";

class WritingSampleForm extends Component{

    constructor(props) {
        super(props);
        this.state = {
            seconds: '00', 
            minutes: '30'
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // method that triggers the countdown functionality
        this.startCountDown = this.startCountDown.bind(this);
        this.tick = this.tick.bind(this);
        this.secondsRemaining = 0; 
        this.intervalHandle = null;
        
        
    }
    handleChange(event) {
        this.setState({
        minutes: event.target.value
        })
    }
    tick() {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
        this.setState({
            minutes: min,
            seconds: sec
        })
        if (sec < 10) {
            this.setState({
                seconds: "0" + this.state.seconds,
            })
        }
        if (min < 10) {
            this.setState({
                value: "0" + min,
            })
        }
        if (min === 0 & sec === 0) {
            clearInterval(this.intervalHandle);
            this.props.writingComplete(30);
        }
        this.secondsRemaining --
    }
    startCountDown() {
        this.intervalHandle = setInterval(this.tick, 1000);
        let time = this.state.minutes;
        this.secondsRemaining = time * 60;
    }

    questionNoteText(note){
        if(note){
            return (
                <div className="alert alert-info" tabIndex="0">{note}</div>
            )
        }
    }
   componentDidMount(){
       this.startCountDown();
   }
   
   getWritingPrompt(){
       let writingPrompt;
       const str = strings.en.write_essay;
       switch(this.props.promptNumber){
            case 1: writingPrompt = str.prompt1; break;
            case 2: writingPrompt = str.prompt2; break;
            case 3: writingPrompt = str.prompt3; break;
            case 4: writingPrompt = str.prompt4; break;
            default: writingPrompt = "Something went wrong.";
       }
       return writingPrompt;
   }
   
   handleClick(){
       const time = parseInt('30') - this.state.minutes;
       this.props.writingComplete(time);
   }

    render(){
        const legend = this.props.legend;
        const writingPrompt = this.getWritingPrompt();
        return(
            <div>
                <div className="pt-4">
                    <fieldset className="p-4">
                        <legend className="question" tabIndex="0">{legend}</legend>
                        {this.questionNoteText(writingPrompt)}
                        <Timer minutes={this.state.minutes} seconds={this.state.seconds}/>
                        <div className="pt-2">
                            <div className="form-group">
                                <label htmlFor="writingSample">Your Answer</label>
                                <textarea className="form-control" id="writingSample" rows="6" onChange={this.props.onSampleChange}></textarea>
                            </div>
                            <SelectionButton
                                className="btn btn-primary"
                                text="Submit"
                                onClick={this.handleClick}
                                
                            />
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }

}
class Timer extends Component{
    render(){
        return(
            <div>
                <div>Time remaining: {this.props.minutes}:{this.props.seconds}</div>
            </div>
        )
    }
}


export default WritingSampleForm; 