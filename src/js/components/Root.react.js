var React = require("react");
var Reflux = require('reflux');

// React-Bootstrap components
var ReactBootstrap = require('react-bootstrap');
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var TextInput = require('./TextInput.react');

var SampleStore = require('../stores/SampleStore');

var Root = React.createClass({

    mixins: [
        Reflux.listenTo(SampleStore, 'onSampleStoreEvent'),
    ],

    onSampleStoreEvent: function(event, payload) {
        switch (event) {
            case SampleStore.EVENT_REFRESH:
                this.forceUpdate();
                break;
            default:
        }
    },

    render: function() {
        return (
            <Grid>
                <Row style={{marginTop: "25px"}}>
                    <TextInput initialText={SampleStore.text} onSubmit={SampleStore.actions.actionUpdateText}/>
                </Row>
                <Row>
                    <Col md={12}>
                        Current text is: {SampleStore.text}
                    </Col>
                </Row>
            </Grid>
        );
    }

});

module.exports = Root;
