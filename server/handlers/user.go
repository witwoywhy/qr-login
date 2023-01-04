package handlers

import (
	"log"
	"net/http"
	"qr-login/services"
	"strings"

	"github.com/labstack/echo/v4"
	"golang.org/x/net/websocket"
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

func (h *UserHandler) Login(c echo.Context) error {
	var dto struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	c.Bind(&dto)

	u, err := h.serv.Login(dto.Username, dto.Password)
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

func (h *UserHandler) LoginWithUUID(c echo.Context) error {
	var dto struct {
		UUID   string `json:"uuid"`
		UserID string `json:"userID"`
	}

	c.Bind(&dto)

	err := h.serv.LoginWithUUID(dto.UUID, dto.UserID)
	if err != nil {
		return handleError(c, err)
	}

	return c.JSON(http.StatusOK, map[string]any{
		"ok": true,
	})
}

func (h *UserHandler) WS(c echo.Context) error {
	websocket.Handler(func(ws *websocket.Conn) {
		defer ws.Close()
		for {
			var msg string
			err := websocket.Message.Receive(ws, &msg)
			if err != nil {
				if err.Error() == "EOF" {
					log.Println("close connection")
					h.serv.DeleteConnByWS(ws)
					ws.Close()
					return
				}
			}

			s := strings.Split(msg, "|")
			cmd := s[0]
			switch cmd {
			case "login:uuid":
				v := s[1]
				h.serv.StoreConn(ws, v)
			}
		}
	}).ServeHTTP(c.Response(), c.Request())

	return nil
}

func NewUserHandler(serv services.User) *UserHandler {
	return &UserHandler{
		serv: serv,
	}
}
