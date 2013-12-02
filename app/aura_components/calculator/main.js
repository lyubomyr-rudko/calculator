define([
    './calc',
    'module',
    'underscore',
    'jquery'
], function(calculator, module, _, $) {
    var calc = calculator.getInstance(),
        actionsMap = {
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
            this.handleKeypress();
        },

        render: function(examsList) {
            this.html(this.renderTemplate('tpl'));
        },

        handleKeypress: function () {
            var that = this;

            $(document).keypress(function (e) {
                var value,
                    display = that.$el.find('span.display');

                if (e.charCode) {
                    value = String.fromCharCode(e.charCode);
                    if (actionsMap[value]) {
                        calc.addAction(actionsMap[value]);

                        that.animateBtnClick(value);
                    } else if (/^\d+$/.test(value)) {
                        calc.addValue(value);
                        that.animateBtnClick(value);

                    }
                }

                display.html(calc.getOutput());
            });

            // $(document).keydown(cb);
        },
        animateBtnClick: function (value) {
            this.$el.find('a[data-calculator-button="' + value + '"]').addClass("active").delay(100).queue(function(next){
                $(this).removeClass("active");
                next();
            });
        }
    };
});