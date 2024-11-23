function userMapper(user: any) {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    nationality: user.nationality,
  };
}
export default userMapper;
