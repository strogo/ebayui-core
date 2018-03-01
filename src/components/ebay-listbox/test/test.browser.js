const sinon = require('sinon');
const expect = require('chai').expect;
const testUtils = require('../../../common/test-utils/browser');
const mock = require('../mock');
const renderer = require('../');

describe('given the listbox is in the default state', () => {
    let widget;
    let root;
    let button;
    let ariaControl;
    let secondOption;

    beforeEach(() => {
        const renderedWidget = renderer.renderSync({ options: mock.options });
        widget = renderedWidget.appendTo(document.body).getWidget();
        root = document.querySelector('.listbox');
        button = root.querySelector('.listbox__control');
        ariaControl = button.querySelector('input');
        secondOption = root.querySelector('.listbox__options .listbox__option:nth-child(2)');
    });

    afterEach(() => widget.destroy());

    describe('when the down arrow key is pressed', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-change', spy);
            testUtils.triggerEvent(ariaControl, 'keydown', 40);
        });

        test('then it should not expand the listbox', () => {
            expect(ariaControl.getAttribute('aria-expanded')).to.equal('false');
        });

        test('then it emits the listbox-change event with the correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.index).to.equal(1);
            expect(eventData.selected).to.deep.equal(['2']);
        });
    });

    describe('when the up arrow key is pressed', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-change', spy);
            testUtils.triggerEvent(ariaControl, 'keydown', 38);
        });

        test('then it should not expand the listbox', () => {
            expect(ariaControl.getAttribute('aria-expanded')).to.equal('false');
        });

        test('then it emits the listbox-change event with the correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.index).to.equal(0);
            expect(eventData.selected).to.deep.equal(['1']);
        });
    });

    describe('when the option is set programmatically', () => {
        let spy;

        beforeEach((done) => {
            spy = sinon.spy();
            widget.on('listbox-change', spy);
            secondOption.selected = true;
            setTimeout(done);
        });

        test('then it emits the listbox-change event with the correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.index).to.equal(1);
            expect(eventData.selected).to.deep.equal(['2']);
        });
    });

    describe('when the button is clicked once', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-expand', spy);
            testUtils.triggerEvent(button, 'click');
        });

        test('then it emits the event from expander-expand', () => {
            expect(spy.calledOnce).to.equal(true);
        });
    });

    describe('when the button is clicked twice', () => {
        let spy;
        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-collapse', spy);
            testUtils.triggerEvent(button, 'click');
            testUtils.triggerEvent(button, 'click');
        });

        test('then it emits the event from expander-collapse', () => {
            expect(spy.calledOnce).to.equal(true);
        });
    });
});

describe('given the listbox is in an expanded state', () => {
    let widget;
    let root;
    let button;
    let ariaControl;
    let secondOption;

    beforeEach(() => {
        const renderedWidget = renderer.renderSync({ options: mock.options });
        widget = renderedWidget.appendTo(document.body).getWidget();
        root = document.querySelector('.listbox');
        button = root.querySelector('.listbox__control');
        ariaControl = button.querySelector('input');
        secondOption = root.querySelector('.listbox__options .listbox__option:nth-child(2)');
        testUtils.triggerEvent(button, 'click');
    });

    afterEach(() => widget.destroy());

    describe('when an option is clicked', () => {
        let selectSpy;

        beforeEach(() => {
            selectSpy = sinon.spy();
            widget.on('listbox-change', selectSpy);
            testUtils.triggerEvent(secondOption, 'click');
        });

        test('then it emits the listbox-select event with correct data', () => {
            expect(selectSpy.calledOnce).to.equal(true);
            const eventData = selectSpy.getCall(0).args[0];
            expect(eventData.index).to.equal(1);
            expect(eventData.selected).to.deep.equal(['2']);
        });
    });

    describe('when the down arrow key is pressed', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-change', spy);
            testUtils.triggerEvent(ariaControl, 'keydown', 40);
        });

        test('then it emits the listbox-change event with the correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.index).to.equal(1);
            expect(eventData.selected).to.deep.equal(['2']);
        });
    });

    describe('when the up arrow key is pressed', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-change', spy);
            testUtils.triggerEvent(ariaControl, 'keydown', 38);
        });

        test('then it emits the listbox-change event with the correct data', () => {
            expect(spy.calledOnce).to.equal(true);
            const eventData = spy.getCall(0).args[0];
            expect(eventData.index).to.equal(0);
            expect(eventData.selected).to.deep.equal(['1']);
        });
    });

    describe('when the escape key is pressed', () => {
        let spy;

        beforeEach(() => {
            spy = sinon.spy();
            widget.on('listbox-collapse', spy);
            testUtils.triggerEvent(root, 'click');
            testUtils.triggerEvent(ariaControl, 'keydown', 27);
        });

        test('then it collapses', () => {
            expect(ariaControl.getAttribute('aria-expanded')).to.equal('false');
        });

        test('then it emits the collapse event', () => {
            expect(spy.calledOnce).to.equal(true);
        });
    });
});
