import type { CSSProperties } from 'react';

const extractDeclarations = (css: string): string => {
  const match = css.match(/{([\s\S]*)}/);
  return match ? match[1].trim() : '';
};

export const cssBlockToStyle = (css: string): CSSProperties => {
  const style = document.createElement('div').style;

  const declarations = extractDeclarations(css);

  declarations.split(';').forEach((rule) => {
    const [prop, value] = rule.split(':');
    if (!prop || !value) {
      return;
    }

    style.setProperty(prop.trim(), value.trim());
  });

  const result: Record<string, string | null> = {};

  for (let i = 0; i < style.length; i++) {
    const key = style[i];
    const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    result[camelKey] = style.getPropertyValue(key);
  }

  return result;
};

type RNStyle = Record<string, string | number>;

const mapProperty = (prop: string): string | null => {
  const map: Record<string, string> = {
    color: 'color',
    'background-color': 'backgroundColor',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'text-align': 'textAlign',
    'line-height': 'lineHeight',
    margin: 'margin',
    'margin-top': 'marginTop',
    'margin-bottom': 'marginBottom',
    'margin-left': 'marginLeft',
    'margin-right': 'marginRight',
    padding: 'padding',
    'padding-top': 'paddingTop',
    'padding-bottom': 'paddingBottom',
    'padding-left': 'paddingLeft',
    'padding-right': 'paddingRight',
  };

  return map[prop] || null;
};

const mapValue = (prop: string, value: string) => {
  if (value.endsWith('px')) {
    return Number(value.replace('px', ''));
  }

  if (/^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }

  if (prop === 'fontWeight') {
    return value;
  }

  return value;
};

export const cssToReactNative = (css: string | undefined): RNStyle => {
  if (!css) {
    return {};
  }

  const result: RNStyle = {};

  const cleaned = css.replace(/\/\*[\s\S]*?\*\//g, '');

  cleaned.split(';').forEach((rule) => {
    if (!rule.trim()) return;

    const [rawProp, rawValue] = rule.split(':');
    if (!rawProp || !rawValue) return;

    const cssProp = rawProp.trim();
    const cssValue = rawValue.trim();

    const rnProp = mapProperty(cssProp);
    if (!rnProp) return;

    const rnValue = mapValue(rnProp, cssValue);

    result[rnProp] = rnValue;
  });

  return result;
};
