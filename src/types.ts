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
    children: string;
  };
}

export interface ViewComponent extends ComponentBase {
  type: 'View';
  props?: {
    scrollable: boolean;
    children: Component[];
  };
}

export interface PressableComponent extends ComponentBase {
  type: 'Pressable';
  props?: {
    delayLongPress: number;
    disabled: boolean;
    pressRetentionOffset: number;
    children: Component[];
  };
}

export interface ImageComponent extends ComponentBase {
  type: 'Image';
  props?: {
    alt: string;
    resizeMode: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
    source: { uri: string };
    children: never;
  };
}

export interface GradientComponent extends ComponentBase {
  type: 'Gradient';
  props?: {
    colors: string[];
    locations: number[];
    children: never;
  };
}

export type Component =
  | TextComponent
  | ViewComponent
  | PressableComponent
  | ImageComponent
  | GradientComponent;

export interface Screen {
  name: string;
  components: Component[];
}
