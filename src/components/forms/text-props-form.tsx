import { useFormContext } from 'react-hook-form';

export const TextPropsForm = () => {
  const { register } = useFormContext();

  return (
    <span>
      <label>Texto</label>
      <input type="text" {...register} />
    </span>
  );
};
