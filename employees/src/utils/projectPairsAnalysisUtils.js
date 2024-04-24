import { computeTimeOverlap } from './computeTimeUtils';

export const convertToProjectStructure = (parsedFile) => {
  const projects = {};

  parsedFile.forEach((data) => {
    if (!projects[data.projectId]) {
      projects[data.projectId] = {
        employees: {},
      };
    }
    projects[data.projectId].employees[data.employeeId] = {
      dateFrom: data.dateFrom,
      dateTo: data.dateTo,
    };
  });

  return projects;
};

export const computeWorkingPairs = (projects) => {
  const pairs = {};
  const projectIdentifiers = Object.keys(projects);

  projectIdentifiers.forEach((projectKey) => {
    const employees = projects[projectKey].employees;
    const currentKeys = Object.keys(employees);

    if (currentKeys.length < 2) return;

    for (let i = 0; i < currentKeys.length - 1; i++) {
      for (let j = i + 1; j < currentKeys.length; j++) {
        const pairName = `${currentKeys[i]}${currentKeys[j]}`;
        const firstEmployee = employees[currentKeys[i]];
        const secondEmployee = employees[currentKeys[j]];

        const collaborativeTime = computeTimeOverlap({
          startA: firstEmployee.dateFrom,
          endA: firstEmployee.dateTo,
          startB: secondEmployee.dateFrom,
          endB: secondEmployee.dateTo,
        });

        if (!pairs[pairName]) {
          pairs[pairName] = {
            firstEmployee: currentKeys[i],
            secondEmployee: currentKeys[j],
            combinedWorkDuration: 0,
            projects: {},
          };
        }

        pairs[pairName].combinedWorkDuration += collaborativeTime;
        pairs[pairName].projects[projectKey] = { collaborativeTime };
      }
    }
  });

  return pairs;
};

export const determineLongestWorkingPair = (pairs) => {
  const pairIdentifiers = Object.keys(pairs);
  let pairWithLongestWorkTime = null;
  let longestWorkDuration = 0;

  pairIdentifiers.forEach((pairKey) => {
    const currentPair = pairs[pairKey];

    if (currentPair.combinedWorkDuration > longestWorkDuration) {
      longestWorkDuration = currentPair.combinedWorkDuration;
      pairWithLongestWorkTime = currentPair;
    }
  });

  if (!pairWithLongestWorkTime) {
    return '';
  }

  return pairWithLongestWorkTime;
};
