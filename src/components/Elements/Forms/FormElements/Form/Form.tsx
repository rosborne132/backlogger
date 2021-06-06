import * as React from 'react'
import { ButtonGroup } from 'src/components/Elements'

import styles from './Form.module.css'

export type FormProps = {
    closeForm: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
    formId: string
    isLoading: boolean
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export const Form = ({ closeForm, children, formId, isLoading, onSubmit }: FormProps) => (
    <form className={styles.form} onSubmit={onSubmit} data-testid={formId}>
        <fieldset className={styles.fieldset}>
            {children}

            <ButtonGroup isLoading={isLoading} onClick={closeForm} />
        </fieldset>
    </form>
)
