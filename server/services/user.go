package services

import (
	"qr-login/models"

	"golang.org/x/net/websocket"
)

type User interface {
	SignUp(string, string) (*models.User, error)
	Login(string, string) (*models.User, error)
	StoreConn(*websocket.Conn, string)
	DeleteConnByWS(*websocket.Conn)
}
