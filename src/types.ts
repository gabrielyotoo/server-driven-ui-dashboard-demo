import type { CSSProperties } from 'react';

export type Action<T extends string, P> = {
  type: T;
  payload: P;
};

export type Reducer<S, A> = (state: S, action: A) => S;

interface ComponentBase {
  id: string;
  order: number;
}

export interface TextComponent extends ComponentBase {
  sectionComponentType: 'Text';
  props?: {
    numberOfLines: number;
    style: CSSProperties;
  };
  children: string;
}

export interface ViewComponent extends ComponentBase {
  sectionComponentType: 'View';
  props?: {
    scrollable: boolean;
    horizontal: boolean;
    style: CSSProperties;
  };
  children: Component[];
}

export type Rect = { bottom: number; left: number; right: number; top: number };

export const PressableActionType = {
  NavigateBack: 'NavigateBack',
  NavigateTo: 'NavigateTo',
  PostRequest: 'PostRequest',
} as const;

export type PressableActionType =
  (typeof PressableActionType)[keyof typeof PressableActionType];

interface NavigateBackAction {
  type: typeof PressableActionType.NavigateBack;
}

interface NavigateToAction {
  type: typeof PressableActionType.NavigateTo;
  to: string;
}

interface PostRequestAction<T> {
  type: typeof PressableActionType.PostRequest;
  api: 'pagol';
  endpoint: 'register';
  body: T;
}

export type PressableAction<T = unknown> =
  | NavigateToAction
  | NavigateBackAction
  | PostRequestAction<T>;

export interface PressableComponent extends ComponentBase {
  sectionComponentType: 'Pressable';
  props?: {
    delayLongPress: number;
    disabled: boolean;
    pressRetentionOffset: Rect | number;
    style: CSSProperties;
  };
  children: Component[];
  action: PressableAction;
}

export interface ImageComponent extends ComponentBase {
  sectionComponentType: 'Image';
  props?: {
    alt: string;
    resizeMode: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    source: { uri: string };
    style: CSSProperties;
  };
  children: never;
}

export interface GradientComponent extends ComponentBase {
  sectionComponentType: 'Gradient';
  props?: {
    colors: string[];
    locations: number[];
    style: CSSProperties;
  };
  children: never;
}

export type Component =
  | TextComponent
  | ViewComponent
  | PressableComponent
  | ImageComponent
  | GradientComponent;

export interface ComponentProps<T extends Component> {
  component: T;
  onClick?: VoidFunction;
  ref?: (element: Element | null) => void;
}

export interface Screen {
  id: string;
  name: string;
  wide: Component[];
  compact: Component[];
}

export const hasComponentChildren = (
  component: Component,
): component is ViewComponent | PressableComponent =>
  component.sectionComponentType === 'View' ||
  component.sectionComponentType === 'Pressable';
