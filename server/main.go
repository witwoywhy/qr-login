package main

import (
	"qr-login/handlers"
	"qr-login/repositories"
	"qr-login/services"

	"github.com/labstack/echo/v4"
)

func main() {
	userRepo := repositories.NewUserRepositoryBuffer()
	userServ := services.NewUserServer(userRepo)
	userHanler := handlers.NewUserHandler(userServ)

	e := echo.New()
	e.POST("/user", userHanler.SignUp)
	e.Logger.Fatal(e.Start(":8000"))
}
