'use strict'
const Item = use('App/Models/Item')
class ItemController {
    async ItemList({view, params}) {

        // Create an item
        //const item = new Item;
        //item.title = 'My item name';
        //item.link = 'http://google.com';
        //item.description = 'My item description';

        //await item.save();

        // Fetch an item
        //const items = await Item.all();
        const items = await Item.query().where('home_space_id', params.id).fetch();
        return view.render('lists/items', { items: items.toJSON() })
    }
    async ItemDetail({view, params}) {

        const item = await Item.query().where('id', params.id).fetch();
        return view.render('details/itemDetail', { item: item.toJSON() })

    }
    
    async ItemSearchList({request, view, params}) {
        
        var searchText=request.all()
        if(searchText.searchItem!=''){
        const items = await Item.query().whereRaw("user_id = :userid AND (name LIKE :searchterm OR description LIKE :searchterm OR itemFunction LIKE :searchterm OR itemType LIKE :searchterm OR price LIKE :searchterm OR owner1 LIKE :searchterm OR owner2 LIKE :searchterm OR owner3 LIKE :searchterm OR owner4 LIKE :searchterm OR owner5 LIKE :searchterm)", {searchterm: '%'+searchText.searchItem+'%', userid: params.id} ).fetch();
        return view.render('lists/itemSearch', { items: items.toJSON() });
        }
    }
    async ItemListSpaceAPI({params, response}) {

        const items = await Item.query().where('home_space_id', params.id).fetch();
        
        return response.json({ items: items.toJSON() })}

    async ItemDetailAPI({params, response}) {

        const item = await Item.query().where('id', params.id).fetch();
        return response.json({ item: item.toJSON() })
        }
  

    // creating and saving a new item
    async IteminsertAPI ({ request, response }) {
      try {
        // getting data passed within the request
        const data = request.only(['name', 'home_space_id', 'user_id'])
    
        // looking for item in database
        const itemExists = await HomeSpace.query().whereRaw("name = :itemname AND home_space_id = :homespaceid AND user_id = :userid", {itemname: data.name, homespaceid: data.home_space_id, userid: user_id}).fetch();
    
        // if user exists don't save
        if (itemExists) {
          return response
            .status(400)
            .send({ message: { error: 'Item Already Exists' } })
        }
    
        // if item doesn't exist, proceeds with saving him in DB
        const item = await Item.create(data);
        
        return item
      } catch (err) {
        return response
          .status(err.status)
          .send(err)
      }
    }
        
    }
    module.exports = ItemController
