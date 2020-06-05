import * as React from 'react'

export type InputType = {
    labelText?: string
    inputId: string
    inputType?: 'text' | 'password' | 'number'
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ labelText = '', inputId, inputType = 'text', onChange }: InputType) => (
    <div className="pv2">
        {labelText.length ? (
            <label htmlFor={inputId} className="db f4">
                {labelText}
            </label>
        ) : null}
        <input
            id={inputId}
            data-testid={inputId}
            className="ba b--light-white br3 f4 indent h2 mv3 w-100"
            type={inputType}
            onChange={onChange}
        />
    </div>
)
