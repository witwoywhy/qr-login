package handlers

import (
	"net/http"
	"qr-login/errs"

	"github.com/labstack/echo/v4"
)

func handleError(c echo.Context, err error) error {
	switch e := err.(type) {
	case errs.AppError:
		return c.JSON(e.Code, map[string]any{
			"ok":    false,
			"error": e.Message,
		})
	case error:
		return c.JSON(http.StatusInternalServerError, map[string]any{
			"ok":    false,
			"error": "internal server error",
		})
	}

	return nil
}
