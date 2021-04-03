package main

import (
	"database/sql"
	"strconv"
)

type Game struct {
	id      int
	players map[string]string
	turn    int
	db      *sql.DB
}

func newGame(id int, players map[string]string) *Game {
	dbName := gameName(id)
	db := newDB(dbName) // May panic

	tx, err := db.Begin()
	check(err)

	newInfo(tx, players)
	newMap(tx)
	newTurn(tx, 1)

	tx.Commit()
	return &Game{id: id, players: players, db: db, turn: 1}
}

func loadGame(username string, id int) (*Game, string) {
	var game Game
	dbName := gameName(id)
	db := connect(dbName)
	_, err := db.Query("select * from INFO")
	if err != nil {
		return &game, ""
	}
	role := checkUser(username, db)
	if role == "" {
		return &game, ""
	}

	game.id = id
	game.players = make(map[string]string)
	game.db = db
	rows, err := db.Query("select * from INFO;")
	for rows.Next() {
		var role string
		var username string
		err = rows.Scan(&role, &username)
		check(err)
		game.players[role] = username
	}
	game.turn, err = strconv.Atoi(game.players["turn"])
	check(err)
	delete(game.players, "turn")

	return &game, role
}
