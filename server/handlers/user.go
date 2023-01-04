package handlers

import (
	"net/http"
	"qr-login/services"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	serv services.User
}

func (h *UserHandler) SignUp(c echo.Context) error {
	var dto struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	c.Bind(&dto)

	u, err := h.serv.SignUp(dto.Username, dto.Password)
	if err != nil {
		return handleError(c, err)
	}

	var res struct {
		ID       string `json:"id"`
		Username string `json:"username"`
	}
	res.ID = u.ID.String()
	res.Username = u.Username
	return c.JSON(http.StatusOK, map[string]any{
		"ok":     true,
		"result": res,
	})

}
func NewUserHandler(serv services.User) *UserHandler {
	return &UserHandler{
		serv: serv,
	}
}
