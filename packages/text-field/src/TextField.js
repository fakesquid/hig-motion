import React, { Component } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import IconButton from "@hig/icon-button";
import Input from "./presenters/Input";

import "./text-field.scss";

function generatedId() {
  return `text-field-${Math.floor(Math.random() * 100000, 5)}`;
}

export default class TextField extends Component {
  static propTypes = {
    /**
     * Initial value of the field, user actions will override
     */
    defaultValue: PropTypes.string,
    /**
     * Prevents user actions on the field
     */
    disabled: PropTypes.bool,
    /**
     * Error text for the field. Setting this value applies error styling to the entire component.
     */
    errors: PropTypes.string,
    /**
     * When true, displays passed error text. When false, displays instructions with error styling.
     */
    hideInstructionsOnErrors: PropTypes.bool,
    /**
     * HTML ID attribute
     */
    id: PropTypes.string,
    /**
     * Icon element that precedes the input.
     */
    icon: PropTypes.node,
    /**
     * Instructional text for the field
     */
    instructions: PropTypes.string,
    /**
     * Text describing what the field represents
     */
    label: PropTypes.string,
    /**
     * Name of the field when submitted with a form
     */
    name: PropTypes.string,
    /**
     * Called when user moves focus from the field
     */
    onBlur: PropTypes.func,
    /**
     * Called after user changes the value of the field
     */
    onChange: PropTypes.func,
    /**
     * Called when user clicks the clear button
     */
    onClearButtonClick: PropTypes.func,
    /**
     * Called when user puts focus onto the field
     */
    onFocus: PropTypes.func,
    /**
     * Called as user changes the value of the field
     */
    onInput: PropTypes.func,
    /**
     * Example of what the user should type into the field
     */
    placeholder: PropTypes.string,
    /**
     * Text describing why the field is required
     */
    required: PropTypes.string,
    /**
     * When true, causes the clear button to appear
     */
    showClearButton: PropTypes.bool,
    /**
     * Corresponds to the type attribute of an <input>. Relevant for designating a password field, for example.
     */
    type: PropTypes.string,
    /**
     * Value of the field
     */
    value: PropTypes.string
  };

  static defaultProps = {
    id: generatedId(),
    type: "text"
  };

  state = {
    value: this.props.defaultValue || this.props.value
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    if (this.props.onChange) this.props.onChange(event);
  };

  handleInputClear = event => {
    this.setState({ value: "" });
    // @TODO: seems we should also trigger the onChange handler?
    if (this.props.onClearButtonClick) this.props.onClearButtonClick(event);
  };

  hasClearableInput() {
    return (
      this.props.showClearButton &&
      this.state.value &&
      this.state.value.length > 0
    );
  }

  shouldShowInstructions() {
    if (this.props.instructions) {
      if (this.props.errors) {
        return !this.props.hideInstructionsOnErrors;
      }
      return true;
    }

    return false;
  }

  render() {
    const hasClearableInput = this.hasClearableInput();

    return (
      <div
        className={cx("hig__text-field", {
          "hig__text-field--required": this.props.required,
          "hig__text-field--clear-button-visible": hasClearableInput
        })}
      >
        <div
          className={cx("hig__text-field__content", {
            "hig__text-field__content--with-icon": this.props.icon
          })}
        >
          <div className="hig__text-field__input-wrapper">
            {this.props.icon && (
              <label
                className={cx("hig__text-field__icon-v1", {
                  "hig__text-field__icon-v1--disabled": this.props.disabled
                })}
                htmlFor={this.props.id}
              >
                {this.props.icon}
              </label>
            )}

            <Input
              id={this.props.id}
              value={this.state.value}
              onChange={this.handleChange}
              name={this.props.name}
              type={this.props.type}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
              onBlur={this.props.onBlur}
              onFocus={this.props.onFocus}
              onInput={this.props.onInput}
            />

            {this.props.label && (
              <label
                htmlFor={this.props.id}
                className="hig__text-field__label-v1"
              >
                {this.props.label}
              </label>
            )}

            {hasClearableInput && (
              <span className="hig__text-field__clear">
                <IconButton
                  type="transparent"
                  icon="clear-small"
                  title="Clear field"
                  onClick={this.handleInputClear}
                />
              </span>
            )}
          </div>

          {this.shouldShowInstructions() && (
            <p className="hig__text-field__instructions">
              {this.props.instructions}
            </p>
          )}

          {this.props.errors && (
            <p className="hig__text-field__errors">{this.props.errors}</p>
          )}

          {this.props.required && (
            <p className="hig__text-field__required-notice">
              {this.props.required}
            </p>
          )}
        </div>
      </div>
    );
  }
}
