import 'react-datepicker/dist/react-datepicker.css';

import React, { useEffect, useState } from 'react';
import { TTodo } from 'src/@types';

import styles from './form.module.scss';
import { v4 } from 'uuid';
import DatePicker from "react-datepicker";
import Dropdown from 'react-dropdown';
import { initTodo, PIORITY_OPTION } from 'src/__mocks__';

type TProp = {
  onDone: (todos: TTodo) => void;
  todo?: TTodo;
  isEdit?: boolean;
};

export const Form: React.FC<TProp> = ({ onDone, isEdit, todo = initTodo }) => {
  const [newTodo, setNewTodo] = useState(initTodo);
  const { title, description, dueDate, piority } = newTodo;

  useEffect(() => {
    setNewTodo(todo);
  }, [todo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onDone(isEdit ? newTodo : { ...newTodo, id: v4() } );
  };

  const handleChangeDate = (date: Date) => {
    const temp = { ...newTodo };

    const today = new Date();
    if (date.getTime() < today.getTime()) {
      return;
    }
    temp.dueDate = date;
    setNewTodo(temp);
  }

  const handleChangeOption = (e: typeof PIORITY_OPTION[0]) => {
    const temp = { ...newTodo };
    temp.piority = e.value;
    setNewTodo(temp);
  }


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof Pick<TTodo, 'title' | 'description'>,
  ) => {
    const temp = { ...newTodo };
    temp[field] = e.target.value;
    setNewTodo(temp);
  };

  return (
    <div>
      {!isEdit && <h2 className={styles.title}>Add new Todo</h2>}
      <form className={styles.form} onSubmit={handleSubmit}>

        <input
          value={title}
          onChange={(e) => handleChange(e, 'title')}
          placeholder="Add new task"
          required
        />
        <div className={styles.col12}>
          <span className={styles.inputTitle}>Description</span>
          <textarea
            value={description}
            onChange={(e) => handleChange(e, 'description')}
            placeholder="description"
            rows={8}
          />
        </div>
        <div className={styles.col6}>
          <span className={styles.inputTitle}>Due Date</span>
          <DatePicker selected={dueDate} onChange={handleChangeDate} />
        </div>
        <div className={styles.col6}>
          <span className={styles.inputTitle}>Piority</span>
          <Dropdown options={PIORITY_OPTION} value={piority}  onChange={handleChangeOption} />
        </div>
        <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};
