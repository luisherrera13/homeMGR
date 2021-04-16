'use strict'
//getting the model
const HomeSpace = use('App/Models/HomeSpace')

class HomeSpaceController {
    async homeSpace({view, params}) {

        // Create an item
       /* const homeSpace = new HomeSpace;
        homeSpace.spaceName = 'Habitacion';
        homeSpace.spaceFunction = 'Descansar';
        homeSpace.home_id = '1';

        await homeSpace.save();*/
        
        // Fetch an item
       // const homeSpaces = await HomeSpace.all();
        const homeSpaces = await HomeSpace.query().where('home_id', params.id).fetch();

        return view.render('lists/spaces', { homeSpaces: homeSpaces.toJSON() })
    }
    async homeSpaceAPI({response, params}) {

        const homeSpaces = await HomeSpace.query().where('home_id', params.home_id).fetch();
        var userHomeSpaces=homeSpaces.toJSON();
        return response.json(userHomeSpaces)
        }
    


        // creating and saving a new user (sign-up)
async createSpaceAPI ({ request, response }) {
    try {
      // getting data passed within the request
      const data = request.only(['spaceName', 'spaceFunction', 'home_id'])
  
      // looking for home space in database
      const spaceExists = await HomeSpace.query().whereRaw("spaceName = :spacename AND home_id = :homeid", {spacename: data.spaceName, homeid: data.home_id} ).fetch();       
      //var spacesExists=Spaces.toJSON();
  
      // if space exists don't save
      if (spaceExists.rows.length!=0) {
        return response
          .status(400)
          .send({ message: { error: 'User already registered' } })
      }
  
      // if space doesn't exist, proceeds with saving him in DB
      const space = await HomeSpace.create(data)
      
      
      return space
    } catch (err) {
      return response
        .status(err.status)
        .send(err)
    }
  }
    }


module.exports = HomeSpaceController
