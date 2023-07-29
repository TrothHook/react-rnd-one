import * as bcrypt from 'bcrypt';

const hashData = (data: string) => {
  return bcrypt.hash(data, 12);
};

const compareHashData = (data: string, hashedData: string) => {
  // console.log('data', data, hashedData);
  return bcrypt.compare(hashedData, data);
};

const updateRefreshTokenHash = async (refreshToken: string) => {
  const hash = await hashData(refreshToken);
  return hash;
};

const helpers = {
  hashData,
  updateRefreshTokenHash,
  compareHashData,
};

export default helpers;
