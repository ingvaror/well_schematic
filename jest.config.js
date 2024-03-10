module.exports = {
    roots: ['<rootDir>'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        "^.+\\.tsx?$": "ts-jest"
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|tsx)?$',
    moduleFileExtensions: ['ts', 'js', 'json', 'node', 'tsx'],
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/tests/__mocks__/styleMock.js',
    },
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: "coverage",
};