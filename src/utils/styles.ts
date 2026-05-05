import type { CSSProperties } from 'react';
import type { ImageComponent } from '../types';

const extractDeclarations = (css: string): string => {
  const match = css.match(/{([\s\S]*)}/);

  return match ? match[1].trim() : '';
};

export const cssBlockToStyle = (css: string): CSSProperties => {
  const style = document.createElement('div').style;

  const declarations = extractDeclarations(css);

  declarations.split(/;\*\/|;/).forEach((rule) => {
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

export const styleToCssBlock = (
  style: React.CSSProperties,
  selector?: string,
): string => {
  const toKebabCase = (str: string) =>
    str.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);

  const declarations = Object.entries(style)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== null && value !== undefined)
    .map(([key, value]) => {
      const kebabKey = toKebabCase(key);
      return `${kebabKey}: ${value}`;
    })
    .join(';\n');

  if (selector) {
    return `${selector} {\n${declarations};\n}`;
  }

  return `${declarations};`;
};

type RNStyle = Record<string, string | number>;

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

export const styleToReactNative = (
  style: CSSProperties | undefined,
): RNStyle => {
  if (!style) {
    return {};
  }

  const result: RNStyle = {};

  Object.entries(style).forEach((rule) => {
    const [prop, rawValue] = rule;
    if (!prop || !rawValue) return;

    const cssValue = rawValue.trim();

    const rnValue = mapValue(prop, cssValue);

    result[prop] = rnValue;
  });

  return result;
};

export const resizeModeToObjectFit = (
  resizeMode: NonNullable<ImageComponent['props']>['resizeMode'],
) => {
  return {
    cover: { objectFit: 'cover' as CSSProperties['objectFit'] },
    contain: { objectFit: 'contain' as CSSProperties['objectFit'] },
    stretch: { objectFit: 'fill' as CSSProperties['objectFit'] },
    center: {
      objectFit: 'none' as CSSProperties['objectFit'],
      objectPosition: 'center' as CSSProperties['objectPosition'],
    },
    repeat: { backgroundRepeat: 'repeat' as CSSProperties['backgroundRepeat'] },
  }[resizeMode];
};
