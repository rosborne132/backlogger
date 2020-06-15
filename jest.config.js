module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json', 'css'],
    testPathIgnorePatterns: ['./node_modules/'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '^src(.*)$': '<rootDir>/src$1'
    },
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(js|jsx|ts|tsx|css)$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']
}
