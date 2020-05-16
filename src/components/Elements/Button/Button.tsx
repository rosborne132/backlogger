import * as React from 'react'
import { motion } from 'framer-motion'

type ButtonProps = {
    children: React.ReactNode
    isLoading?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    onClick,
    type
}): JSX.Element => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isLoading}
        onClick={onClick}
        type={type}
        data-testid="button"
        className="bg-blue ba br3 db pv2 pointer w-100 white"
    >
        <span className="f4">{isLoading ? '...Loading' : children}</span>
    </motion.button>
)
