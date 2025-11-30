package routes

import (
	"net/http"
	"pulses-service/controllers"
)

func PulseRoutes(controller *controllers.PulseController, mux *http.ServeMux) {
	mux.HandleFunc("/pulses/seed", controller.SeedPulses)
	mux.HandleFunc("/pulses", controller.GetPulses)
	mux.HandleFunc("/pulse", controller.GetPulseById)
}
