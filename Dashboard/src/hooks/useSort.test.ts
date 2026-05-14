import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSort } from './useSort';

const data = [
  { id: '1', name: 'Banana', value: 30 },
  { id: '2', name: 'Apple', value: 10 },
  { id: '3', name: 'Cherry', value: 20 },
] as const;

type Item = { id: string; name: string; value: number };

describe('useSort', () => {
  it('sorts by default key descending', () => {
    const { result } = renderHook(() => useSort<Item>([...data], 'value'));
    expect(result.current.sortedData[0]?.value).toBe(30);
  });

  it('toggles direction on same key', () => {
    const { result } = renderHook(() => useSort<Item>([...data], 'value'));
    act(() => result.current.toggleSort('value'));
    expect(result.current.sortDir).toBe('asc');
    expect(result.current.sortedData[0]?.value).toBe(10);
  });

  it('resets to asc when switching to new key', () => {
    const { result } = renderHook(() => useSort<Item>([...data], 'value'));
    act(() => result.current.toggleSort('name'));
    expect(result.current.sortKey).toBe('name');
    expect(result.current.sortDir).toBe('asc');
    expect(result.current.sortedData[0]?.name).toBe('Apple');
  });

  it('sorts strings case-insensitively', () => {
    const { result } = renderHook(() => useSort<Item>([...data], 'name'));
    expect(result.current.sortedData.map((d) => d.name)).toEqual([
      'Apple', 'Banana', 'Cherry',
    ]);
  });
});
