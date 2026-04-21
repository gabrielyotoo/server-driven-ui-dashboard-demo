import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { ComponentProps, type Component } from './component-props';

interface ComponentSelectorProps {
  onAdd: (component: Component) => void;
}

export const ComponentSelector = ({ onAdd }: ComponentSelectorProps) => {
  const form = useForm<Component>();
  const { register, handleSubmit, control } = form;
  const type = useWatch({ control, name: 'type' });

  return (
    <aside className="flex flex-col items-start">
      <h2>Selecione o componente</h2>
      <FormProvider {...form}>
        <form
          className="w-full flex flex-col justify-between flex-1"
          onSubmit={handleSubmit(onAdd)}
        >
          <span>
            <select className="w-full" {...register('type')}>
              <option>View</option>
              <option>Text</option>
              <option>Pressable</option>
              <option>Image</option>
              <option>Gradient</option>
            </select>
            <ComponentProps type={type} />
          </span>
          <button
            className="bg-orange-600 text-white py-5 text-center rounded-2xl"
            type="submit"
          >
            Adicionar
          </button>
        </form>
      </FormProvider>
    </aside>
  );
};
