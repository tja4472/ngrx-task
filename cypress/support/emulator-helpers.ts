import { EmulatorInfo } from 'emulator/emulator-info';

export function clearDatabase(projectId: string) {
  const url = `http://127.0.0.1:${EmulatorInfo.firestore.port}/emulator/v1/projects/${projectId}/databases/(default)/documents`;

  cy.request('DELETE', url).then((response) => {
    expect(response.status).to.eq(200);
  });
}

export function clearUserAccounts(projectId: string) {
  const url = `http://127.0.0.1:${EmulatorInfo.auth.port}/emulator/v1/projects/${projectId}/accounts`;

  cy.request('DELETE', url).then((response) => {
    expect(response.status).to.eq(200);
  });
}
