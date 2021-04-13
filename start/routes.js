'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')
Route.get('/', 'HomeController.home');
Route.get('/spaces/:id', 'HomeSpaceController.homeSpace');//the id is the user id
Route.get('/items/:id', 'ItemController.ItemList');//the id is the space id
Route.get('/item/:id', 'ItemController.ItemDetail');// the id is the item id
Route.on('/itemSearch/:id').render('lists.itemSearch');//the id is the user id 
Route.get('/itemSearchResult/:id', 'ItemController.ItemSearchList');//the id is the user id 
Route.on('/signup').render('auth.signup');
Route.post('/signup', 'UserController.create').validator('CreateUser');
Route.on('/login').render('auth.login');
Route.get('/logout', async ({ auth, response }) => {
    await auth.logout();
    return response.redirect('/');
});
Route.post('/login', 'UserController.login').validator('LoginUser');
//routes for API
Route.group(() => {
Route.post('users', 'UserController.loginAPI');
Route.get('users', 'UserController.logoutAPI').middleware(['auth:basic,jwt']);
Route.post('user', 'UserController.createAPI');
Route.get('home/:id', 'HomeController.homeAPI').middleware(['auth:basic,jwt']);//the id is the user id 
Route.get('space/:id', 'HomeSpaceController.homeSpaceAPI').middleware(['auth:basic,jwt']);//the id is the home id
Route.get('items/:id', 'ItemController.ItemListSpaceAPI').middleware(['auth:basic,jwt']);//the id is the item id
Route.get('item/:id', 'ItemController.ItemDetailAPI').middleware(['auth:basic,jwt']);//the id is the space id
Route.get('/itemSearch/:id', 'ItemController.ItemSearchAPI');//the id is the user id 
}).prefix('api/v1')
