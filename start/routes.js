"use strict"

const Route = use("Route")

Route.get("/", () => {
  return { greeting: "Hallo gayn" }
})

Route.group(() => {
  Route.get("/users", "UserController.index").middleware("auth")
  Route.get("/users/:id", "UserController.show").middleware("auth")
}).prefix("api/v1")

Route.group(() => {
  Route.post("/login", "UserController.login").as("loginJwt")
  Route.post("/register", "UserController.register").as("loginJwt")
}).prefix("api/auth")

Route.group(() => {
  Route.get("/rooms", "RoomController.index").middleware("auth")
  Route.get("/rooms/:id", "RoomController.show").middleware("auth")
}).prefix("api/v1")

Route.group(() => {
  Route.get("/chats", "ChatController.index").middleware("auth")
}).prefix("api/v1")
