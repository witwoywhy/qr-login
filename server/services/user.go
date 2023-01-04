package services

import "qr-login/models"

type User interface {
	SignUp(string, string) (*models.User, error)
}
