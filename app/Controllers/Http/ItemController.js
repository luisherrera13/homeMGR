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
        
    }
    module.exports = ItemController
