export const host = process.env.HOST || "https://fathomless-fjord-53432.herokuapp.com";
export const registerRoute = `${host}/api/auth/register`;
export const deleteUserRoute = `${host}/api/auth/deleteUser`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;