import React, { Component } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

class CustomButton extends Component {
  render() {
    const { fill, simple, pullRight, round, block, ...rest } = this.props;


    return <Button {...rest} />;
  }
}

CustomButton.propTypes = {
  fill: PropTypes.bool,
  simple: PropTypes.bool,
  pullRight: PropTypes.bool,
  block: PropTypes.bool,
  round: PropTypes.bool
};

export default CustomButton;
