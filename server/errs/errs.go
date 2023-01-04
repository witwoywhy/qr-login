package errs

import "net/http"

type AppError struct {
	Code    int
	Message string
}

func (e AppError) Error() string {
	return e.Message
}

func NewUnexpectedError(msg string) error {
	if msg == "" {
		msg = "unexpected error"
	}

	return AppError{
		Code:    http.StatusUnprocessableEntity,
		Message: msg,
	}
}

func NewConflictError(msg string) error {
	return AppError{
		Code:    http.StatusConflict,
		Message: msg,
	}
}

func NewNotFoundError(msg string) error {
	if msg == "" {
		msg = "not found"
	}

	return AppError{
		Code:    http.StatusNotFound,
		Message: msg,
	}
}

func NewUnauthorized(msg string) error{
	if msg == "" {
		msg = "authen failed"
	}

	return AppError{
		Code: http.StatusUnauthorized,
		Message: msg,
	}
}
