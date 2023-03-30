import ActiveSession from "../models/activeSession";

async function reqAuth(token) {
  const session = await ActiveSession.find({ token: token });
  if (session.length === 1) {
    return {
      success: true,
      msg: "token authorized",
      userId: session[0].userId,
    };
  } else {
    return {
      success: false,
      msg: "User is not logged on or session expired",
      userId: undefined,
    };
  }
}

export default reqAuth;
