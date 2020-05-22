module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    testPathIgnorePatterns: ['./node_modules/'],
    moduleNameMapper: {
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@context(.*)$': '<rootDir>/src/context$1',
        '^@lib(.*)$': '<rootDir>/src/lib$1',
        '^@schema(.*)$': '<rootDir>/src/schema$1',
        '^@styles(.*)$': '<rootDir>/src/styles$1',
        '^@types(.*)$': '<rootDir>/src/types$1'
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    }
}
