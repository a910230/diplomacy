package main

import (
	"fmt"
	"strings"
)

type Order struct {
	unit string
	objs [3]string
}

func arrToOrder(order [4]string) Order {
	var objs [3]string
	copy(objs[:], order[1:])
	return Order{unit: order[0], objs: objs}
}

func orderToArr(order Order) [4]string {
	var ret [4]string
	ret[0] = order.unit
	copy(ret[1:], order.objs[:])
	return ret
}

func (game *Game) readOrders(role string) []Order {
	var orders []Order
	rows, err := game.db.Query("select unit, obj1, obj2, obj3 from "+
		tableName(game.turn)+" where role=?;", role)
	check(err)
	for rows.Next() {
		var order Order
		err = rows.Scan(&order.unit, &order.objs[0], &order.objs[1], &order.objs[2])
		check(err)
		orders = append(orders, order)
	}
	return orders
}

func (game *Game) sendOrders(role string, orders []Order) {
	tx, err := game.db.Begin()
	check(err)
	stmt, err := tx.Prepare("insert into " + tableName(game.turn) +
		" (role, unit, obj1, obj2, obj3) values (?, ?, ?, ?, ?) on duplicate key update obj1=?, obj2=?, obj3=?;")
	check(err)

	for _, order := range orders {
		_, err = stmt.Exec(role, order.unit, order.objs[0], order.objs[1], order.objs[2],
			order.objs[0], order.objs[1], order.objs[2])
		check(err)
	}
	tx.Commit()
}

func (game *Game) legal(role string, order *Order) bool {
	queryText := fmt.Sprintf("select %s from MAP where turn=%d;", order.unit, game.turn)
	rows, err := game.db.Query(queryText)
	check(err)
	for rows.Next() {
		var stat string
		err = rows.Scan(&stat)
		check(err)
		return strings.Contains(stat, role)
	}
	return false
}

func (game *Game) readAllOrders() []Order {
	orders := []Order{}
	for _, role := range [7]string{"aus", "eng", "fra", "ger", "ita", "rus", "tur"} {
		orders = append(orders, (game.readOrders(role))...)
	}
	return orders
}
