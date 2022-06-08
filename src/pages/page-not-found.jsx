import React from 'react';
import styles from './common.module.css';

export function PageNotFound() {
    return(
        <div className={styles.container}>
            <h1 className="text_type_main-medium">Страница не найдена</h1>
        </div>    
    );
}