import * as React from 'react'

export type InputType = {
    labelText?: string
    inputId: string
    inputType?: 'text' | 'password' | 'number'
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ labelText = '', inputId, inputType = 'text', onChange }: InputType) => (
    <div>
        {labelText.length ? (
            <label htmlFor={inputId} className="db f4">
                {labelText}
            </label>
        ) : null}
        <input id={inputId} data-testid={inputId} type={inputType} onChange={onChange} />
    </div>
)
