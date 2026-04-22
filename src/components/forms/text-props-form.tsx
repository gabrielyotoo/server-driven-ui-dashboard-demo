import { useForm } from 'react-hook-form';

export const TextPropsForm = () => {
  const { register } = useForm();

  return (
    <form>
      <label>Texto</label>
      <input type="text" {...register} />
    </form>
  );
};
