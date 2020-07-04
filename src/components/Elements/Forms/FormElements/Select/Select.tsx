import * as React from 'react'

export type SelectType = {
    children?: React.ReactNode
    labelText?: string
    inputId: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ConsoleSelect = ({ children, labelText = '', inputId, onChange }: SelectType) => (
    <div style={{ paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
        {labelText.length ? <label htmlFor={inputId}>{labelText}</label> : null}
        <select name={inputId} id={inputId} data-testid={inputId} onChange={onChange}>
            {children}
        </select>
    </div>
)
