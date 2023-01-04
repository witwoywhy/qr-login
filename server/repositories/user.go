package repositories

import "qr-login/models"

type User interface {
	Create(*models.User) (*models.User, error)
	FindByUsername(string) *models.User
}
