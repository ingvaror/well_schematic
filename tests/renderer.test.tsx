import * as React from "react";
import { act } from "react-dom/test-utils";
import * as ReactDOM from 'react-dom';
import { App } from "../src/app"
import { ResolverFactory } from "../src/resolver/resolverFactory";
import { GlobalObserver } from "../src/resolver/globalObserver";

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('Initial message', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    act(() => {
        ReactDOM.render(<App />, container);
    });
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    expect(container).toMatchSnapshot()
})

it('Empty case', () => {
    ResolverFactory.initResolver(ResolverFactory.TEST_RESOLVER)
    act(() => {
        ReactDOM.render(<App />, container);
    });
    act(() => { GlobalObserver.getInstance().observableResolverInit.notify(true) })
    act(() => { ResolverFactory.getResolver().observableLateral.notify({ laterals: [], units: null, viewOptions: null, currentschedule: null, currentTitleLateral: null, availableColorized: null, rangessimulationresults: null }) })
    expect(container).toMatchSnapshot()
})
