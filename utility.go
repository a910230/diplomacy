package main

import (
	"database/sql"
	"fmt"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func connect(dbName string) *sql.DB {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?charset=utf8", username, password, server, port, dbName))
	check(err)
	return db
}
