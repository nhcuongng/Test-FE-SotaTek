import React, { useState } from 'react';
import { TTodo } from 'src/@types';

import styles from './search.module.scss';

type TProp = {
  onDone: (results: TTodo[], txt: string) => void;
  list: TTodo[];
};

export const Search: React.FC<TProp> = ({ list, onDone }) => {
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const txt = e.target.value.trim();
    setSearchVal(txt);

    if (!txt) {
      onDone(list, txt);
      return;
    }

    const listSeached = list.filter(
      ({ title }) => title.toLocaleLowerCase().includes(txt.toLocaleLowerCase()),
    );
    onDone(listSeached, txt);
  };

  return (
    <div className={styles.searchOuter}>
      <input value={searchVal} onChange={handleSearch} placeholder="Search" />
    </div>
  );
};
