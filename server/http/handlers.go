package http

import (
	"net/http"

	"github.com/go-chi/chi"
)

func Serve() {
	r := chi.NewRouter()
	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello world"))
	})
	http.ListenAndServe(":7000", r)
}
