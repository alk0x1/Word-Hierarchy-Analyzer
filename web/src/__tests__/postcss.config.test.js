import { describe, it, expect } from 'vitest';
import postcssConfig from '../../postcss.config.js';

describe('PostCSS configuration', () => {
  it('should match the snapshot', () => {
    expect(postcssConfig).toMatchSnapshot();
  });
});
