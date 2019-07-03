'use strict'

const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hallo gayn' }
})

Route.group(() => {
  Route.get('/users', 'UserController.index').middleware('auth')
  Route.get('/users/:id', 'UserController.show').middleware('auth')
  Route.patch('/users/:id', 'UserController.update').middleware('auth')
  Route.delete('/users/:id', 'UserController.destroy').middleware('auth')
}).prefix('api/v1')

Route.group(() => {
  Route.post('/login', 'UserController.login')
  Route.post('/register', 'UserController.register')
}).prefix('api/auth')

Route.group(() => {
  Route.get('/rooms', 'RoomController.index').middleware('auth')
  Route.post('/rooms', 'RoomController.create').middleware('auth')
  Route.get('/rooms/:id', 'RoomController.show').middleware('auth')
  Route.put('/rooms/:id', 'RoomController.update').middleware('auth')
  Route.delete('/rooms/:id', 'RoomController.destroy').middleware('auth')
}).prefix('api/v1')

Route.group(() => {
  Route.get('/chats', 'ChatController.index').middleware('auth')
  Route.post('/chats', 'ChatController.create').middleware('auth')
  Route.get('/chats/:id', 'ChatController.show').middleware('auth')
  Route.patch('/chats/:id', 'ChatController.update').middleware('auth')
  Route.delete('/chats/:id', 'ChatController.destroy').middleware('auth')
}).prefix('api/v1')
