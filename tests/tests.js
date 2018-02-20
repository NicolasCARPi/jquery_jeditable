/* jquery-jeditable tests */
var elem = $('#qunit-fixture');

QUnit.test('Registration', function(assert) {
    assert.ok($.fn.editable, 'registered as a jQuery plugin');
});
QUnit.test('Chainability', function(assert) {
    assert.ok(elem.editable().addClass('testing'), 'can be chained');
    assert.ok(elem.hasClass('testing'), 'successfully chained');
});

QUnit.test('ARIA attributes', function(assert) {
    elem.editable().editableAriaShim();
    assert.ok(elem.is('[role="button"]'), 'added role');
});
