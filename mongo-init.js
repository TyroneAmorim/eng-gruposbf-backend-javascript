db = db.getSiblingDB('parametros');

db.createUser({
  user: 'usuario',
  pwd: 'usuario',
  roles: [
    {
      role: 'readWrite',
      db: 'parametros',
    },
  ],
});

db.createCollection('moedas');
