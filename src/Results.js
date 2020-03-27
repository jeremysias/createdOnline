import React, {Component} from "react";


class Results extends Component{
    //props firstName, lastName, studentId, readingLevel, writingLevel, listenSpeakLevel, timeSpentWriting

    render(){
        return(
            <div>
                <div role="grid">
                    <div className="row" role="row">
                        <div className="col-lg-12" >
                            <div className="p-2" role="columnheader"><h2>My Results</h2></div>
                            
                            <div className="card mb-4" role="cell">
                                <div className="card-header"><strong>Reading Level Chosen</strong></div>
                                <div className="card-body">{this.props.readingLevel}</div>
                                </div>
                            <div className="card mb-4" role="cell">
                                <div className="card-header"><strong>Listening-Speaking Level Chosen</strong></div>
                                <div className="card-body">{this.props.listenSpeakLevel}</div>
                                </div>
                            <div className="card mb-4" role="cell">
                                <div className="card-header"><strong>Writing Level Chosen</strong></div>
                                <div className="card-body">{this.props.writingLevel}</div>
                            </div>
                            <div className="card mb-4" role="cell">
                                <div className="card-header"><strong>Time Spent Writing</strong></div>
                                <div className="card-body">{this.props.timeSpentWriting} minutes</div>
                            </div>
                            <div className="card mb-4" role="cell">
                                <div className="card-header"><strong>Writing Sample</strong></div>
                                <div className="card-body">{this.props.writingSample}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Results;