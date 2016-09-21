var Reflux = require('reflux');

var Actions = Reflux.createActions([
    'actionUpdateText',
]);

var SampleStore = Reflux.createStore({

    listenables: [Actions],
    actions: Actions,

    // Events
    EVENT_REFRESH: "EVENT_REFRESH",

    // State
    text: "",

    // Actions

    actionUpdateText: function(text) {
        this.text = text;
        this.trigger(this.EVENT_REFRESH, null);
    },

});

module.exports = SampleStore;
