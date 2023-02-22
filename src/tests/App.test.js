import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../components/App';

describe('List', () => {
  test('Rendering of List component', () => {
    render(<App />);
    screen.debug();
    expect(screen.getByText('TodoList')).toBeInTheDocument();
  });

  test('Add List item click', () => {
    render(<App />);
    const input = screen.getByLabelText('new task');
    fireEvent.change(input, { target: { value: 'test item text1' } });
    fireEvent.click(screen.getByText('ADD'));
    screen.debug();
    expect(screen.getByText('test item text1')).toBeInTheDocument();
  });

  test('Add List item key', () => {
    render(<App />);
    const input = screen.getByLabelText('new task');
    fireEvent.change(input, { target: { value: 'test item text2' } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });
    screen.debug();
    expect(screen.getByText('test item text2')).toBeInTheDocument();
  });

  test('Delete button', () => {
    render(<App />);
    window.confirm = jest.fn(() => true);
    const deleteButton = screen.getAllByLabelText('delete');
    deleteButton.forEach((elm) => {
      fireEvent.click(elm);
    });
    screen.debug();
    expect(screen.queryByLabelText('delete')).not.toBeInTheDocument();
  });

  test('Check button', () => {
    const { container } = render(<App />);
    const input = screen.getByLabelText('new task');
    fireEvent.change(input, { target: { value: 'test item text3' } });
    fireEvent.keyDown(input, { keyCode: 13 });
    const checkButton = screen.getByTestId('check').querySelector('input');
    fireEvent.click(checkButton);
    const sTag = container.querySelector('s');
    screen.debug();
    expect(sTag).toBeInTheDocument();
  });
});

describe('Edit', () => {
  test('Rendering of Edit component', () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('CreateIcon'));
    screen.debug();
    expect(screen.getAllByText('edit task')[0]).toBeInTheDocument();
  });

  test('Edit item', () => {
    render(<App />);
    const input = screen.getByLabelText('edit task');
    fireEvent.change(input, { target: { value: 'edit item' } });
    fireEvent.click(screen.getByText('Save'));
    screen.debug();
    expect(screen.getByText('edit item')).toBeInTheDocument();
  });
});
