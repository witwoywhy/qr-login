package services

import (
	"qr-login/errs"
	"qr-login/models"
	"qr-login/repositories"
)

type UserService struct {
	repo repositories.User
}

func (s *UserService) SignUp(username, password string) (*models.User, error) {
	u, err := models.NewUser(username, password)
	if err != nil {
		return nil, errs.NewUnexpectedError(err.Error())
	}

	exist := s.repo.FindByUsername(username)
	if exist != nil {
		return nil, errs.NewConflictError("duplicate username")
	}

	u, err = s.repo.Create(u)
	if err != nil {
		return nil, errs.NewUnexpectedError(err.Error())
	}

	return u, nil
}

func NewUserServer(repo repositories.User) User {
	return &UserService{
		repo: repo,
	}
}
