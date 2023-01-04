package repositories

import (
	"qr-login/models"

	"github.com/google/uuid"
)

type UserRepositoryBuffer struct {
	u []models.User
	h map[string]models.User
}

// FindByID implements User
func (r *UserRepositoryBuffer) FindByID(id string) *models.User {
	v, ok := r.h[id]
	if ok {
		return &v
	}

	return nil
}

// FindByUsername implements User
func (r *UserRepositoryBuffer) FindByUsername(username string) *models.User {
	v, ok := r.h[username]
	if ok {
		return &v
	}

	return nil
}

// Create implements User
func (r *UserRepositoryBuffer) Create(u *models.User) (*models.User, error) {
	u.ID = uuid.New()

	r.u = append(r.u, *u)
	r.h[u.Username] = *u
	r.h[u.ID.String()] = *u

	return u, nil
}

func NewUserRepositoryBuffer() User {
	return &UserRepositoryBuffer{
		u: make([]models.User, 0),
		h: make(map[string]models.User),
	}
}
