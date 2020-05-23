module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    testPathIgnorePatterns: ['./node_modules/'],
    moduleNameMapper: {
        '^src(.*)$': '<rootDir>/src$1'
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    }
}
