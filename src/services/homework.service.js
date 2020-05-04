import { findIndex } from 'lodash';

const BACKEND_SERVER = 'https://promise-server.herokuapp.com';

export class HomeworkService {
  async fetchList() {
    return (await fetch(`${BACKEND_SERVER}/api/homeworks`)).json();
  }

  async deleteOne(action) {
    const req = await fetch(`${BACKEND_SERVER}/api/homeworks/${action.value.id}`, {
      method: 'DELETE'
    });
    await req.json();
  }

  async updateOne(homeworks, action) {
    const req = await fetch(`${BACKEND_SERVER}/api/homeworks/${action.value.id}`, {
      method: 'PUT',
      body: JSON.stringify(action.value)
    });
    const result = await req.json();
    const index = findIndex(homeworks, { id: result.id });
    if (index > -1) {
      const newHomeworks = [...homeworks];
      newHomeworks[index] = result;
      return newHomeworks;
    }
  }
}