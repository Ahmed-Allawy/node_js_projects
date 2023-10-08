require('dotenv').config()

const requiredEnvs = ['SECRET_KEY','PG_URI']

const missingEnvs = requiredEnvs.filter(envName => !process.env[envName]);

if(missingEnvs.length) throw new Error(`missing required envs ${missingEnvs}`);

module.exports = {
  saltOrRounds:process.env.SALT_ROUNDS||7,
  secret:process.env.SECRET_KEY,
  uri:process.env.PG_URI,
  port:process.env.PORT || 3000
}