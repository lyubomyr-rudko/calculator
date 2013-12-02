define([
    './calc',
    'module',
    'underscore',
    'jquery'
], function(calc, module, _, $) {
    var actionsMap = {
        '+': calc.actions.add,
        '-': calc.actions.substruct,
        '*': calc.actions.multiply,
        '/': calc.actions.divide,
        '=': calc.actions.equal,
        'ce': calc.actions.ce
    };

    return {
        templates: 'tpl',
        View: {
            events: {
                'click a[data-calculator-button]': function (e) {
                    var button = $(e.currentTarget),
                        value = button.attr('data-calculator-button'),
                        display = this.$el.find('span.display');

                    if (actionsMap[value]) {
                        calc.addAction(actionsMap[value]);
                    } else {
                        calc.addValue(value);
                    }

                    display.html(calc.getOutput());
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