import test from 'node:test';
import assert from 'node:assert/strict';
import { ABOUT_HASH, HOME_HASH, projectHref, resolveRoute } from '../navigation.js';

const projects = [{ id: 'circuit' }, { id: 'world-history-lab' }, { id: 'engrave' }];

test('home and About routes are addressable', () => {
  assert.deepEqual(resolveRoute('', projects), { view: 'gallery', projectId: null });
  assert.deepEqual(resolveRoute(HOME_HASH, projects), { view: 'gallery', projectId: null });
  assert.deepEqual(resolveRoute(ABOUT_HASH, projects), { view: 'info', projectId: null });
  assert.deepEqual(resolveRoute('#/about/', projects), { view: 'info', projectId: null });
});

test('each project has a shareable, refresh-safe fragment route', () => {
  for (const project of projects) {
    assert.deepEqual(resolveRoute(projectHref(project.id), projects), {
      view: 'project',
      projectId: project.id,
    });
  }
  assert.equal(projectHref('world-history-lab'), '#/projects/world-history-lab');
});

test('invalid or unknown routes do not display the wrong project', () => {
  for (const hash of ['#/projects/missing', '#/projects/%ZZ', '#/projects/circuit/extra', '#/unknown']) {
    assert.deepEqual(resolveRoute(hash, projects), { view: 'not-found', projectId: null });
  }
});

test('project href safely encodes special characters', () => {
  assert.equal(projectHref('special project'), '#/projects/special%20project');
  assert.deepEqual(resolveRoute(projectHref('special project'), [{ id: 'special project' }]), {
    view: 'project',
    projectId: 'special project',
  });
});
