import 'jest-preset-angular';

const mockResponse = jest.fn();

Object.defineProperty(window, 'location', {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    assign: mockResponse,
  },
  writable: true,
});

Object.defineProperty(window, 'CSS', { value: null });

Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
    };
  },
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});
