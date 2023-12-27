describe('.env', () => {
  const createTestsForVariable = (name: string) => {
    describe(name, () => {
      it(`should be defined`, () => {
        expect(process.env[name]).toBeDefined();
      });
      it(`should not be empty`, () => {
        expect(process.env[name]).not.toBe('');
      });
    })
  }

  const variables = [
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    'DB_PORT',
    'CACHE_HOURS',
  ];

  variables.forEach(createTestsForVariable);
});
