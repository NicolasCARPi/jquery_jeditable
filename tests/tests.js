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

QUnit.test('Enable/disable/destroy', function(assert) {
    elem.editable().editable('disable');
    assert.strictEqual(elem.data('disabled.editable'), true);

    elem.editable('enable');
    assert.ok(elem.data('event.editable'));

    elem.editable().editable('destroy');
    assert.notOk(elem.data('event.editable'));
});

QUnit.module('select-boxes');
QUnit.test('Default: NOT Sorting select options', function(assert) {
    elem.append( '<span id="select-tester">Letter F</span>' );

    $.fn.editable.defaults.sortselectoptions = false;

    $('#select-tester').editable('http://bla', {
        type: 'select',
        data: {'E': 'Letter E', 'F': 'Letter F', 'D': 'Letter Disk'},
        selected: 'F'
    });

    assert.equal( $('#select-tester').attr('title'), 'Click to edit', 'Editable enabled: it sets the title' );
    $('#select-tester').click();
    assert.equal($('#select-tester form').length, 1, 'Clicking Editable adds inline form');

    var optionsList = [];
    $('#select-tester option').each(function(name, val) { optionsList.push(val.text); });

    assert.deepEqual(optionsList, ['Letter E', 'Letter F', 'Letter Disk'], 'Does not sort the given options-list');
});
QUnit.test('Default: Sorting select options', function(assert) {
    elem.append( '<span id="select-sorted-tester">Letter F</span>' );

    $.fn.editable.defaults.sortselectoptions = true;

    $('#select-sorted-tester').editable('http://bla', {
        type: 'select',
        data: {'E': 'Letter E', 'F': 'Letter F', 'D': 'Letter Disk'},
        selected: 'F'
    });
    assert.equal( $('#select-sorted-tester').attr('title'), 'Click to edit', 'Editable enabled: it sets the title' );
    $('#select-sorted-tester').click();
    assert.equal($('#select-sorted-tester form').length, 1, 'Clicking Editable adds inline form');

    var optionsList = [];
    $('#select-sorted-tester option').each(function(name, val) { optionsList.push(val.text); });

    assert.deepEqual(optionsList, ['Letter Disk', 'Letter E', 'Letter F'], 'It does sort the given options list');
});
QUnit.module('select-boxes input data');
QUnit.test('List of tuples', function(assert) {
    elem.append('<span id="select-tester"></span>');
    var e = $('#select-tester', elem);

    var test_data = [['E', 'Letter E'], ['F', 'Letter F'], ['D', 'Letter Disk']];
    e.editable('http://bla', {
        type: 'select',
        data: test_data
    });

    e.click();

    var optionsList = [];
    e.find('option').each(function(name, val) { optionsList.push([val.value, val.text]); });
    assert.deepEqual(optionsList, test_data, 'Options keep sorted as defined in input');
});
QUnit.test('List of strings', function(assert) {
    elem.append('<span id="select-tester"></span>');
    var e = $('#select-tester', elem);

    var test_data = ['E', 'F', 'D'];
    var sort = Math.random() > 0.5;
    e.editable('http://bla', {
        type: 'select',
        data: test_data,
        sortselectoptions: sort
    });

    e.click();

    var optionsList = [];
    var expected_result = [['0', 'E'],['1', 'F'], ['2', 'D']];
    if (sort) {
        expected_result.sort(function(a, b) {return a[1] > b[1];});
    }
    e.find('option').each(function(name, val) { optionsList.push([val.value, val.text]); });
    assert.deepEqual(optionsList, expected_result, 'Options get auto assigned integer values in order of input and options are sorted by label based on sortselectoptions option');
});
QUnit.test('Object', function(assert) {
    elem.append('<span id="select-tester"></span>');
    var e = $('#select-tester', elem);

    var test_data = {'E': 'Letter E', 'F': 'Letter F', 'D': 'Letter Disk'};
    var sort = Math.random() > 0.5;
    e.editable('http://bla', {
        type: 'select',
        data: test_data,
        sortselectoptions: sort
    });

    e.click();

    var optionsList = [];
    var expected_result = [['E', 'Letter E'], ['F', 'Letter F'], ['D', 'Letter Disk']];
    if (sort) {
        expected_result.sort(function(a, b) {return a[1] > b[1];});
    }
    e.find('option').each(function(name, val) { optionsList.push([val.value, val.text]); });
    assert.deepEqual(optionsList, expected_result, 'Options are sorted either in order of object definition or by label depending on sortselectoptions option');
});
QUnit.module('select-boxes setting selected');
QUnit.test('Explicitly setting a selected option', function(assert) {
    elem.append( '<span id="selected-tester">Letter F</span>' );

    $.fn.editable.defaults.sortselectoptions = false;

    $('#selected-tester').editable('http://bla', {
        type: 'select',
        data: {'E': 'Letter E', 'F': 'Letter F', 'D': 'Letter Disk', 'selected': 'F'},
    });

    assert.equal( $( '#selected-tester').attr('title'), 'Click to edit', 'Editable enabled: it sets the title' );
    $('#selected-tester').click();
    assert.equal($('#selected-tester form select :selected').text(), 'Letter F', 'Sets the correct value as selected');
});
QUnit.test('Not setting a selected option', function(assert) {
    elem.append( '<span id="selected-tester">Letter F</span>' );

    $.fn.editable.defaults.sortselectoptions = false;

    $('#selected-tester').editable('http://bla', {
        type: 'select',
        data: {'E': 'Letter E', 'F': 'Letter F', 'D': 'Letter Disk'},
    });

    assert.equal( $( '#selected-tester').attr('title'), 'Click to edit', 'Editable enabled: it sets the title' );
    $('#selected-tester').click();
    assert.equal($('#selected-tester form select :selected').text(), 'Letter E', 'Selects the first option as selected?');
});

