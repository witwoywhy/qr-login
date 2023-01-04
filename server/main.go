package main

import (
	"net/http"
	"qr-login/handlers"
	"qr-login/repositories"
	"qr-login/services"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	userRepo := repositories.NewUserRepositoryBuffer()
	userServ := services.NewUserServer(userRepo)
	userHanler := handlers.NewUserHandler(userServ)

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:8080"},
		AllowMethods: []string{http.MethodPost},
	}))
	e.POST("/user", userHanler.SignUp)
	e.POST("/login", userHanler.Login)
	e.Logger.Fatal(e.Start(":8000"))
}
