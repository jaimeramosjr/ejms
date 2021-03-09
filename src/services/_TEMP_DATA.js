// THESE DATA ARE TEMPORARY TEST DEVELOPMENT DATA

let _TEMP_USERS =
[
  [ 'Jaime', 'Ramos' ],

];

const _TEMP_USERS_DATA = [];
for(const i in _TEMP_USERS)
{
  const number = parseInt(i) + 1;
  _TEMP_USERS_DATA.push(
  {
    id: number,
    firstname: _TEMP_USERS[i].shift(),
    lastname: _TEMP_USERS[i].pop(),
    status: i % 2 === 0? 'Active' : 'Disabled',
    phone: '09' + Array(9).fill(0).map(() => number).join(''),
    description: `User #${number}.`,
    projects: null,
  });
}

export
{
  _TEMP_USERS_DATA as _TEMP_USERS,
};
