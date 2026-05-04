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
  type: 'Text';
  props?: {
    numberOfLines: number;
    style: string;
  };
  children: string;
}

export interface ViewComponent extends ComponentBase {
  type: 'View';
  props?: {
    scrollable: boolean;
    horizontal: boolean;
    style: string;
  };
  children: Component[];
}

export interface PressableComponent extends ComponentBase {
  type: 'Pressable';
  props?: {
    delayLongPress: number;
    disabled: boolean;
    pressRetentionOffset: number;
    style: string;
  };
  children: Component[];
}

export interface ImageComponent extends ComponentBase {
  type: 'Image';
  props?: {
    alt: string;
    resizeMode: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    source: { uri: string };
    style: string;
  };
  children: never;
}

export interface GradientComponent extends ComponentBase {
  type: 'Gradient';
  props?: {
    colors: string[];
    locations: number[];
    style: string;
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
  components: Component[];
}

export const hasComponentChildren = (
  component: Component,
): component is ViewComponent | PressableComponent =>
  component.type === 'View' || component.type === 'Pressable';
