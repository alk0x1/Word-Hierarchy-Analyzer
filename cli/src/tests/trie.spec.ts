import { Trie } from '../trie';
import { TreeNode } from '../@types/tree';
import world from '../dicts/world.json';

describe('Trie', () => {
  let trie: Trie;
  let worldData = world as TreeNode;

  beforeEach(() => {
    trie = new Trie();
    trie.populateFromJson(worldData);
  });

  test('should analyze correctly at different depths', () => {
    expect(trie.analyzeAtDepth(1, ['seres vivos', 'objetos'])).toBe('Mundo = 2');
    expect(trie.analyzeAtDepth(2, ['animais', 'plantas', 'eletronicos'])).toBe('Seres Vivos = 2; Objetos = 1');
    expect(trie.analyzeAtDepth(3, ['vertebrados', 'invertebrados', 'arvores', 'flores'])).toBe('Animais = 2; Plantas = 2');
    expect(trie.analyzeAtDepth(4, ['mamiferos', 'aves', 'rosa', 'tulipa'])).toBe('Vertebrados = 2; Flores = 2');
    expect(trie.analyzeAtDepth(5, ['terrestres', 'aquaticos', 'aguia', 'pinguim'])).toBe('Mamíferos = 2; Aves = 2');
  });

  test('should handle accents and case insensitivity', () => {
    expect(trie.analyzeAtDepth(3, ['VERTEBRADOS', 'arvores', 'FLORES'])).toBe('Animais = 1; Plantas = 2');
  });

  test('should return empty string for non-existent depth', () => {
    expect(trie.analyzeAtDepth(10, ['leao'])).toBe('');
  });

  test('should handle partial matches', () => {
    expect(trie.analyzeAtDepth(5, ['terrestres', 'aquaticos', 'inexistente'])).toBe('Mamíferos = 2');
  });

  test('should handle empty input', () => {
    expect(trie.analyzeAtDepth(1, [])).toBe('');
  });

  test('performance test with large input', () => {
    const largeInput = 'leao elefante girafa baleia golfinho rosa tulipa computador smartphone mesa cadeira '.repeat(2000).trim().split(" ");
    const start = process.hrtime();
    const result = trie.analyzeAtDepth(6, largeInput);
    const end = process.hrtime(start);
    
    const elapsedTimeInMs = (end[0] * 1000) + (end[1] / 1e6);
    
    expect(result).toBe('Terrestres = 6000; Aquáticos = 4000');
    expect(elapsedTimeInMs).toBeLessThan(1000);
  });
});