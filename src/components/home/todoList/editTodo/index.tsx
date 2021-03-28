import 'react-responsive-modal/styles.css';

import React, { useEffect, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { TTodo } from 'src/@types';
import { API } from 'src/lib';

import { Form } from '../form';
import {} from './editTodo.module.scss';

type TProp = {
  id: string;
  setIsOpen: () => void;
  onDone:(todo: TTodo[]) => void;
  isOpen: boolean;
};

export const ModalEdit: React.FC<TProp> = ({
  id, isOpen, setIsOpen, onDone,
}) => {
  const [todo, setTodo] = useState<TTodo>();

  useEffect(() => {
    if (id && isOpen) {
      (async () => {
        try {
          const res = await API.get(`/todos/${id}`);
          setTodo(res.data);
        } catch (error) {
          // ignore since error was handled globally
          error.handleGlobally();
        }
      })();
    }
  }, [isOpen]);

  return (
    <Modal open={isOpen} onClose={setIsOpen} center>
      <div style={{ padding: '20px 50px' }}>
        <Form todo={todo} onDone={onDone} />
      </div>
    </Modal>
  );
};
