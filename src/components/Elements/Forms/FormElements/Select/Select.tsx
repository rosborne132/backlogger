import * as React from 'react'
import Select from 'react-select'

export type SelectType = {
    labelText?: string
    inputId: string
    onChange: (str: string) => void
    options: any[]
}

export const ConsoleSelect = ({ labelText = '', inputId, onChange, options }: SelectType) => (
    <div style={{ paddingTop: 'var(--spacing-md)', paddingBottom: 'var(--spacing-md)' }}>
        {labelText.length ? <label htmlFor={inputId}>{labelText}</label> : null}

        <div data-testid={inputId}>
            <Select
                options={options}
                onChange={({ value }: { value: string }) => onChange(value)}
                defaultInputValue=""
            />
        </div>
    </div>
)
