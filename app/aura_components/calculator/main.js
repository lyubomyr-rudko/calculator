define([
    'module',
    'underscore',
    'jquery'
], function(module, _, $) {
    return {
        templates: 'tpl',
        View: {
            events: {
                'click a[data-calculator-digit-button]': function (e) {
                    var button = $(e.currentTarget),
                        value = button.attr('data-calculator-digit-button');


                }
            }
        },

        initialize: function() {
            this.render();
            this.sandbox.utils.loadCssForModule(module);
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl'));
        }
    };
});