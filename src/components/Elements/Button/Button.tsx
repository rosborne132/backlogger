import * as React from 'react'
import { motion } from 'framer-motion'
import BeatLoader from 'react-spinners/BeatLoader'

type ButtonProps = {
    className?: string
    children: React.ReactNode
    isLoading?: boolean
    onClick?: any
    type?: 'button' | 'submit' | 'reset'
}

export const Button: React.FC = ({ className, children, isLoading, onClick, type }: ButtonProps): React.ReactNode => (
    <motion.button
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        disabled={isLoading}
        onClick={onClick}
        type={type}
        data-testid="button"
        className={className}
    >
        <span>{isLoading ? <BeatLoader size={15} color="#fff" /> : children}</span>
    </motion.button>
)
