export let ImagePath;

(function (ImagePath) {
  ImagePath['LANDING'] = 'landing';
  ImagePath['USERS'] = 'users';
  ImagePath['ECOMMERCE'] = 'e-commerce';
  ImagePath['PROFILE'] = 'profile';
  ImagePath['WIDGET'] = 'widget';
})(ImagePath || (ImagePath = {}));

// ==============================|| NEW URL - GET IMAGE URL ||============================== //

export function getImageUrl(name, path) {
  if (!name || !path) {
    throw new Error("Both 'name' and 'path' parameters are required.");
  }

  // Check if path is a valid ImagePath category
  if (!Object.values(ImagePath).includes(path)) {
    throw new Error(`Invalid path: ${path}. Must be one of ${Object.values(ImagePath).join(', ')}.`);
  }

  return new URL(`/src/assets/images/${path}/${name}`, import.meta.url).href;
}
