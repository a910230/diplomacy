package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func main() {
	// Listen to the root path of the web app
	http.HandleFunc("/", handler)

	// Start a web server.
	http.ListenAndServeTLS(":443", "/etc/letsencrypt/live/diplomacy.guru/cert.pem", "/etc/letsencrypt/live/diplomacy.guru/privkey.pem", nil)
}

// The handler for the root path.
func handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Add("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Content-Type", "text/plain; charset=utf-8")

	fmt.Fprintln(w, "Hello, World")
	var orders [][]string
	json.NewDecoder(r.Body).Decode(&orders)
	if orders != nil {
		fmt.Fprintln(w, orders)
	}
}
