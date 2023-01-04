package services

import "qr-login/models"

type User interface {
	SignUp(string, string) (*models.User, error)
	Login(string, string) (*models.User, error)
}
