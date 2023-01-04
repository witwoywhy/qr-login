package models

import (
	"errors"
	"unicode/utf8"

	"github.com/google/uuid"
)

type User struct {
	ID       uuid.UUID
	Username string
	Password string
}

func validateUsername(username string) error {
	if utf8.RuneCountInString(username) < 3 {
		return errors.New("username must be at least 3 character")
	}

	return nil
}

func validatePassword(password string) error {
	if utf8.RuneCountInString(password) < 8 {
		return errors.New("password must be at least 8 character")
	}

	return nil
}

func NewUser(username, password string) (*User, error) {
	if err := validateUsername(username); err != nil {
		return nil, err
	}

	if err := validatePassword(password); err != nil {
		return nil, err
	}

	return &User{
		Username: username,
		Password: password,
	}, nil
}
