export const createId = () => {
  //
  let code = '';
  const alpha =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeLength = 20;

  for (let i = 0; i < codeLength; i++) {
    code += alpha.charAt(Math.floor(Math.random() * alpha.length));
  }

  return code;
};
