import React, { useState } from 'react'
import { TTodo } from 'src/@types';
import { TodoDummyData } from 'src/__mocks__';

import { Form } from './form';
import { ModalCreate } from './ModalCreate';
import { Search } from './Search';
import styles from './todoList.module.scss';

type TProp = {

};

type TNewTodo = TTodo & { isView?: boolean }

export const TodoList: React.FC<TProp> = () => {
  const [list, setList] = useState<TNewTodo[]>(TodoDummyData.map((el) => ({ ...el, isView: false })));
  const [listSearched, setListSearched] = useState<TNewTodo[]>([])
  const [isSearching, setIsSearching] = useState(false);

  const toggle = (index: number, field: keyof Pick<TNewTodo, 'isDone' | 'isView'> ) => {
    const temp = [...list];
    temp[index][field] = !list[index][field];
    setList(temp);
  }

  const handleAddTodo = (todo: TTodo) => {
    setList((_list) => [..._list, todo])
  }

  const handleUpdate = (index: number, todo: TTodo) => {
    const temp = [...list];
    temp[index] = todo;
    temp[index].isView = false;
    setList(temp);
  }

  const handleDelete = (_id: string) => {
    const cond = (_list: TTodo[]) => _list.filter(({ id }) => id !== _id)
    if (isSearching) {
      setListSearched(cond)
    }
    setList(cond)
  }

  const handleDeleteMultiple = () => {
    const cond = (_list: TTodo[]) => _list.filter(({ isDone }) => !isDone);
    if (isSearching) {
      setListSearched(cond)
    }
    setList(cond)
  }

  const hanldeSearch = (results: TNewTodo[], txt: string) => {
    setListSearched(results);
    setIsSearching(!!txt);
  }

  const listDisplay = isSearching ? listSearched : list;
  const isBulkActionShow = listDisplay.some(({ isDone }) => isDone);

  return (
    <>
      <ModalCreate onDone={handleAddTodo} />
      <Search onDone={hanldeSearch} list={list} />
      <ul className={styles.list}>
        {listDisplay.map((todo, index) => {
          const { title, id, isDone, isView } = todo;
          return (
            <li key={id} className={styles.item}>
              <span className={`${styles.content} ${isDone && styles.done}`}>
                <span>
                  <input type="checkbox" checked={isDone} onChange={() => toggle(index, 'isDone')} />
                  <span>{title}</span>
                </span>
                <span className={styles.actions}>
                  <button onClick={() => toggle(index, 'isView')}>Detail</button>
                  <button className={styles.btnDelete} onClick={() => handleDelete(id)}>Remove</button>
                </span>
              </span>
              <span>
                {isView && (
                  <Form todo={todo} onDone={(todo) => handleUpdate(index, todo)} isEdit />
                )}
              </span>
            </li>
          )
        })
      }
      </ul>
      {isBulkActionShow && (
        <div className={styles.bulkAction}>
          <span>Bulk Action:</span>
          <button className={styles.btnDelete} onClick={handleDeleteMultiple}>Remove</button>
        </div>
      )}
    </>
  );
};
