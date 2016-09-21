var React = require("react");
var ReactPropTypes = React.PropTypes;
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

// React-Bootstrap components
var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;

var TextInput = React.createClass({

    mixins: [PureRenderMixin],

    propTypes: {
        initialText: ReactPropTypes.string.isRequired,
        onSubmit: ReactPropTypes.func.isRequired,
    },

    getInitialState: function() {
        return {
            text: this.props.initialText,
        };
    },

    onChange: function(event) {
        var text = event.target.value;
        this.setState({text: text});
    },

    onKeyUp: function(event) {
        var ENTER = 13;
        if(event.keyCode == ENTER) {
            this.submitText();
        }
    },

    submitText: function() {
        this.props.onSubmit(this.state.text);
    },

    render: function() {
        return (
            <Row>
                <Col md={5}>
                    <Input type='text' value={this.state.text} placeholder="Enter text" onChange={this.onChange} onKeyUp={this.onKeyUp}/>
                </Col>
                <Col md={2}>
                    <Button bsStyle="primary" onClick={this.submitText}>Set text</Button>
                </Col>
            </Row>
        );
    }

});

module.exports = TextInput;
