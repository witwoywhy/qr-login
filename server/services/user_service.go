package services

import (
	"qr-login/errs"
	"qr-login/models"
	"qr-login/repositories"
	"sync"

	"golang.org/x/net/websocket"
)

type UserService struct {
	repo repositories.User

	uuid map[string]*websocket.Conn
	ws   map[*websocket.Conn]string

	mu sync.Mutex
}

func (s *UserService) DeleteConnByWS(ws *websocket.Conn) {
	s.mu.Lock()
	defer s.mu.Unlock()

	uuid, ok := s.ws[ws]
	if !ok {
		return
	}

	delete(s.ws, ws)
	delete(s.uuid, uuid)
}

func (s *UserService) StoreConn(ws *websocket.Conn, uuid string) {
	s.mu.Lock()
	defer s.mu.Unlock()

	s.uuid[uuid] = ws
	s.ws[ws] = uuid
}

func (s *UserService) Login(username, password string) (*models.User, error) {
	u := s.repo.FindByUsername(username)
	if u == nil {
		return nil, errs.NewUnauthorized("incorrect username or password")
	}

	if u.Password != password {
		return nil, errs.NewUnauthorized("incorrect username or password")
	}

	return u, nil
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
		mu:   sync.Mutex{},
		uuid: make(map[string]*websocket.Conn),
		ws:   make(map[*websocket.Conn]string),
	}
}
