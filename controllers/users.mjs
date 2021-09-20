import jsSHA from 'jssha';

export default function initUsersController(db) {
  const home = async (request, response) => {
    try {
      response.render('home');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  const login = async (request, response) => {
    try {
      // locate user email within database
      const user = await db.User.findOne({
        where: {
          email: request.body.email,
        },
      });
      console.log('user==>', user);
      // convert keyed-in password to hashed so as to auth with the one in db
      const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
      shaObj.update(request.body.password);
      const hashedPassword = shaObj.getHash('HEX');
      console.log('hashed password', hashedPassword);

      if (hashedPassword === user.password) {
        response.cookie('loggedIn', true);
        response.cookie('userId', user.id);
        response.send({ user });
      } else {
        response.send('Please login to proceed');
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  return {
    home, login,
  };
}
