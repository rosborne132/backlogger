import * as React from 'react'
import { motion } from 'framer-motion'
import BeatLoader from 'react-spinners/BeatLoader'

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
        whileHover={{ scale: 1.005 }}
        whileTap={{ scale: 0.99 }}
        disabled={isLoading}
        onClick={onClick}
        type={type}
        data-testid="button"
        className="bg-blue ba bw0 br3 db pv2 pointer shadow-hover w-100 white"
    >
        <span className="f4">
            {isLoading ? <BeatLoader size={15} color={'#fff'} /> : children}
        </span>
    </motion.button>
)
