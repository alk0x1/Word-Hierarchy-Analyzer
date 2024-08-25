import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AddChildInput } from '../../components/AddChildInput';

describe('AddChildInput Component', () => {
  let newChildName: string;
  let setNewChildName: ReturnType<typeof vi.fn>;
  let handleAddChild: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    newChildName = '';
    setNewChildName = vi.fn((name) => {
      newChildName = name;
    });
    handleAddChild = vi.fn();
  });

  it('renders input and button elements', () => {
    render(<AddChildInput newChildName={newChildName} setNewChildName={setNewChildName} handleAddChild={handleAddChild} />);
    expect(screen.getByPlaceholderText('Nome do novo nó')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Adicionar/i })).toBeInTheDocument();
  });

  it('calls setNewChildName when input value changes', () => {
    render(<AddChildInput newChildName={newChildName} setNewChildName={setNewChildName} handleAddChild={handleAddChild} />);
    const input = screen.getByPlaceholderText('Nome do novo nó');
    fireEvent.change(input, { target: { value: 'Novo Nome' } });
    expect(setNewChildName).toHaveBeenCalledWith('Novo Nome');
  });

  it('calls handleAddChild when button is clicked', () => {
    render(<AddChildInput newChildName={newChildName} setNewChildName={setNewChildName} handleAddChild={handleAddChild} />);
    const button = screen.getByRole('button', { name: /Adicionar/i });
    fireEvent.click(button);
    expect(handleAddChild).toHaveBeenCalled();
  });

  it('button is enabled when input is filled', () => {
    newChildName = 'Child Name';
    render(<AddChildInput newChildName={newChildName} setNewChildName={setNewChildName} handleAddChild={handleAddChild} />);
    const button = screen.getByRole('button', { name: /Adicionar/i });
    expect(button).not.toBeDisabled();
  });

  it('button is enabled even when input is empty', () => {
    newChildName = '';
    render(<AddChildInput newChildName={newChildName} setNewChildName={setNewChildName} handleAddChild={handleAddChild} />);
    const button = screen.getByRole('button', { name: /Adicionar/i });
    expect(button).toBeEnabled();
  });
});
