// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

 
export const environment = {
  production: false,
   urlAddress: 'https://localhost:44361/api',
   downloadUrl: 'https://localhost:44361',
  // urlAddress: 'http://18.222.241.246/apirent/api',
  // downloadUrl: 'http://18.222.241.246/apirent/',
  showQuota: false,
  defaultCountry: 99
};