import Cache from './cache';

describe('staggered-map / cache', () => {
  const cache = new Cache(4);

  it('set', () => {
    // https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_.28LRU.29
    ['A', 'B', 'C', 'D', 'E', 'D', 'F'].forEach(key => {
      const value = key.toLowerCase();
      cache.set(key, value);
      expect(cache.peek(key)).toBe(value);
    });

    expect(cache.size).toBe(cache.limit);
    expect(cache.toString()).toBe('C < E < D < F');
  });

  it('get', () => {
    expect(cache.get('A')).toBe(null);
    expect(cache.get('F')).toBe('f');
    expect(cache.toString()).toBe('C < E < D < F');

    expect(cache.get('C')).toBe('c');
    expect(cache.toString()).toBe('E < D < F < C');
    expect(cache.get('C')).toBe('c');
    expect(cache.toString()).toBe('E < D < F < C');
    expect(cache.get('D')).toBe('d');
    expect(cache.toString()).toBe('E < F < C < D');
    expect(cache.get('F')).toBe('f');
    expect(cache.toString()).toBe('E < C < D < F');
  });

  it('touch', () => {
    expect(cache.touch('A')).toBe(false);
    expect(cache.touch('F')).toBe(true);
    expect(cache.toString()).toBe('E < C < D < F');

    expect(cache.touch('C')).toBe(true);
    expect(cache.toString()).toBe('E < D < F < C');
    expect(cache.touch('D')).toBe(true);
    expect(cache.toString()).toBe('E < F < C < D');
    expect(cache.touch('E')).toBe(true);
    expect(cache.toString()).toBe('F < C < D < E');
  });

  it('remove', () => {
    expect(cache.remove('A')).toBeNull();
    expect(cache.remove('F')).toBe('f');
    expect(cache.toString()).toBe('C < D < E');
    expect(cache.remove('D')).toBe('d');
    expect(cache.toString()).toBe('C < E');
    expect(cache.remove('C')).toBe('c');
    expect(cache.toString()).toBe('E');
    expect(cache.remove('E')).toBe('e');
    expect(cache.toString()).toBe('');
    expect(cache.size).toBe(0);
  });
});
