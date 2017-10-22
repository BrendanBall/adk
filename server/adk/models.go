package adk

import "github.com/satori/go.uuid"

type ProjectID uuid.UUID

type Project struct {
	ID     ProjectID
	Name   string
	Boards []Board
}

type BoardID uuid.UUID

type Board struct {
	ID      BoardID
	Name    string
	Project *Project
	Lanes   []Lane
}

type LaneID uuid.UUID

type Lane struct {
	ID    LaneID
	Name  string
	Board *Board
}

type StoryID uuid.UUID

type Story struct {
	ID          StoryID
	Name        string
	Description string
	Lane        *Lane
	Project     *Project
	Tasks       []Task
}

type TaskID uuid.UUID

type Task struct {
	ID          TaskID
	Name        string
	Description string
	Lane        *Lane
	Assignee    *User
}

type UserID uuid.UUID

type User struct {
	ID       UserID
	Username string
	Name     string
	Surname  string
}
