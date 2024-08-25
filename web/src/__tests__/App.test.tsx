import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App'; 

vi.mock('./hooks/useTree', () => ({
  useTree: () => ({
    tree: { name: 'Root', children: [] },
    setTree: vi.fn(),
    addChild: vi.fn(),
  }),
}));

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input to set root name initially', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('Insira o nome da raíz')).toBeInTheDocument();
    expect(screen.getByText('Inserir')).toBeInTheDocument();
  });

  it('sets the root and displays TreeView when Inserir button is clicked', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Insira o nome da raíz'), { target: { value: 'New Root' } });
    fireEvent.click(screen.getByText('Inserir'));
    expect(screen.queryByPlaceholderText('Insira o nome da raíz')).not.toBeInTheDocument();
    expect(screen.getByText('New Root')).toBeInTheDocument();
  });


  it('renders TreeView component when root is set', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Insira o nome da raíz'), { target: { value: 'New Root' } });
    fireEvent.click(screen.getByText('Inserir'));
    expect(screen.getByText('New Root')).toBeInTheDocument();
  });
});
