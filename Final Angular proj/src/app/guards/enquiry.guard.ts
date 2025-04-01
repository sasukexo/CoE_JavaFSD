import { CanActivateFn } from '@angular/router';

export const enquiryGuard: CanActivateFn = (route, state) => {
  const username = localStorage.getItem('username');
  console.log("Guard activated for:", state.url);
  return !!username; // Converts truthy/falsy values to boolean
};
