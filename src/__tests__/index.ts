const path = require('path');

process.env.ENV_CONFIG_PATH = path.join(__dirname, '../../fixtures/.env');

import { getAll, get, has, getPublic } from '../index';

describe('getAll', () => {
  it('confirm that all keys are returned', () => {
    const all = getAll();
    expect(Object.keys(all)).toHaveLength(19);
    expect(all.EMPTY).toBe(null);
  });
});

describe('getPublic', () => {
  it('confirm that all safe keys are returned', () => {
    const all = getPublic();
    expect(Object.keys(all)).toHaveLength(1);
    expect(all.PUBLIC_APP_NAME_NOT_IMPORTANT).toBe('Bedrock Config');
  });
});

describe('get', () => {
  it('get value', () => {
    expect(get('BASIC')).toBe('basic');
    expect(get('NUMBER')).toBe('1');
  });

  it('get empty', () => {
    expect(get('EMPTY')).toBe(null);
  });

  it('get empty with quotes', () => {
    expect(get('EMPTY_WITH_QUOTES')).toBe(null);
  });

  it('not defined key', () => {
    expect(() => get('BAD_VALUE')).toThrow(
      'Configuration variable "BAD_VALUE" is not exposed as environment variable nor was a default provided in `.env`'
    );
  });

  it('get value as number', () => {
    expect(get('NUMBER', 'integer')).toBe(1);
  });

  it('get value as float', () => {
    expect(get('NUMBER', 'float')).toBe(1);
  });

  it('get value as boolean', () => {
    expect(get('NUMBER', 'boolean')).toBe(true);
  });

  it('get value as date', () => {
    expect(get('DATE', 'date').valueOf()).toBe(1548794502645);
  });

  it('get value as json', () => {
    expect(get('RETAIN_INNER_QUOTES', 'json')).toEqual({
      foo: 'bar',
    });
  });
});

describe('has', () => {
  it('with value', () => {
    expect(has('BASIC')).toBe(true);
  });

  it('without value', () => {
    expect(has('EMPTY')).toBe(false);
  });

  it('not defined key', () => {
    expect(has('BAD_VALUE')).toBe(false);
  });
});
