import { RuleConfigSeverity } from '@commitlint/types';

export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'scope-enum': [RuleConfigSeverity.Error, 'always', [
        '',
        'deps',
        'helm',
        'ui',
        'api',
        'codes-admin',
        'admin',
        'camunda',
        'nexus',
        'mail'
    ]],
    'subject-case': [RuleConfigSeverity.Error, 'never', []],
  }
};
