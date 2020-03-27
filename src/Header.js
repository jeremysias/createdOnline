import React, {Component} from "react";


class Header extends Component{
    renderHtml(){
        var level = this.props.level; //level determines which header type h1, h2, etc...
        var text = this.props.text;
        var show = this.props.show;
        
        if(show){
            if(level === '1'){
                return (<h1>{text}</h1>);
            }
            else if(level === '2'){
                return (<h2>{text}</h2>);
            }
            else if(level === '3'){
                return (<h3>{text}</h3>);
            }
            else if(level === '4'){
                return (<h4>{text}</h4>);
            }
            else if(level === '5'){
                return (<h5>{text}</h5>);
            }
        }
        return '';
    }
    render(){
        const html = this.renderHtml();
        return (
            <div>{html}</div>
        )
    }
}
export default Header;