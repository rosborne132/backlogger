import * as React from 'react'

export type SelectType = {
    children?: React.ReactNode
    labelText?: string
    inputId: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ConsoleSelect = ({ children, labelText = '', inputId, onChange }: SelectType) => (
    <div className="pv2">
        {labelText.length ? (
            <label htmlFor={inputId} className="db f4">
                {labelText}
            </label>
        ) : null}
        <select
            name={inputId}
            id={inputId}
            data-testid={inputId}
            className="ba b--black br3 h2 mv3 w-100"
            onChange={onChange}
        >
            {children}
        </select>
    </div>
)
