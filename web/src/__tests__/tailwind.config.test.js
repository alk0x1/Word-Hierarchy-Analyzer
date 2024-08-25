import { describe, it, expect } from 'vitest';
import tailwindConfig from '../../tailwind.config.js';

describe('Tailwind CSS configuration', () => {
  it('should match the snapshot', () => {
    expect(tailwindConfig).toMatchSnapshot();
  });
});
