import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
  const sql = 'SELECT * FROM Users';
  const [rows] = await promisePool.query(sql);
  //console.log(rows);
  return rows;
};

export {listAllUsers};
