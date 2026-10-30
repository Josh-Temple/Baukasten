import test from 'node:test';
import assert from 'node:assert/strict';
import {
  COPY, selectLanguage, localizeGroup, localizeProject,
  localizeStatus, localizeStatusMeaning, checkJapaneseCoverage,
} from '../localization.js';

test('explicit URL language overrides saved language and browser preference', () => {
  assert.equal(selectLanguage('?lang=ja', 'en', 'en-US'), 'ja');
  assert.equal(selectLanguage('?lang=en', 'ja', 'ja-JP'), 'en');
  assert.equal(selectLanguage('?unused=1', 'ja', 'en-US'), 'ja');
  assert.equal(selectLanguage('?lang=de', null, 'ja-JP'), 'ja');
  assert.equal(selectLanguage('', null, 'en-US'), 'en');
  assert.equal(selectLanguage('', null, 'ja-JP'), 'ja');
});

test('each user-visible UI label is present in both languages', () => {
  for (const key of Object.keys(COPY.en)) {
    assert.ok(Object.hasOwn(COPY.ja, key), 'Japanese copy missing ' + key);
    const entry = COPY.ja[key];
    assert.ok(Array.isArray(entry) ? entry.every(Boolean) : entry, 'Japanese copy is blank: ' + key);
  }
  assert.equal(COPY.ja.selection.length, COPY.en.selection.length);
});

test('Japanese translation covers all seven published projects and five statuses', () => {
  const ids = ['circuit', 'engrave', 'majoris', 'parla', 'world-history-lab', 'noema', 'lumen-commonplace'];
  const steps = [
    { title: 'Step 1', desc: 'Do something' },
    { title: 'Step 2', desc: 'Review something' },
    { title: 'Step 3', desc: 'Repeat something' },
  ];
  const projects = ids.map(id => ({
    id, oneLiner: 'English', audience: 'English', fullProblem: 'English',
    fullApproach: 'English', firstTask: 'English', trustNote: 'English',
    primaryActionLabel: 'English', howItWorks: steps,
    screenshots: [{ caption: 'Screenshot', src: 'screenshots/sample.png' }],
    demoLink: 'https://example.com', status: 'Daily use',
  }));
  projects[0].screenshots.push(
    { caption: 'Screenshot 2', src: 'screenshots/sample2.png' },
    { caption: 'Screenshot 3', src: 'screenshots/sample3.png' },
  );
  const groups = ['recall', 'conversation', 'exploration', 'reading'].map(id => ({
    id, title: 'English', description: 'English',
  }));
  const statuses = {
    'Daily use': 'English',
    'In validation': 'English',
    Stable: 'English',
    Consolidating: 'English',
    Infrastructure: 'English',
  };
  assert.deepEqual(checkJapaneseCoverage(projects, groups, statuses), {
    missingProjects: [], missingGroups: [], missingStatuses: [],
  });
  for (const project of projects) {
    const ja = localizeProject(project, 'ja');
    assert.notEqual(ja.oneLiner, project.oneLiner, project.id);
    assert.notEqual(ja.firstTask, project.firstTask, project.id);
    assert.equal(ja.demoLink, project.demoLink, 'app destination must never be translated');
    assert.equal(ja.howItWorks.length, 3);
    assert.deepEqual(ja.screenshots.map(screen => screen.src), project.screenshots.map(screen => screen.src));
    assert.equal(localizeProject(project, 'en'), project);
  }
  for (const group of groups) {
    assert.notEqual(localizeGroup(group, 'ja').title, group.title);
    assert.equal(localizeGroup(group, 'en'), group);
  }
  for (const [status, meaning] of Object.entries(statuses)) {
    assert.notEqual(localizeStatus(status, 'ja'), status);
    assert.notEqual(localizeStatusMeaning(status, meaning, 'ja'), meaning);
    assert.equal(localizeStatus(status, 'en'), status);
  }
});
