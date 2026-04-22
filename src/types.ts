export type Action<T extends string, P> = {
  type: T;
  payload: P;
};

export type Reducer<S, A> = (state: S, action: A) => S;

export interface Component {
  id: string;
  type: 'View' | 'Text' | 'Pressable' | 'Image' | 'Gradient';
}

export interface Screen {
  name: string;
  components: Component[];
}
