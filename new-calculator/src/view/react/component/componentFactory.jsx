import React from "react";
// import SFCButton from "./SFCButton";
import Button from "./button";
import Div from "./div";

export default class ComponentFactory extends React.Component {
    render() {
        switch (this.props.controlType) {
            case "div":
                return <Div {...this.props} />;
            case "button":
                return <Button {...this.props} />;
            default:
        }
    }
}
