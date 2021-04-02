package main

import (
	"database/sql"
	"fmt"
)

func gameName(id int) string {
	return fmt.Sprintf("GAME%04d", id)
}

func tableName(turn int) string {
	return fmt.Sprintf("TURN%03d", turn)
}

func newDB(name string) *sql.DB {
	db := connect("DUMMYDB")
	_, err := db.Exec(fmt.Sprintf("create database %s;", name))
	check(err)

	_, err = db.Exec(fmt.Sprintf("use %s;", name))
	check(err)
	return db
}

func newInfo(tx *sql.Tx, players map[string]string) {
	_, err := tx.Exec("create table if not exists INFO (role char(4) not null, username varchar(20) not null, primary key (role));")
	check(err)

	stmt, err := tx.Prepare("insert into INFO (role, username) values (?, ?);")
	check(err)
	_, err = stmt.Exec("turn", "1")
	check(err)
	for role, username := range players {
		_, err = stmt.Exec(role, username)
		check(err)
	}
}

func newMap(tx *sql.Tx) {
	createOrder := "create table if not exists MAP (turn tinyint not null, "
	for _, p := range prov {
		createOrder += fmt.Sprintf("%s char(5) default '', ", p)
	}
	createOrder += "primary key (turn));"
	_, err := tx.Exec(createOrder)
	check(err)

	insertOrder := "insert into MAP (turn, bud, tri, vie, edi, lvp, lon, bre, mar, par, ber, kie, mun, nap, rom, ven, mos, sev, stps, war, ank, con, smy) " +
		"values (1, 'A aus', 'F aus', 'A aus', 'F eng', 'A eng', 'F eng', 'F fra', 'A fra', 'A fra', 'A ger', 'F ger', 'A ger', 'F ita', 'A ita', 'A ita', 'A rus', 'F rus', 'F rus', 'A rus', 'F tur', 'A tur', 'A tur');"
	_, err = tx.Exec(insertOrder)
	check(err)
}

func newTurn(tx *sql.Tx, turn int) {
	order := "create table if not exists " + tableName(turn) + " (role char(3) not null, unit char(4) not null, obj1 char(4) not null, obj2 char(4) not null default '', obj3 char(4) not null default '', primary key (unit));"
	_, err := tx.Exec(order)
	check(err)
}

func checkUser(username string, db *sql.DB) string {
	rows, err := db.Query("select role from INFO where username=?;", username)
	check(err)
	var count int
	var role string
	for rows.Next() {
		err = rows.Scan(&role)
		check(err)
		count++
	}
	if count != 1 {
		return ""
	}
	return role
}
