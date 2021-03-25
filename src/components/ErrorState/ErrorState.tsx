import React from 'react';

import styles from './ErrorState.module.css';
import { useTranslation } from 'react-i18next';

type Props = {
  text: string;
};

function ErrorState({ text }: Props) {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p>{text || t('errorstate.defaultmessage')}</p>
    </div>
  );
}

export default ErrorState;
