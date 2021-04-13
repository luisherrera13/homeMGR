"use strict";
const User = use("App/Models/User");
class UserController {
  async create({ request, response, auth }) {
    const user = await User.create(
      request.only(["username", "email", "password", "home"])
    );

    // Find a user by user id and save needed values to home table
    const homeValues = await User.find(user.id);
    await homeValues.homes().create({ home_name: user.home });
    await auth.login(user);
    return response.redirect("/", true);
  }
  async login({ request, auth, response, session }) {
    const { email, password } = request.all();
    try {
      await auth.attempt(email, password);
      return response.redirect("/", true);
    } catch (error) {
      session.flash({ loginError: "Estas credenciales no funcionan." });
      return response.redirect("/login", true);
    }
  }

// API

// creating and saving a new user (sign-up)
async createAPI ({ request, response }) {
  try {
    // getting data passed within the request
    const data = request.only(['username', 'email', 'password', 'home'])

    // looking for user in database
    const userExists = await User.findBy('email', data.email)

    // if user exists don't save
    if (userExists) {
      return response
        .status(400)
        .send({ message: { error: 'User already registered' } })
    }

    // if user doesn't exist, proceeds with saving him in DB
    const user = await User.create(data)
    
    // Find a user by user id and save needed values to home table
    const homeValues = await User.find(user.id);
    await homeValues.homes().create({ home_name: user.home });
    return user
  } catch (err) {
    return response
      .status(err.status)
      .send(err)
  }
}
async loginAPI({request, auth, response}) {

  const { email, password } = request.all();
  const token = await auth.authenticator('jwt').attempt(email, password);
  return token;
}
async logoutAPI({ auth, response }) { 
  await auth.authenticator('jwt').logout();
    return response.redirect('/'); 

}


}


module.exports = UserController;
