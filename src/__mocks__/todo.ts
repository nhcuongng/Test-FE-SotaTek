import { TPiority, TTodo } from 'src/@types';

export const TodoDummyData: TTodo[] = [
  {
    id: '1',
    title: 'Eat rice',
    description: 'Must cook',
    isDone: false,
    dueDate: new Date(),
    piority: 'hight',
  },
  {
    id: '2',
    title: 'Drink water',
    description: 'coca or something else',
    isDone: true,
    dueDate: new Date(),
    piority: 'hight',
  },
];

export const initTodo: TTodo = {
  id: '',
  description: '',
  isDone: false,
  title: '',
  dueDate: new Date(),
  piority: 'normal',
};

export const PIORITY_OPTION: { label: string, value: TPiority }[] = [
  { label: 'Normal', value: 'normal' },
  { label: 'Low', value: 'low' },
  { label: 'Hight', value: 'hight' },
];
