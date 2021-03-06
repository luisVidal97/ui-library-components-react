import React from 'react';
import { shallow } from'enzyme';

import 'jest-styled-components';
import renderer from 'react-test-renderer';

import { heightsInputText, colors, borderRadius } from '../components/globalVariables';
import InputNumber from '../components/inputNumber/InputNumber';
import {StyledInputNumber} from '../components/inputNumber/StyledInputNumber';

describe('Tests over <InputNumber/>: features and behavior', () => {

  let wrapper, tree;

  test('should show <Button/> successfully', () => {
    wrapper = shallow(<InputNumber />);
    expect( wrapper ).toMatchSnapshot();
  });

  test(`should show default style values of text input invoking <InputNumber /> component (without props).
  Default values = height: 32px; font-size: 1rem; border-radius: 10px; background-color: tranparent; pointer-events: auto;
  input[focus]border-color: #115293;  input[focus]box-shadow: 0 0 5px #115293;
  `, () => {
    tree = renderer.create(<InputNumber />).toJSON();
    const child = tree.children[0];
    expect(child).toHaveStyleRule('height', heightsInputText.medium.shape);
    expect(child).toHaveStyleRule('font-size', heightsInputText.medium.font);
    expect(child).toHaveStyleRule('border-radius', borderRadius.normal);
    expect(child).toHaveStyleRule('background-color', 'transparent');
    expect(child).toHaveStyleRule('pointer-events', 'auto');
    expect(child).toHaveStyleRule('border-color', colors.primary.normal, { modifier: ':focus', });
    expect(child).toHaveStyleRule('box-shadow', `0 0 5px ${colors.primary.normal}`, { modifier: ':focus', });
  });

  test('should show default style values of text input invoking <InputNumber /> (with props but wrong values)', () => {
    tree = renderer.create(<InputNumber disabled='treu' size='sm' color='green' border='24' moove='large'/>).toJSON();
    const child = tree.children[0];
    expect(child).toHaveStyleRule('height', heightsInputText.medium.shape);
    expect(child).toHaveStyleRule('font-size', heightsInputText.medium.font);
    expect(child).toHaveStyleRule('border-radius', borderRadius.normal);
    expect(child).toHaveStyleRule('background-color', 'transparent');
    expect(child).toHaveStyleRule('pointer-events', 'auto');
    expect(child).toHaveStyleRule('border-color', colors.primary.normal, { modifier: ':focus', });
    expect(child).toHaveStyleRule('box-shadow', `0 0 5px ${colors.primary.normal}`, { modifier: ':focus', });
  });


  test('should show secondary, large and with strong border input text', () => {
    tree = renderer.create(<InputNumber prefix="$" color='secondary' size='large' border='strong'/>).toJSON();
    const child = tree.children[0];
    expect(child).toHaveStyleRule('pointer-events', 'auto');
    expect(child).toHaveStyleRule('border-color', colors.secondary.normal, { modifier: ':focus', });
    expect(child).toHaveStyleRule('box-shadow', `0 0 5px ${colors.secondary.normal}`, { modifier: ':focus', });
    expect(child).toHaveStyleRule('height', heightsInputText.large.shape);
    expect(child).toHaveStyleRule('font-size', heightsInputText.large.font);
    expect(child).toHaveStyleRule('border-radius', borderRadius.strong);
    expect(child).toHaveStyleRule('pointer-events', 'auto');
  });


  test('should show disabled input text', () => {
    tree = renderer.create(<InputNumber disabled="true" size='small' border="none"/>).toJSON();
    const child = tree.children[0];
    expect(child).toHaveStyleRule('pointer-events', 'none');
    expect(child).toHaveStyleRule('background-color', '#E0E0E0');
    expect(child).toHaveStyleRule('border-radius', borderRadius.none);
    expect(child).toHaveStyleRule('border-color', 'transparent', { modifier: ':hover', });
    expect(child).toHaveStyleRule('border-color', 'transparent', { modifier: ':focus', });
    expect(child).toHaveStyleRule('box-shadow', `0 0 5px transparent`, { modifier: ':focus', });
  });

  test('should not execute function if input text is disabled', () => {
    const doSomething = jest.fn();
    wrapper = shallow( <InputNumber disabled="true" placeholder="Hello world!" value="Hello" onChange={doSomething}/> );
    wrapper.find(StyledInputNumber).simulate('click');
    expect(doSomething).not.toHaveBeenCalled();
  });


  test('should change the value of the const if input text change', () => {
    const doSomething = jest.fn();
    const ph = 'number';
    wrapper = shallow( <InputNumber placeholder={ph} onChange={doSomething}/> );
    wrapper.find(StyledInputNumber).simulate('change', { target: { value:'123' }});
    expect(doSomething).toHaveBeenCalled();
    expect( wrapper.find(StyledInputNumber).props().placeholder).toBe(ph);
  });

});
