import React, { useCallback, useState } from 'react';
import { Modal } from 'react-responsive-modal';
import { TTodo } from 'src/@types';

import { Form } from '../form';

type TProp = {
  onDone: (todo: TTodo) => void;
};

export const ModalCreate: React.FC<TProp> = ({ onDone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpenAddTodo = useCallback(() => {
    setIsOpen((_isOpenAddTodo) => !_isOpenAddTodo);
  }, []);

  const handleOnDone = (todo: TTodo) => {
    toggleOpenAddTodo();
    onDone(todo);
  };

  return (
    <>
      <button type="button" onClick={toggleOpenAddTodo} style={{ color: '#52AF52' }}>Add new todo</button>
      <Modal open={isOpen} onClose={toggleOpenAddTodo} center>
        <div style={{ padding: '20px 50px' }}>
          <Form onDone={handleOnDone} />
        </div>
      </Modal>
    </>
  );
};
