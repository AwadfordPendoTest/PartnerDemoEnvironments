import crmConfig from './configs/crm.js';
import investmentsConfig from './configs/investments.js';
import a11yConfig from './configs/a11y.js';
import insuranceConfig from './configs/insurance.js';
import ehrConfig from './configs/ehr.js';
import rppConfig from './configs/rpp.js';
import hrConfig from './configs/hr.js';
import mfaConfig from './configs/mfa.js';
import trainingConfig from './configs/training.js';
import psConfig from './configs/ps.js';
import japanConfig from './configs/japan.js';

// Return config based on current URL
export function determineConfig() {
  // If not on pendoexperience
  let app;
  if (!window.location.hostname.includes('pendoexperience.io')) {
    app = new URLSearchParams(window.location.search).get('app');
  }
  // Else, use subdomain
  else {
    app = window.location.hostname.split('.')[0];
  }

  // If app not defined, return crm config
  if (!configs[app]) {
    return configs['crm'];
  }
  // Else, return config for specified app
  else {
    return configs[app];
  }
}

let configs = {
  crm: crmConfig,
  investments: investmentsConfig,
  a11y: a11yConfig,
  insurance: insuranceConfig,
  ehr: ehrConfig,
  hr: hrConfig,
  rpp: rppConfig,
  mfa: mfaConfig,
  training: trainingConfig,
  ps: psConfig,
  japan: japanConfig,
};
