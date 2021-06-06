import * as React from 'react'
import { Button } from 'src/components/Elements'

export type GroupButtonProps = {
    isLoading: boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonGroup = ({ isLoading, onClick }: GroupButtonProps) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }} data-testid="buttonGroup">
        <Button onClick={onClick} className="cancel" isLoading={isLoading}>
            Cancel
        </Button>

        <Button type="submit" isLoading={isLoading}>
            Submit
        </Button>
    </div>
)
