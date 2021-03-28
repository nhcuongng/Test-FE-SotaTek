export type TPiority = 'low' | 'hight' | 'normal';

export type TTodo = {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: Date;
  piority: TPiority
};
