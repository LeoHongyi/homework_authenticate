##business logic mapping:
1、 create / delete user -> router user.router.js
2. create / delete role -> router role.router.js
3. authenticate user -> router user.router.js
4. validate user -> router user.router.js
5. check role by username -> router role.router.js after get authenticated user
6. checkout all roles by username -> router role.router.js after authenticate user

###api detail:
 url: http:localhost:3000/api
 1. create user /users
 2. delete user /users/:username
 3. add role to user /useraddrole
 4. authenticate user  /authenticate
 5. invalidate /invalidate
 6. create role /roles
 7. delete role /roles/:roleName
 8. check role /roles/role
 9. all roles /roles/allroles

#folder explain
1. /controller do some logic for response api
2. /middleware do some error handling or authenticated stuff
3. router about router for calling api
4. /test unit test every api call
5. service generate token service 
6. config public, private key for generate token and convert key to base64

##how to run project
1. how to generate public and private key
```
cd config
openssl
genrsa -out private.key 4096
rsa -in private.key -pubout -out public.key
exit

```
2. how to convert key format base64
```
node config/convert.key.js

```

3. how to run the code 
```
npm run dev

```

4. how to test 
```
npm  run test
```

###warning:
in the case of security issues, we should nt have committed the private key and public key and .env as well. but regarding the test I checkout.
