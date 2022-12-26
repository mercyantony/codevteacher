import * as bcrypt from 'bcrypt';

export const passwordVerify = async (password, hashedPassword) => {
    const verify = await bcrypt.compare(password, hashedPassword);
    return verify;
};
