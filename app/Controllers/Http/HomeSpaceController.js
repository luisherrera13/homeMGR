'use strict'
//getting the model
const HomeSpace = use('App/Models/HomeSpace')

class HomeSpaceController {
    async home({view, params}) {

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
}



module.exports = HomeSpaceController
