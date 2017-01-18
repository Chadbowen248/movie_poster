import projects from '../../src/Projects';

describe('projects', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(projects, 'greet');
      projects.greet();
    });

    it('should have been run once', () => {
      expect(projects.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(projects.greet).to.have.always.returned('hello');
    });
  });
});
